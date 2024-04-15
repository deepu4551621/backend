const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const SaveOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log('otp', otp, '\nemail', email);
  try {
    // Check if email exists in the database
    const emailExists = await pool.query(
      `SELECT * FROM verify WHERE email = $1`,
      [email]
    );
// console.log('EM',emailExists.rows[0].isverified)
    if (emailExists.rows.length === 0) {
      // Email does not exist, proceed to save OTP data
      await pool.query(
        `INSERT INTO verify (email, otp, isverified) VALUES ($1, $2, $3)`,
        [email, otp, 0]
      );
      res.status(200).json({ message: 'Data saved', success: true });
    } else {
      // Email already exists, update the OTP
      const updateResult = await pool.query(
        `UPDATE verify SET otp = $1 WHERE email = $2`,
        [otp, email]
      );
      console.log(updateResult);
      res.status(200).json({ message: 'OTP updated successfully', success: true });
    }
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = SaveOtp;
