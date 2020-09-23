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

exports.getProductDetailsPage = (req, res, next) => {
  const { productId } = req.params;
  const product = Product.getProductById(productId);
  res.render('shop/product-detail', {
    product,
    pageTitle: `Product ${productId} Details`,
  })
}

exports.getCartPage = (req, res, next) => {
  res.render('shop/cart', { 
    pageTitle: 'Cart',
    path: '/cart',
  });
};