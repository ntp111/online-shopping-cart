const orderModel = require('../models/orderModel.js');
const productModel = require('../models/productModel.js');
const orderRequestModel = require('../models/orderRequestModel.js');
const discountModel = require('../models/discountModel.js');

async function createOrder(req, res) {
    try {
        const { customerId, discountCode, items } = req.body;

        if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: "Invalid order data" });
        }

        let discount = null;

        // Get discount by discount code
        console.log(discountCode)
        if (discountCode) {
            discount = await discountModel.getDiscountByCode(discountCode);
            if (!discount) {
                return res.status(400).json({ error: "Invalid or inactive discount code." });
            }
        }

        // Calculate subtotal
        let subtotal = 0;
        const productDetails = [];
        let cheapestItemPrice = null;

        for (const item of items) {
            const product = await productModel.getProductById(item.productId);
            if (!product) {
                return res.status(400).json({ error: `Invalid product ID ${item.productId}` });
            }
            subtotal += Number(product.price) * item.quantity;
            if (cheapestItemPrice === null || product.price < cheapestItemPrice) {
                cheapestItemPrice = product.price;
            }
            productDetails.push({
                id: product.id.toString(),
                name: product.name,
                price: Number(product.price),
                category: product.category || null,
                image: product.image_url || null,
            });
        }

        let discountType = null;
        let discountValue = null;
        let totalAmount = subtotal;
        let totalAmount2 = subtotal;

        // Apply discount
        if (discount) {

            discountType = discount.type;
            discountValue = parseFloat(discount.value ? discount.value : 0);

            if (discount.type === 'percentage') {
                totalAmount = subtotal - subtotal * discountValue;
            } else if (discount.type === 'fixed') {
                totalAmount = subtotal - discountValue;
            } else if (discount.type === 'cheapest_item') {
                totalAmount = subtotal - cheapestItemPrice;
                discountValue = cheapestItemPrice;
            }
        }
        console.log(discount)

        if (totalAmount < 0) totalAmount = 0;

        console.log({
            customerId,
            discountCode: discountCode,
            discountType,
            discountValue: discountValue,
            totalAmount
        })
        // Insert orders
        const order = await orderModel.createOrder({
            customerId,
            discountCode: discountCode,
            discountType,
            discountValue: discountValue,
            totalAmount
        });

        // Insert order items
        for (const item of items) {
            await orderRequestModel.createOrderItem(
                order.id,
                item.productId,
                item.quantity
            );
        }

        // response
        const response = {
            id: order.id.toString(),
            items: items.map((item) => ({
                productId: item.productId.toString(),
                quantity: item.quantity,
            })),
            products: productDetails,
            totalAmount: Number(totalAmount.toFixed(2)),
            totalAmountBeforeDiscount: Number(totalAmount2.toFixed(2)),
            discountAmount: totalAmount2 - totalAmount,
            discount: discount
                ? {
                    code: discount.code,
                    type: discount.type,
                    value: Number(discount.value),
                }
                : null,
        };
        console.log(response)

        return res.status(201).json(response);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while placing order" });
    }
}

// GET all orders for customer
async function getOrders(req, res) {
    try {
        const { customerId } = req.query;

        if (!customerId) {
            return res.status(400).json({ error: "customerId is required" });
        }

        const orders = await orderModel.getOrdersByCustomerId(customerId);

        const fullOrders = [];

        for (const order of orders) {
            let totalAmountBeforeDiscount = 0;
            const items = await orderRequestModel.getOrderItemsByOrderId(order.id);

            // fetch product details for items
            const products = [];
            for (const item of items) {
                const product = await productModel.getProductById(item.product_id);
                if (product) {
                    totalAmountBeforeDiscount += Number(item.quantity) * Number(product.price);
                    products.push({
                        id: product.id.toString(),
                        name: product.name,
                        price: Number(product.price),
                        category: product.category || null,
                        image: product.image_url || null,

                    });
                }
            }

            fullOrders.push({
                orderId: order.id.toString(),
                orderDate: order.order_date,
                totalAmount: Number(order.total_amount),
                totalAmountBeforeDiscount: totalAmountBeforeDiscount,
                discountAmount: totalAmountBeforeDiscount - Number(order.total_amount),
                discountCode: order.discount_code,
                discountType: order.discount_type,
                discountValue: order.discount_value,
                items: items.map((item) => ({
                    productId: item.product_id.toString(),
                    quantity: item.quantity,
                })),
                products,
            });
        }

        res.json(fullOrders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while fetching orders" });
    }
}

module.exports = {
    createOrder,
    getOrders,
};
