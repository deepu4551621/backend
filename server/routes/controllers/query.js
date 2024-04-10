const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
const createUser = async (request, response) => {
  const { name, email, password } = request.body;
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
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
    [name, email, hashedPassword],
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

const getAllCourses = (request, response) => {
  console.log("getcourse:",request.user)
  pool.query("SELECT * FROM courses ORDER BY course_id ", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json({userData:request.user, courseData:results.rows});
    // console.log(results.rows);
  });
};

const getUserById = async (request, response) => {
  const id = request.query.id;
  console.log('id',id)
  try {
    // Fetch courses associated with the user
    const userCoursesResult = await pool.query(
      `SELECT * FROM user_courses WHERE user_id = $1`,
      [id]
    );
    if (userCoursesResult.rowCount === 0) {
      return response.json({
        message: "You do not have any courses enrolled yet",
      });
    }
    // Extract course IDs from the result
    const courseIds = userCoursesResult.rows.map((row) => row.course_id);
    console.log("courseid",courseIds)

    // Fetch course data using the extracted course IDs
    const courseDataResult = await pool.query(
      `SELECT * FROM courses WHERE course_id = ANY($1)`,
      [courseIds]
    );
    // Send user ID and course data as the response
    response.status(200).json({ userId: id, courseData: courseDataResult.rows });
  } catch (error) {
    console.error("Error fetching user courses:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = (request, response) => {
  const id = request.query.id;
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = request.query.id;

  pool.query(`DELETE FROM users WHERE id = ${id}`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};
const addCourse=async (request, response) => {
  const { uid, cid } = request.body;
  try {
    // Insert the user ID and course ID into the user_courses table
    await pool.query(
      `INSERT INTO user_courses (user_id, course_id) VALUES ($1, $2)`,
      [uid, cid]
    );

    response.status(200).json({ message: 'Course added successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Error adding course' });
  }
}


module.exports = {
  createUser,
  getAllCourses,
  getUserById,
  updateUser,
  deleteUser,
  addCourse,
};
