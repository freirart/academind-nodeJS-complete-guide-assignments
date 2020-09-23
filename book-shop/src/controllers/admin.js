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

// POST requests

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;
  const product = new Product(title, imageURL, price, description);
  product.save();
  res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  const product = Product.getProductById(productId);
  res.render('admin/delete-product', {
    product,
    pageTile: `Deleting product ${productId}`,
  });
}