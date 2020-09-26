const Product = require('./product');

const cart = {products: [], totalPrice: 0};

function increaseQtyByProductId(id) {
  const index = cart.products.findIndex(product => product.id === id);
  cart.products[index].qty += 1;
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
  }

  static removeItemById(id) {
    const product = searchForProductByItsId(id);
    if (product) {
      const productPrice = Product.getProductById(id).price;
      // removing its role on total price 
      const addedValue = product.qty * productPrice;
      cart.totalPrice = cart.totalPrice - addedValue;
      
      // finding the position of the product and removing it from there
      const index = cart.products.indexOf(product);
      cart.products.splice(index, 1);
    }
  }

  static fetchCart() {
    const productsAddedToCart = cart.products.map(product => {
      return { product: Product.getProductById(product.id), qty: product.qty };
    });
    return { productsAddedToCart, totalPrice: cart.totalPrice };
  }
}