// server/routes/order.js

const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const authMiddleware = require('../middleware/auth'); // Assuming you have authentication middleware

// Create order
router.post('/', authMiddleware, async (req, res) => {
  const { username, phoneNo, address, items, deliveryDate } = req.body;

  try {
    const newOrder = new Order({
      username,
      phoneNo,
      address,
      items,
      deliveryDate,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
