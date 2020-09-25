const products = [];

module.exports = class Product {
  constructor(title, imageURL, price, description) {
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }

  save() {
    this.id = Math.random().toString();
    products.push(this);
  }

  static fetchAllProducts() {
    return products;
  }

  static getProductById(id) {
    return products.find((product => product.id === id));
  }

  static deleteProductById(id) {
    const index = products.findIndex(product => product.id === id);
    products.splice(index, 1);
  }

  static editProductBy(newObj) {
    const index = products.findIndex(product => product.id === newObj.id);
    products[index] = newObj;
  }
}