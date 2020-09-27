const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

module.exports = Product;









// const products = [];

// module.exports = class Product {
//   constructor(title, imageURL, price, description) {
//     this.title = title;
//     this.imageURL = imageURL;
//     this.price = price;
//     this.description = description;
//   }

//   save() {
//     this.id = Math.random().toString();
//     products.push(this);
//   }

//   static fetchAllProducts() {
//     return products;
//   }

//   static getProductById(id) {
//     return products.find((product => product.id === id));
//   }

//   static deleteProductById(id) {
//     const index = products.findIndex(product => product.id === id);
//     products.splice(index, 1);
//   }

//   static editProductBy(newObj) {
//     const index = products.findIndex(product => product.id === newObj.id);
//     products[index] = newObj;
//   }
// }