const Product = require('../models/product');
const Cart = require('../models/cart');

// GET requests

exports.getShopPage = (req, res, next) => {
  const products = Product.fetchAllProducts();
  res.render('shop/product-list', {
    products, 
    pageTitle: 'Shop',
    path: '/',
  });
};

exports.getProductDetailsPage = (req, res, next) => {
  const { productId } = req.params;
  const product = Product.getProductById(productId);
  res.render('shop/product-detail', {
    product,
    pageTitle: `Product ${productId} Details`,
  })
}

exports.getCartPage = (req, res, next) => {
  const CartData = Cart.fetchCart();
  res.render('shop/cart', {
    CartData,
    pageTitle: 'Cart',
    path: '/cart',
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Cart.addProductById(productId);
  res.redirect('/cart');
}

exports.postDeleteProductFromCart = (req, res, next) => {
  const { productId } = req.body;
  Cart.removeItemById(productId);
  res.redirect('/cart');
}