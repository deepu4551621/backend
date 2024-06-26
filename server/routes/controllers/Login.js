const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accessTokenKey = process.env.ACT_SECRETKEY;
// const comparePassword = require('../middlewares/compareHpassword');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists
    const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Incorrect credentials' });
    }

    const user = rows[0];
  
    const passwordMatch = await bcrypt.compare(password, user.password);
    // console.log('ismatch',passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ login: false, error: 'Incorrect credentials' });
    }
    // If passwords match, generate and return an access token
    const { id, name,roles } = user;
    // console.log('user:', user)
    const accessToken = jwt.sign({ id, name, email, roles }, accessTokenKey, { expiresIn: '1d' });
    res.cookie('actk', accessToken, {httpOnly: true, secure: true, sameSite: 'strict' });
    
    res.status(200).json({ success: true, id,accessToken});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({message:error.response});
  }
};

module.exports = Login;