const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getShopPage);
router.get('/cart', shopController.getCartPage);
router.get('/product/:productId', shopController.getProductDetailsPage);

router.post('/cart', shopController.postCart);

module.exports = router;