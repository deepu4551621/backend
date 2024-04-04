const bcrypt = require('bcrypt');

// Middleware to hash password in the request body
const hashPasswordMiddleware = async (req, res, next) => {
  try {
    const { password } = req.body;
 console.log("mdware",password)
    // Check if password is provided in the request body
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Replace plain text password with hashed password in request body
    req.body.password = hashedPassword;
    
    // Pass control to the next middleware or route handler
    next();
  } catch (error) {
    // Handle error
    next(error);
  }
};

module.exports = hashPasswordMiddleware;
