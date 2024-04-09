// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token is provided
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = user;
        next(); // Proceed to the next middleware
    });
    next()
};
module.exports = authenticateToken;