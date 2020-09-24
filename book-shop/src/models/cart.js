const Product = require('./product');

const cart = {products: [], totalPrice: 0};

function increaseQtyByProductId(id) {
  const product = searchForProductByItsId(id);
  const productIndex = cart.products.indexOf(product);
  cart.products[productIndex].qty += 1;
  increaseTotalPriceByProductId(id);
}

function searchForProductByItsId(id) {
  return cart.products.find(product => product.id === id);
}

function increaseTotalPriceByProductId(id) {
  cart.totalPrice += Product.getProductById(id).price;
}

module.exports = class Cart {

  static addProductById(id) {
    // check if a product with this id already exists
    const thisProductAlreadyExists = searchForProductByItsId(id);

    // if not, push a new object with the product id and qty 1
    if (!thisProductAlreadyExists) {
      cart.products.push({ id: id, qty: 1 });
      increaseTotalPriceByProductId(id);
    } 
    // if it exists, then call a function that increases the object qty propertie by 1
    else {
      increaseQtyByProductId(id);
    }

    console.log(cart);
  }
}