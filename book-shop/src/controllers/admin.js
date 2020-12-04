const Product = require('../models/product');

// GET requests

exports.getAddProductPage = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.getManageProductsPage = (req, res, next) => {
  Product.find({})
    .then(products => {
      res.render('admin/manage-products', {
        products,
        pageTitle: 'Manage Products',
        path: '/admin/manage-products',
      });
    })
    .catch(err => console.error(err));
};

exports.getEditProductPage = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      res.render('admin/edit-product', {
        product,
        path: '/admin/manage-products',
      });
    })
    .catch(err => console.error(err));
}; 

exports.getDeleteProductPage = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      res.render('admin/delete-product', {
        product,
        pageTile: `Deleting product ${productId}`,
        path: '/admin/manage-products',
      });
    })
    .catch(err => console.error(err));
}

// POST requests

exports.postAddProduct = (req, res, next) => {
  const { title, imageURL, price, description } = req.body;
  const product = new Product({ title, imageURL, price, description });
  product.save()
    .then(() => res.redirect('/'))
    .catch(err => console.error(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findOneAndDelete({ _id: productId })
    .then(() => res.redirect('/admin/manage-products'))
    .catch(err => console.error(err));
}

exports.postEditProduct = (req, res, next) => {
  const { id, title, imageURL, price, description } = req.body;
  Product.findOneAndUpdate({ _id: id }, {
    title, imageURL, price, description
  })
    .then(() => res.redirect('/admin/manage-products'))
    .catch(err => console.error(err));
}