const Product = require('../models/product');
const Order = require('../models/order');

// GET requests

exports.getShopPage = (req, res, next) => {
  Product.find({})
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
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      res.render('shop/cart', {
        cart: user.cart,
        path: '/cart',
        pageTitle: 'Cart',
      });
    })
    .catch(err => console.log(err));
};

exports.getOrderPage = (req, res, next) => {
  Order.find({ 'user._id': req.user._id })
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
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      return Order.create({
        totalValue: user.cart.totalValue,
        items: user.cart.items,
        user: {
          _id: user._id,
          name: user.name
        },
      });
    })
    .then(() => req.user.clearCart())
    .then(() => res.redirect('/orders'))
    .catch(err => console.error(err));
};