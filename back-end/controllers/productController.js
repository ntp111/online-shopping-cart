const productModel = require('../models/productModel.js');

async function getProducts(req, res) {
    try {
        const products = await productModel.getProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
}

async function getProductById(req, res) {
    try {
        const productId = req.params.id;
        const product = await productModel.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
}


module.exports = {
    getProducts,
    getProductById,
};
