const express = require('express')
const router = express.Router()
const RefreshToken = require('./middlewares/refreshToken')
const Login =require('./controllers/Login')
const AuthenticateToken = require('./middlewares/verifyToken')
const cloudinary= require('./middlewares/cloudinary')
const upload= require('./middlewares/multer')
const {createUser,addCourse, getUserById, getAllCourses, deleteUser, updateUser} = require('./controllers/query')


router.get("/",AuthenticateToken, getAllCourses);
router.post('/login', Login)
router.post('/signup', createUser)
router.get("/profile", getUserById);
router.post("/addCourse", addCourse);
router.put("/profile/updateuser", updateUser);
router.delete("profile/deleteuser", deleteUser);
router.post('/refresh-token', RefreshToken)
router.post('/uploadImage', upload.single('profileImage'), (req, res) => {
    cloudinary.uploader.upload(req.file.path, function(err, result){
        if(err){
            console.log('23/uploadimage/backend', err)
            return res.status(500).json({
                success:false,
                message:'Error'
            })
        }
        console.log('result', result)
        res.status(200).json({
            success:true,
            message:'Uploaded!',
            data:result
        })
    })
  });
module.exports=router;
