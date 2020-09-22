const Product = require('../models/product');

// GET requests

exports.getShopPage = (req, res, next) => {
  const products = Product.fetchAllProducts();
  res.render('shop/product-list', {
    products, 
    pageTitle: 'Shop',
    path: '/',
  });
};

exports.getCartPage = (req, res, next) => {
  res.render('shop/cart', { 
    pageTitle: 'Cart',
    path: '/cart',
  });
};