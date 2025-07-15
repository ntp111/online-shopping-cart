import { useCart } from "../../contexts/CartContext/useCart.js";
import { getOrCreateCustomerId } from "../../utils/newCustomer.js";
import { useState, useEffect } from "react";
import api from "../../api/api.js";
import OrderConfirmation from "../OrderConfirmation/OrderConfirmation.jsx";
import "./CartSummary.css";

function CartSummary({ products }) {
    const { cart, discount, discountCode, discountAmount, discountError, handleApplyDiscount, clearDiscount, setDiscountCode, removeFromCart, setDiscountAmount, discountApplied } = useCart(); const [showPopup, setShowPopup] = useState(false);
    const [orderResponse, setOrderResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [discountCode, setDiscountCode] = useState("");
    // const [discount, setDiscount] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");





    const cartItems = Object.entries(cart);

    const totalItems = cartItems.reduce((acc, [, qty]) => acc + qty, 0);

    const total = cartItems.reduce((sum, [productId, qty]) => {
        const product = products.find((p) => p.id === Number(productId));
        return sum + (product ? product.price * qty : 0);
    }, 0);

    useEffect(() => {
        if (!discountApplied) {
            if (discountCode) {
                setDiscountAmount(0);
            }
            return;
        }

        let amount = 0;

        if (discount?.type === "percentage") {
            amount = total * parseFloat(discount.value);
        } else if (discount?.type === "fixed") {
            amount = parseFloat(discount.value);
        } else if (discount?.type === "cheapest_item") {
            if (totalItems < 2) {
                setErrorMessage("Cheapest item discount requires at least 2 items.");
                clearDiscount();
                return;
            }

            const itemPrices = Object.entries(cart).map(([productId]) => {
                const product = products.find((p) => p.id === Number(productId));
                return parseFloat(product?.price);
            });

            const cheapest = Math.min(...itemPrices, Infinity);
            amount = cheapest === Infinity ? 0 : cheapest;
        }

        setDiscountAmount(amount.toFixed(2));
        setErrorMessage("");
    }, [discount, discountApplied, discountCode, cart, products, totalItems, clearDiscount, setDiscountAmount, total]);


    const handleConfirmOrder = async () => {
        try {
            setLoading(true);
            setError(null);

            const customerId = getOrCreateCustomerId();

            const items = cartItems.map(([productId, qty]) => ({
                productId: Number(productId),
                quantity: qty,
            }));

            const res = await api.post("/orders", {
                customerId,
                discountCode: discount?.code || null,
                items,
            });

            setOrderResponse(res.data);
            setShowPopup(true);
        } catch (err) {
            console.error(err);
            setError("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="cart-container" id="cart-session">
            <h2 className="text-color-1">Your Cart ({totalItems})</h2>

            {cartItems.length === 0 ? (
                <div className="empty-cart-container">
                    <img src="images/illustrated_donut.PNG" />
                    <p className="empty-cart-text">Your added items will appear here</p>
                </div>
            ) : (
                <>
                    <ul>
                        {cartItems.map(([productId, qty]) => {
                            const product = products.find((p) => p.id === Number(productId));
                            return (
                                <li key={productId} className="cart-item">
                                    <div className="name-row">
                                        <span className="name">{product?.name}</span>
                                    </div>
                                    <div className="flex-info-row">
                                        <div className="left-group">
                                            <span className="qty text-color-1">{qty}x</span>
                                            <span className="price">@${Number(product?.price || 0).toFixed(2)}</span>
                                            <span className="total">${(Number(product?.price || 0) * qty).toFixed(2)}</span>
                                        </div>
                                        <div className="right-group delete-icon">
                                            <span onClick={() => removeFromCart(product.id)}><img className="delete-img" src="images/delete.png" /></span>
                                        </div>
                                    </div>

                                </li>
                            );
                        })}
                    </ul>
                    <div className="flex-info-row">
                        <div className="left-group">
                            <span>Order Total</span>
                        </div>
                        <div className="right-group">
                            <span className="order-total text-color-4">${total.toFixed(2)}</span>
                        </div>
                    </div>
                    {discount ? (
                        <div>
                            <div className="flex-info-row">
                                <div className="left-group">
                                    <span>Discount Amount</span>
                                </div>
                                <div className="right-group">
                                    <span className="order-discount text-color-4">${discountAmount}</span>
                                </div>
                            </div>


                            <div className="flex-info-row">
                                <div className="left-group">
                                    <span>New Total</span>
                                </div>
                                <div className="right-group">
                                    <span className="order-total text-color-4">${(total.toFixed(2) - discountAmount).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ) : ""}

                    <div className="order-description">
                        <div>
                            <img src="images/tree.png" />
                        </div>
                        <p>This is a <strong>carbon-neutral</strong> delivery</p>

                    </div>

                    <div className="order-discount">
                        <input type="text" placeholder="Coupon Code" value={discountCode} onChange={(e) => setDiscountCode(e.target.value.toUpperCase())} className="discount-input" />
                        <button className="apply-button" onClick={() => handleApplyDiscount(discountCode)}>
                            Apply
                        </button>
                        {discountError && (
                            <p className="discount-error">{discountError}</p>
                        )}
                        {errorMessage && (
                            <p className="discount-error">{errorMessage}</p>
                        )}
                        
                    </div>


                    <div className="confirm-button-container">
                        <button onClick={handleConfirmOrder} disabled={loading} className="confirm-button">
                            {loading ? "Placing Order..." : "Confirm Order"}
                        </button>
                    </div>


                    {error && <p className="error-message">{error}</p>}
                </>
            )}

            <OrderConfirmation
                show={showPopup}
                onClose={() => setShowPopup(false)}
                order={orderResponse}
            />
        </div>
    );
}

export default CartSummary;
