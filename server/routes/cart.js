const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

// Add item to cart
router.post('/add', auth, async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      const itemIndex = cart.items.findIndex(p => p.itemId == itemId);

      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ itemId, quantity });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      const newCart = await Cart.create({
        userId: req.user._id,
        items: [{ itemId, quantity }]
      });

      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).send('Something went wrong');
  }
});

// Get cart items for user
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.itemId');
    if (cart) {
      res.status(200).send(cart);
    } else {
      res.status(404).send('Cart not found');
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).send('Something went wrong');
  }
});

// Remove item from cart
router.post('/remove', auth, async (req, res) => {
  const { itemId } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).send('Cart not found');
    }

    cart.items = cart.items.filter(item => item.itemId.toString() !== itemId);

    cart = await cart.save();
    return res.status(200).send(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;
