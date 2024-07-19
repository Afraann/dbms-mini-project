// server/routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { authenticateToken } = require('../middleware/auth');

// Get cart for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.item');
    res.json(cart || { user: req.user.id, items: [] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Add item to cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(i => i.item.toString() === itemId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ item: itemId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Remove item from cart
router.post('/remove', authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(i => i.item.toString() !== itemId);

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

module.exports = router;
