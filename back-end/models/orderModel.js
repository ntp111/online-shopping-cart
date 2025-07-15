const pool = require('../db.js');

// Create new order
async function createOrder({
    customerId,
    discountCode = null,
    discountType = null,
    discountValue = null,
    totalAmount = 0.00
}) {
    const result = await pool.query(
        `
      INSERT INTO orders
        (customer_id, discount_code, discount_type, discount_value, total_amount, created_date, updated_date)
      VALUES
        ($1, $2, $3, $4, $5, NOW(), NOW())
      RETURNING *;
    `,
        [
            customerId,
            discountCode,
            discountType,
            discountValue,
            totalAmount
        ]
    );
    return result.rows[0];
}

// Get all orders for customer
async function getOrdersByCustomerId(customerId) {
    const result = await pool.query(
        `
      SELECT *
      FROM orders
      WHERE customer_id = $1
      ORDER BY order_date DESC;
    `,
        [customerId]
    );
    return result.rows;
}

module.exports = {
    createOrder,
    getOrdersByCustomerId,
};
