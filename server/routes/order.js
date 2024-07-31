// routes/orders.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

router.post('/place', auth, async (req, res) => {
  const { address, couponCode } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.itemId');
    if (!cart) return res.status(400).send('Cart not found');

    let totalPrice = cart.items.reduce((sum, item) => sum + item.itemId.price * item.quantity, 0);
    if (couponCode === 'DBMS50') {
      totalPrice *= 0.5;
    }

    const order = new Order({
      userId: req.user._id,
      items: cart.items,
      address,
      couponCode,
      totalPrice,
    });

    await order.save();
    await Cart.findByIdAndDelete(cart._id);

    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).send('Server error');
  }
});

router.get('/admin', auth, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId items.itemId');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
