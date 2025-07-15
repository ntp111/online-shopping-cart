import { useEffect, useState } from 'react';
import api from "../api/api.js";
import './Pages.css';
import { getOrCreateCustomerId } from "../utils/newCustomer.js";

function YourOrderPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const customerId = getOrCreateCustomerId();
        api
            .get('/orders', {
                params: { customerId },
            })
            .then((res) => {
                setOrders(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="your-order-page">
            <h1 className='text-color-4'>Your Orders</h1>

            {loading ? (
                <p>Loading orders...</p>
            ) : orders.length === 0 ? (
                <p>You have not placed any orders.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.orderId} className="order">
                        <div className='order-date'>
                            <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
                        </div>
                        {order.items?.length > 0 ? (
                            <ul className="order">
                                {order.items.map((item, index) => {
                                    const product = order.products?.find(
                                        (p) => p.id === item.productId
                                    );

                                    return (
                                        <li key={index} className="flex-item flex-item-start">
                                            <div className="left-group item-img-container">
                                                <img src={product?.image} />
                                            </div>
                                            <div className="right-group item-info">
                                                <div className="text-color-4">{product?.name || "Unknown"}</div>

                                                <div className="flex-item flex-item-space-between price-info">
                                                    <div className="left-group">
                                                        <span className="text-color-1">
                                                            {item.quantity}x
                                                        </span>
                                                        <span className="text-color-3">
                                                            @${product?.price?.toFixed(2) || "0.00"}
                                                        </span>
                                                    </div>
                                                    <div className="right-group item-price">
                                                        ${((product?.price || 0) * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>

                                        </li>

                                    );
                                })}
                                {order.discountCode && (
                                    <div className="flex-item flex-item-space-between ">
                                        <div className="left-group">
                                            Total
                                        </div>
                                        <div className="right-group discount">
                                            ${Number(order.totalAmountBeforeDiscount).toFixed(2)}
                                        </div>
                                    </div>)}
                                {order.discountCode && (
                                    <div className="flex-item flex-item-space-between ">
                                        <div className="left-group">
                                            Discount
                                        </div>
                                        <div className="right-group discount">
                                            ${Number(order.discountAmount).toFixed(2)}
                                        </div>
                                    </div>)}
                                <div className="flex-item flex-item-space-between ">
                                    <div className="left-group">
                                        Order Total
                                    </div>
                                    <div className="right-group order-total">
                                        ${Number(order.totalAmount).toFixed(2)}
                                    </div>
                                </div>
                            </ul>
                        ) : (
                            <p>No items in this order.</p>
                        )}

                    </div>
                ))
            )}
        </div>
    );
}

export default YourOrderPage;
