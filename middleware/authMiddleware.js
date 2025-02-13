const jwt = require('jsonwebtoken');
const { UNAUTHORIZED } = require('../config/constants')
const User = require('../models/User')


const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: UNAUTHORIZED });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET); // Ensure 
    req.user = await User.findById(decoded.id).select("-password"); // Fetch user info (excluding password)
    
    if (!req.user) {
      return res.status(401).json({ message: UNAUTHORIZED });
    }

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    return res.status(401).json({ message: UNAUTHORIZED });
  }


};

module.exports = authMiddleware;