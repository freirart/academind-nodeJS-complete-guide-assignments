const Cart = require('../models/cart');
const Product = require('../models/product');

// GET requests

exports.getAddProductPage = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.getManageProductsPage = (req, res, next) => {
  const products = Product.fetchAllProducts();
  res.render('admin/manage-products', {
    products,
    pageTitle: 'Manage Products',
    path: '/admin/manage-products',
  });
};

exports.getEditProductPage = (req, res, next) => {
  const { productId } = req.params;
  const product = Product.getProductById(productId);
  res.render('admin/edit-product', {
    product,
    pageTitle: 'Edit Product',
    path: '/admin/edit-product',
  });
}; 

exports.getDeleteProductPage = (req, res, next) => {
  const { productId } = req.params;
  const product = Product.getProductById(productId);
  res.render('admin/delete-product', {
    product,
    pageTile: `Deleting product ${productId}`,
  });
}

// POST requests

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;
  const product = new Product(title, imageURL, Number(price), description);
  product.save();
  res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Cart.removeItemById(productId);
  Product.deleteProductById(productId);
  console.log("Product deleted!");
  res.redirect('/');
}

exports.postEditProduct = (req, res, next) => {
  Product.editProductBy(req.body);
  console.log("Product edited!");
  res.redirect('/');
}