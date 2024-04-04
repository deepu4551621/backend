const express = require('express')
const router = express.Router()
const Home = require('./controllers/Home')
const Login =require('./controllers/Login')
const {createUser, getUserById, getUsers, deleteUser, updateUser} = require('./controllers/query')

router.get('/',Home)
router.post('/login', Login)
router.post('/signup', createUser)
router.get("/users", getUsers);
router.get("/user", getUserById);
router.put("/updateuser", updateUser);
router.delete("/deleteuser", deleteUser);
module.exports=router;
