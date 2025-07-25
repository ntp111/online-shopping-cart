const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');

// GET /products
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

module.exports = router;
