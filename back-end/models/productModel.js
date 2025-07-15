const pool = require('../db.js');

async function getProducts() {
    const result = await pool.query(
        'SELECT * FROM products ORDER BY id'
    );
    return result.rows;
}

async function getProductById(id) {
    const result = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
    );
    return result.rows[0]; // Return single row
}

module.exports = {
    getProducts,
    getProductById,
};
