const express = require('express')
const router = express.Router()
const RefreshToken = require('./middlewares/refreshToken')
const Login =require('./controllers/Login')
const AuthenticateToken = require('./middlewares/verifyToken')
const {createUser,addCourse, getUserById, getAllCourses, deleteUser, updateUser} = require('./controllers/query')

// router.get('/',Home)
router.get("/", getAllCourses);
router.post('/login', Login)
router.post('/signup', createUser)
router.get("/profile",AuthenticateToken, getUserById);
router.post("/addCourse", addCourse);
router.put("/profile/updateuser", updateUser);
router.delete("profile/deleteuser", deleteUser);
router.post('/refresh-token', RefreshToken)
module.exports=router;
