const { Schema, model, Types } = require('mongoose');

const getCartTotalValue = function(cart) {
  return cart.reduce((prev, curr) => {
    return {
      price: +prev.price * prev.qty + Number(curr.price) * curr.qty, 
      qty: 1
    };
  }, { price: 0.0, qty: 1 }).price;
};

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cart: {
    items: [{ 
      productId: {
        type: Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      qty: { type: Number, default: 1 },
      price: { type: Number, default: 0.0 },
    }],
    totalValue: { type: Number, default: 0.0 },
  },
});

userSchema.methods.clearCart = function() {
  this.cart.items = [];
  this.cart.totalValue = 0.0;
  return this.save();
}

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(p => {
    return p.productId.toString() === product._id.toString();
  });

  const productIsAlreadyInTheCart = cartProductIndex !== -1;
  let newQty = 1;
  const updatedCartItems = [...this.cart.items];

  if (productIsAlreadyInTheCart) {
    newQty += this.cart.items[cartProductIndex].qty;
    updatedCartItems[cartProductIndex].qty = newQty;
  } else {
    updatedCartItems.push({
      productId: new Types.ObjectId(product._id),
      qty: newQty,
      price: product.price
    });
  }

  this.cart = {
    items: updatedCartItems,
    totalValue: getCartTotalValue(updatedCartItems)
  };
  
  return this.save();
};

userSchema.methods.deleteItemFromCart = function(productId) {

  if (this.cart.items.length === 1)
    return this.clearCart();

  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart = {
    items: updatedCartItems, 
    totalValue: (
      updatedCartItems.length === 0 
      ? 0.0 
      : getCartTotalValue(updatedCartItems)
    )
  };

  return this.save();
};

userSchema.methods.decreaseCartItemQty = function(productId) {
  const productIndex = this.cart.items.findIndex(item => {
    return item.productId.toString() === productId.toString();
  });

  if (productIndex === -1) throw new Error;
  
  if (this.cart.items[productIndex].qty - 1 === 0)
    return this.deleteItemFromCart(productId);
    
  const updatedCartItems = this.cart.items;
  updatedCartItems[productIndex].qty -= 1;

  this.cart = { 
    items: updatedCartItems, 
    totalValue: getCartTotalValue(updatedCartItems) 
  };
  return this.save();
};

module.exports = model('User', userSchema);