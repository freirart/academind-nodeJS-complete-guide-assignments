const { ObjectId } = require("mongodb");
const { getDb } = require('../utils/database');

function getCartTotalValue(cart) {
  return cart.reduce((prev, curr) => {
    return prev.price * prev.qty + Number(curr.price) * curr.qty;
  }, { price: 0.0, qty: 1 });
}

class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart || { items: [], totalValue: 0.0 };
    this._id = new ObjectId(id);
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(p => {
      return p.productId.toString() === product._id.toString();
    });
    let newQty = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex !== -1) {
      newQty += this.cart.items[cartProductIndex].qty;
      updatedCartItems[cartProductIndex].qty = newQty;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        qty: newQty,
        price: product.price
      });
    }

    const updatedCart = {
      items: updatedCartItems,
      totalValue: getCartTotalValue(updatedCartItems)
    };

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(i => i.productId);
    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(p => {
          return {
            ...p,
            qty: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString();
            }).qty
          }
        })
      });
  }

  deleteItemFromCart(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== productId.toString();
    });

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        {
          $set: { 
            cart: { 
              items: updatedCartItems, 
              totalValue: getCartTotalValue(updatedCartItems)
            } 
          } 
        }
      );
  }

  decreaseCartItemQty(productId, fn) {
    const productIndex = this.cart.items.findIndex(item => {
      return item.productId.toString() === productId.toString();
    });

    if (productIndex === -1) throw new Error;
    
    if (this.cart.items[productIndex].qty - 1 === 0) 
      return Promise.resolve();

    const updatedCartItems = this.cart.items;
    updatedCartItems[productIndex].qty -= 1;

    const db = getDb();
    return db.collection('users')
      .updateOne(
        { _id : new ObjectId(this._id) },
        { 
          $set: { 
            cart: { 
              items: updatedCartItems, 
              totalValue: getCartTotalValue(updatedCartItems) 
            } 
          } 
        }
      )
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) })
      .then(user => user);
  }
}

module.exports = User;