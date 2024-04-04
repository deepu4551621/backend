const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accessTokenKey = process.env.ACT_SECRETKEY
const comparePassword = require('../middlewares/compareHpassword');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email exists
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (rows.length === 0) {
      // If email doesn't exist, return an error
      return res.status(404).json({ error: 'Incorrect credentials' });
    }

    const user = rows[0];
console.log(password, user.password)
    // Compare the provided password with the stored hashed password
    const passwordMatch = await comparePassword(password, user.password);

    if (passwordMatch) {
      const { id, name, email, created_at, updated_at } = user;

      // If passwords match, generate and return an access token
      const accessToken = jwt.sign({ id, name, email }, accessTokenKey, { expiresIn: '1h' });

      // Set the access token as an HTTP-only cookie
      res.cookie('aToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res.status(200).json({ status: true, data: { id, name, email, created_at, updated_at } });
    } else {
      // If passwords don't match, return an error
      return res.status(401).json({ success: false, error: 'Incorrect credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ ErrorLogging: error });
  }
};

module.exports = Login;