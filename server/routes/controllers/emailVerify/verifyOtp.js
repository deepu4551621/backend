const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const VerifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  console.log("userInputOTP",otp,'\nemail' ,email);
  try {
    // Check if email, OTP, and isVerified match the ones stored in the database
    const otpVerified = await pool.query(
      `SELECT * FROM verify WHERE email = $1 AND otp = $2`, // Adjust the condition based on your needs
      [email, otp]
    );
    console.log('isverified', otpVerified.rows.length);

    if (otpVerified.rows.length > 0) {
      const updateResult = await pool.query(
        `UPDATE verify SET isverified = 1 WHERE email = $1 AND otp = $2`,
        [email, otp]
      );
      // OTP verification successful
      res.status(200).json({ success: true,updateResult, message: 'Email verified successfully' });
    } else {
      console.log('notveridied', otpVerified.rowCount);
      // OTP verification failed
      res.status(409).json({ success :false, message:'OTP is not verified' });
    }
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = VerifyOtp;
