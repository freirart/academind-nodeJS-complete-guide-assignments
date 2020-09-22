const products = [];

module.exports = class Product {
  constructor(title, imageURL, price, description) {
    this.title = title;
    this.imageURL = imageURL;
    this.price = price;
    this.description = description;
  }

  save() {
    products.push(this);
  }

  static fetchAllProducts() {
    return products;
  }
}