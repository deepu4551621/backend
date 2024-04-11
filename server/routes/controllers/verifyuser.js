const bcrypt= require('bcrypt')
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const verifyUser = async(req, res) => {
  const email = req.query.email
    const {password} = req.body
    console.log("pass",password, '\nemail', email)
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`,
     [email]);
     console.log("data",result.rows[0], '\npass', result.rows[0].password)
  const encpass=result.rows[0].password
const passwordMatch = await bcrypt.compare(password, encpass);
console.log('ismatch',passwordMatch);
if (!passwordMatch) {
  return res.status(401).json({ success: false, error: 'Incorrect password' });
}
res.status(200).json({ success: true, message:'verified successfully'});
  }
  module.exports = verifyUser