const products = [];

exports.getAddProductPage = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push(req.body.title);
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  res.render('shop', {products, 
    pageTitle: 'Shop',
    path: '/',
  });
};