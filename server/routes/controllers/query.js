const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
// create new user start
const createUser = async (request, response) => {
  const { name, email, password , role} = request.body;
  // console.log('role',role, '\nname', name)
  const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (result.rowCount > 0) {
    // Email already exists, send error response
    return response.status(400).json({ message: "Email already exists" });
  }
  // Insert user into the database with hashed password
  pool.query(
    `INSERT INTO users (name, email, password, roles) VALUES ($1, $2, $3, $4) RETURNING id`,
    [name, email, hashedPassword, role],
    (error, results) => {
      if (error) {
        throw error;
      }
      // Send success response
      response
        .status(201)
        .json({ message: `User added with ID: ${results.rows[0].id}` });
      }
  );
};
// create new user end
// ***********************************************
// provides available courses data after authentication start
const getAllCourses = (request, response) => {
  pool.query("SELECT * FROM courses ORDER BY course_id ", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json({userData:request.user, courseData:results.rows});
    // console.log(results.rows);
  });
};
// provides available courses data after authentication end
// ****************************************************

//when user goes to profile page  start
// const getUserById = async (request, response) => {
//   const id = request.query.id;
//   console.log('id',id)
//   try {
//     // Fetch courses associated with the user
//     const userCoursesResult = await pool.query(
//       `SELECT * FROM user_courses WHERE user_id = $1`,
//       [id]
//     );
//     if (userCoursesResult.rowCount === 0) {
//       return response.status(404).json({
//         message: "Currently, there are no courses enrolled under your account",
//       });
//     }
//     // Extract course IDs from the result
//     const courseIds = userCoursesResult.rows.map((row) => row.course_id);
//     console.log("courseid",courseIds)

//     // Fetch course data using the extracted course IDs
//     const courseDataResult = await pool.query(
//       `SELECT * FROM courses WHERE course_id = ANY($1)`,
//       [courseIds]
//     );
//     const user = await pool.query(
//       `SELECT * FROM users WHERE id = $1`,
//       [id]
//     );
//       const uEmail= user.rows[0].email
//       const getdata = await pool.query(
//         `SELECT * FROM verify WHERE email = $1`, // Adjust the condition based on your needs
//         [uEmail]
//       );
//       const isVerified =getdata?.rows[0].isverified
//     // Send user ID and course data as the response
//     response.status(200).json({isVerified, userData: user.rows, courseData: courseDataResult.rows });
//   } catch (error) {
//     console.error("Error fetching user courses:", error);
//     response.status(500).json({ message: "Internal server error" });
//   }
// };
//when user goes to profile page  end
// ***************************************************

// update user info start
const updateUser = (request, response) => {
  const id = request.query.id;
  const { name, email } = request.body;
//  console.log('id', id, '\nname', name, '\nemail', email)
  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        console.error("Error updating user:", error);
        response.status(500).json({ error: "Internal server error" });
        return;
      }
      response.status(200).json({ message: `User with ID ${id} updated successfully` });
    }
  );
};
// update end
// *****************************************************


// delete user start
const deleteUser = (request, response) => {
  const id = request.query.id;

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      return response.status(401).json({error:'Error Deleting Account'})
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};
// delete user ends
// *******************************************************

// enroll in course
const addCourse=async (request, response) => {
  const { uid, cid } = request.body;
  // console.log('uid', uid, '\ncid', cid)
  try {
    // Insert the user ID and course ID into the user_courses table
     await pool.query(
      `INSERT INTO user_courses (user_id, course_id) VALUES ($1, $2)`,
      [uid, cid]
    );
    const result = await pool.query(
      `SELECT course_id FROM user_courses WHERE user_id = $1`,
      [uid]
    );
   const courseIds=  result.rows.map(row => row.course_id);
   const courseDataResult = await pool.query(
    `SELECT * FROM courses WHERE course_id = ANY($1)`,
    [courseIds]
  );
    response.status(200).json({courseData:courseDataResult.rows, message: 'Course added successfully' });
  } catch (error) {
    if (error.code === '23505') {
      response.status(409).json({ message: 'Course already exists' });
    }
    response.status(500).json({ error: 'Error adding course try again after some' });
  }
}

// delete usercourse
const deleteCourse = async (request, response) => {
  const { uid, cid } = request.body;

  console.log('uid', uid, '\ncid', cid)
    try {
      // Fetch courses associated with the user
    // const courseCount = await pool.query(
    //   `SELECT * FROM user_courses WHERE user_id = $1`,
    //   [uid]
    // );
    // if (courseCount.rowCount === 0) {
    //   return response.status(404).json({
    //     message: "course Already Deleted",
    //   });
    // }
     const result= await pool.query(
        `DELETE FROM user_courses WHERE user_id = $1 AND course_id = $2`,
        [uid, cid],  );
        if (result.rowCount === 1) {
          // If rowCount is 1, it means one row was deleted successfully
          response.status(200).json({ message: 'Course deleted successfully' });
        } else {
          // If rowCount is not 1, it means no row was deleted (maybe course was not found)
          response.status(404).json({ message: 'Course not found or already deleted' });
        }
    } catch (error) {
      console.log('Error deleting course:', error);
      response.status(500).json({ error: 'Error deleting course' });
    }
};


module.exports = {
  createUser,
  getAllCourses,
  updateUser,
  deleteUser,
  addCourse,
  deleteCourse
};
