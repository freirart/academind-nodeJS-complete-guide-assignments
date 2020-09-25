const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProductPage);
router.get('/manage-products', adminController.getManageProductsPage);
router.get('/edit-product/:productId', adminController.getEditProductPage);
router.get('/delete-product/:productId', adminController.getDeleteProductPage);

router.post('/add-product', adminController.postAddProduct);
router.post('/delete-product', adminController.postDeleteProduct);
router.post('/edit-product', adminController.postEditProduct);

module.exports = router;