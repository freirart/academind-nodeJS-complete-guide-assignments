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
    return products.find((product => product.id == id));
  }
}