const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const accessTokenKey = process.env.ACT_SECRETKEY;
const rsecretKey = process.env.RSECRET_KEY
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
    const { id, name, } = user;

    // generate token
    const accessToken = jwt.sign({userId: id,name:name, email:email }, accessTokenKey, { expiresIn: '10m' });
    const refreshToken = jwt.sign(
      { userId: id, email:email },
      rsecretKey,
      { expiresIn: '5d' }
    );


    res.status(200).json({ success: true,id,accessToken, refreshToken});
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({message:error});
  }
};

module.exports = Login;
