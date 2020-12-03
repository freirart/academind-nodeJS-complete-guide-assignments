const Product = require('../models/product');

// GET requests

exports.getShopPage = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/product-list', {
        products, 
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => console.log(err));
};

exports.getProductDetailsPage = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then(product => {
      res.render('shop/product-detail', {
        product,
        pageTitle: `Product ${productId} Details`,
        path: '/'
      })
    })
    .catch(err => console.log(err));
}

exports.getCartPage = (req, res, next) => {
  req.user.getCart()
    .then(products => {
      res.render('shop/cart', {
        products,
        pageTitle: 'Cart',
        path: '/cart',
      });
    })
    .catch(err => console.error(err));
};

exports.getOrderPage = (req, res, next) => {
  req.user.getOrders()
    .then(orders => {
      res.render('shop/orders', {
        orders,
        pageTitle: 'Orders',
        path: '/orders'
      });
    });
};

// POST requests

exports.postAddToCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId)
    .then(product => req.user.addToCart(product))
    .then(() => res.redirect('/cart'))
    .catch(err => console.error(err));
}

exports.postDeleteProductFromCart = (req, res, next) => {
  const { productId } = req.body;
  req.user.deleteItemFromCart(productId)
    .then(() => res.redirect('/cart'))
    .catch(err => console.error(err));
}

exports.postDecreaseCartItemQty = (req, res, next) => {
  const { productId } = req.body;
  req.user.decreaseCartItemQty(productId)
    .then(() => res.redirect('/cart'))
    .catch(err => console.error(err));
}

exports.postOrder = (req, res, next) => {
  req.user.getCart()
    .then(products => req.user.postOrder(products))
    .then(() => res.redirect('/orders'))
    .catch(err => console.error(err));
};