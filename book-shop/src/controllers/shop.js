const Product = require('../models/product');
const Cart = require('../models/cart');

// GET requests

exports.getShopPage = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(productId)
    .then(product => {
      res.render('shop/product-detail', {
        product,
        pageTitle: `Product ${productId} Details`,
      })
    })
    .catch(err => console.log(err));
}

exports.getCartPage = (req, res, next) => {
  req.user.getCart()
    .then(cart => cart.getProducts())
    .then(products => {
      res.render('shop/cart', {
        products,
        pageTitle: 'Cart',
        path: '/cart',
      });
    })
    .catch(err => console.log(err));
};

// POST requests

exports.postAddToCart = (req, res, next) => {
  const { productId } = req.body;
  let fetchedCart;
  let newQty = 1;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } })
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQty = product.cartItem.qty;
        newQty = oldQty + 1;
        return product;
      }
      return Product.findByPk(productId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, { through: { qty: newQty } });
    })
    .then(productAdded => res.redirect('/cart'))
    .catch(err => console.log(err));
}

exports.postDeleteProductFromCart = (req, res, next) => {
  const { productId } = req.body;
  req.user.getCart()
    .then(cart => cart.getProducts({ where: { id: productId } }))
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(productDestroyed => res.redirect('/cart'))
    .catch(err => console.log(err));
}