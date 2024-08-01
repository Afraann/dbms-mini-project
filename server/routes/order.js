const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Create new order
router.post('/create', auth, async (req, res) => {
  const { items, totalPrice, discountedPrice, couponCode, deliveryAddress } = req.body;

  try {
    const newOrder = new Order({
      userId: req.user._id,
      items,
      totalPrice,
      discountedPrice,
      couponCode,
      deliveryAddress,
    });

    const savedOrder = await newOrder.save();

    res.status(201).send(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('Something went wrong');
  }
});

// Get orders for user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('items.itemId');
    res.status(200).send(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
