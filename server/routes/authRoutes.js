const express = require('express')
const router = express.Router()
const RefreshToken = require('./middlewares/refreshToken')
const Login =require('./controllers/Login')
const AuthenticateToken = require('./middlewares/verifyToken')
const upload= require('./middlewares/multer')
const {createUser,addCourse, getAllCourses, deleteUser,deleteCourse, updateUser} = require('./controllers/query')
const uploadImage =require('./controllers/upload')
const verifyUser =  require('./controllers/verifyuser')
const EmailAuth = require('./controllers/emailVerify/emailAuth')
const VerifyOtp = require('./controllers/emailVerify/verifyOtp')
const SaveOtp = require('./controllers/emailVerify/saveOtp')
const getUserById =require('./controllers/getUserbyId')
// all routes
router.get("/",AuthenticateToken, getAllCourses);
router.post('/login', Login)
router.post('/signup', createUser)
router.get("/profile", getUserById);
router.post("/addCourse", addCourse);
router.put("/updateuser", updateUser);
router.post("/verifyuser", verifyUser);
router.delete("/deleteuser", deleteUser);
router.delete("/deleteCourse", deleteCourse);
router.post('/refresh-token', RefreshToken)
router.post('/uploadImage', upload.single('profileImage'),uploadImage );
router.post("/user/saveOtp",EmailAuth, SaveOtp);
router.post("/user/verifyOtp",VerifyOtp);

module.exports=router;
