const express = require('express')
const router = express.Router()
// const cors = require('cors')
const Home = require('./controllers/Home')
const Register =require('./controllers/Register')
const Login =require('./controllers/Login')
// middleware
// router.use(cors({
//     origin: 'http://localhost:3000',
//     credentials:true
// }));

router.get('/',Home)
router.post('/signup', Register)
router.post('/login', Login)
module.exports=router;
