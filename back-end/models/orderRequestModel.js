const pool = require('../db.js');

// Create single order line
async function createOrderItem(orderId, productId, quantity) {
    const result = await pool.query(
        `
      INSERT INTO order_items (order_id, product_id, quantity)
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
        [orderId, productId, quantity]
    );
    return result.rows[0];
}

// Get all items for a given order
async function getOrderItemsByOrderId(orderId) {
    const result = await pool.query(
        `
      SELECT oi.*, p.name, p.price
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      WHERE oi.order_id = $1;
    `,
        [orderId]
    );
    return result.rows;
}

module.exports = {
    createOrderItem,
    getOrderItemsByOrderId,
};
