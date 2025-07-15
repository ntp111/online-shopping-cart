const discountModel = require('../models/discountModel.js');

async function getDiscountByCode(req, res) {
  try {
    const discountCode = req.query.code;

    if (!discountCode) {
      return res.status(400).json({
        success: false,
        message: "Discount code is required.",
      });
    }

    const discount = await discountModel.getDiscountByCode(discountCode);

    if (!discount) {
      return res.json({
        success: false,
        message: "Invalid discount code.",
      });
    }

    return res.json({
      success: true,
      type: discount.type,
      value: discount.value,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
}

module.exports = {
  getDiscountByCode,
};
