// server/routes/protected.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Main Page route
router.get('/main', auth, (req, res) => {
  res.json({ message: 'Welcome to the Main Page' });
});

module.exports = router;
