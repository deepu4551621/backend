const jwt =require('jsonwebtoken')
const refreshSecretKey =process.env.RSECRET_KEY
const accessTokenKey =process.env.ACT_SECRETKEY
const RefreshToken=async (req, res) => {
    const refreshToken = req.body.refreshToken;
    // Check if refresh token is provided
    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' });
    }
  
    try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, refreshSecretKey);
      const {userId, email} = decoded;
  
      // Generate a new access token
      const accessToken = jwt.sign({ userId, email }, accessTokenKey, { expiresIn: '15m' });
  
      // Send the new access token to the client
      res.status(200).json({ accessToken });
    } catch (error) {
      console.error('Error refreshing token:', error);
      return res.status(403).json({ error: 'Invalid refresh token' });
    }
  };
  module.exports =RefreshToken
  