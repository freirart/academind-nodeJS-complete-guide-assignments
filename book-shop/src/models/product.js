const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/database');

class Product {
  constructor(title, imageURL, price, description, id) {
    this.title = title;
    this.imageURL = imageURL;
    this.price = Number(price);
    this.description = description;
    this._id = id ? new ObjectId(id) : undefined;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
    } else {
      dbOp = db.collection('products').insertOne(this);
    }
    return dbOp.catch(err => console.error(err));
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray()
      .then(products => products)
      .catch(err => console.error(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products')
      .find({_id: new ObjectId(prodId) })
      .next()
      .then(product => product)
      .catch(err => console.error(err));
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products').deleteOne({_id: new ObjectId(prodId) })
      .then(() => {
        db.collection('users').find().toArray()
          .then(users => {
            users.forEach(async (user) => {
              const u = user;
              u.cart.items = user.cart.items.filter(i => {
                return i.productId.toString() !== prodId.toString();
              });
              db.collection('users').updateOne({ _id: u._id }, { $set: u })
                .catch(err => console.error(err));
            });
          });
      })
      .catch(err => console.error(err));
  }
}

module.exports = Product;