import "./OrderConfirmation.css";
import { useCart } from "../../contexts/CartContext/useCart.js";



function OrderConfirmation({ show, onClose, order }) {
    const { clearCart, clearDiscount } = useCart();
    const handleStartNewOrder = () => {
        clearCart();
        clearDiscount();
        onClose();
    };
    if (!show || !order) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <img className="popup-img" src="images/checked.png" />
                <h1>Order Confirmed</h1>
                <p className="text-color-3 popup-msg">We hope you enjoy your food!</p>

                <div className="order-details">
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
                                            <div className="item-name">{product?.name || "Unknown"}</div>

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
                            { order.discount && (                        
                                <div className="flex-item flex-item-space-between ">
                                <div className="left-group">
                                    Total
                                </div>
                                <div className="right-group discount">
                                    ${Number(order.totalAmountBeforeDiscount).toFixed(2)}
                                </div>
                            </div>)  }
                            { order.discount && (                        
                                <div className="flex-item flex-item-space-between ">
                                <div className="left-group">
                                    Discount
                                </div>
                                <div className="right-group discount">
                                    ${Number(order.discountAmount).toFixed(2)}
                                </div>
                            </div>)  }

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


                {order.discount && (
                    <p>
                        Discount Applied: {order.discount.code}
                    </p>
                )}
                <div className="start-new-container">
                    <button className="btn-start-new" onClick={handleStartNewOrder}>Start New Order</button>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmation;
