const express = require('express')
const router = express.Router()
const Home = require('./controllers/Home')
const Login =require('./controllers/Login')
const AuthenticateToken = require('./middlewares/verifyToken')
const {createUser, getUserById, getCourse, deleteUser, updateUser} = require('./controllers/query')

router.get('/',Home)
router.post('/login', Login)
router.post('/signup', createUser)
router.get("/courses", getCourse);
router.get("/profile",AuthenticateToken, getUserById);
router.put("/profile", updateUser);
router.put("/profile/updateuser", updateUser);
router.delete("profile/deleteuser", deleteUser);
module.exports=router;
