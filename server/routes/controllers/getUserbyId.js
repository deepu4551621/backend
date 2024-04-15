const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const getUserById = async (request, response) => {
    const id = request.query.id;
    console.log('id', id);
    try {
      // Fetch courses associated with the user
      const userCoursesResult = await pool.query(
        `SELECT * FROM user_courses WHERE user_id = $1`,
        [id]
      );
  
      if (userCoursesResult.rowCount === 0) {
        return response.status(404).json({
          message: "Currently, there are no courses enrolled under your account",
        });
      }
  
      // Extract course IDs from the result
      const courseIds = userCoursesResult.rows.map((row) => row.course_id);
      console.log("courseid", courseIds);
  
      // Fetch course data using the extracted course IDs
      const courseDataResult = await pool.query(
        `SELECT * FROM courses WHERE course_id = ANY($1)`,
        [courseIds]
      );
  
      const user = await pool.query(
        `SELECT * FROM users WHERE id = $1`,
        [id]
      );
  
      if (user.rowCount === 0) {
        return response.status(404).json({
          message: "User not found",
        });
      }
  
      const uEmail = user.rows[0].email;
      const verificationData = await pool.query(
        `SELECT * FROM verify WHERE email = $1`,
        [uEmail]
      );
      const isVerified = verificationData.rows.length > 0 ? verificationData.rows[0].isverified : false;
  
      // Send user ID, course data, and verification status as the response
      response.status(200).json({ isVerified, userData: user.rows, courseData: courseDataResult.rows });
    } catch (error) {
      console.error("Error fetching user courses:", error);
      response.status(500).json({ message: "Internal server error" });
    }
  };

  module.exports =getUserById