// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path if necessary

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

module.exports = auth;
