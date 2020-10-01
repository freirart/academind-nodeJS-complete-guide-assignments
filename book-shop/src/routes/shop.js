const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getShopPage);
router.get('/cart', shopController.getCartPage);
router.get('/product/:productId', shopController.getProductDetailsPage);
router.get('/orders', shopController.getOrderPage);

router.post('/cart', shopController.postAddToCart);
router.post('/cart/delete-product', shopController.postDeleteProductFromCart);
// router.post('/cart/decrease-qty-by-one', shopController.postDecreaseQtyByOne);
router.post('/create-order', shopController.postOrder);

module.exports = router;