// server/routes/protected.js
const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/auth');

router.get('/admin', authenticateToken, isAdmin, (req, res) => {
  res.json({ message: 'Welcome to the Admin Page' });
});

router.get('/main', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the Main Page' });
});

module.exports = router;
