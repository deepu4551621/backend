
const jwt = require('jsonwebtoken');
const secretKey = process.env.ACT_SECRETKEY
// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // console.log('token', token)
    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token is provided
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            // console.log("err403:",err)
            return res.sendStatus(403); 
            // Forbidden if token is invalid
        }
       req.user = user;
       console.log('verify:',user)
    //    console.log("userData:",user)
       next()
    });
    
};
module.exports = authenticateToken;