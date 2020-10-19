
const Product = require('../models/product');
// GET requests

exports.getAddProductPage = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.getManageProductsPage = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('admin/manage-products', {
        products,
        pageTitle: 'Manage Products',
        path: '/admin/manage-products',
      });
    })
    .catch(err => console.log(err));
};

exports.getEditProductPage = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      res.render('admin/edit-product', {
        product,
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
      });
    })
    .catch(err => console.log(err));
}; 

exports.getDeleteProductPage = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      res.render('admin/delete-product', {
        product,
        pageTile: `Deleting product ${productId}`,
      });
    })
    .catch(err => console.log(err));
}

// POST requests

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;
  const product = new Product(title, imageURL, price, description);
  product.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.deleteById(productId)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageURL, price, description } = req.body;
  const updatedProduct = new Product(title, imageURL, price, description, id);
  updatedProduct.save()
    .then(() => {
      console.log("Product edited!");
      res.redirect('/');
    })
    .catch(err => console.log(err));
}