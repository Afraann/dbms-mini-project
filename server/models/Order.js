// server/models/order.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNo: { type: String, required: true },
  address: { type: String, required: true },
  items: [{ 
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  deliveryDate: { type: Date, required: true },
  status: { type: String, default: 'Pending' } // Example status, adjust as needed
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
