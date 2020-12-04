const { Types, model, Schema } = require('mongoose');

const orderSchema = new Schema({
  items: { 
    type: [{
      qty: Number,
      productId: {
        _id: Types.ObjectId,
        title: String,
        price: Number,
      },
    }],
    required: true 
  },
  totalValue: Number,
  user: {
    _id: { type: Types.ObjectId, ref: 'User' },
    name: { type: String, required: true }
  },
});

module.exports = model('Order', orderSchema);