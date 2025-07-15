const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController.js');

router.get('/', discountController.getDiscountByCode);

module.exports = router;
