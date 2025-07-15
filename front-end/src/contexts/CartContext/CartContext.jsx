import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import api from '../../api/api.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState({});
    const [discountCode, setDiscountCode] = useState("");
    const [discount, setDiscount] = useState(null);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountError, setDiscountError] = useState("");

    const addToCart = useCallback((productId) => {
        setCart((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    }, []);

    const increment = useCallback((productId) => {
        setCart((prev) => ({
            ...prev,
            [productId]: prev[productId] + 1,
        }));
    }, []);

    const decrement = useCallback((productId) => {
        setCart((prev) => {
            const newQty = prev[productId] - 1;
            if (newQty <= 0) {
                const updatedCart = { ...prev };
                delete updatedCart[productId];
                return updatedCart;
            }
            return {
                ...prev,
                [productId]: newQty,
            };
        });
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCart((prev) => {
            const updatedCart = { ...prev };
            delete updatedCart[productId];
            return updatedCart;
        });
    }, []);

    const clearCart = useCallback(() => {
        setCart({});
    }, []);

    const clearDiscount = useCallback(() => {
        setDiscount(null);
        setDiscountCode("");
        setDiscountAmount(0);
        setDiscountError("");
        setDiscountApplied(false);
    }, []);

    const handleApplyDiscount = useCallback((code) => {
        if (!code || code === "") {
            setDiscount(null);
            setDiscountAmount(0);
            setDiscountError("Please enter a Coupon Code.");
            return;
        }

        api
            .get(`/discount?code=${encodeURIComponent(code)}`)
            .then((res) => {
                const data = res.data;

                if (data.success) {
                    setDiscount({
                        code: code,
                        type: data.type,
                        value: data.value,
                    });
                    setDiscountCode(code);
                    setDiscountError("");
                    setDiscountApplied(true);
                } else {
                    setDiscount(null);
                    setDiscountAmount(0);
                    setDiscountError(data.message || "Invalid discount code.");
                }
            })
            .catch((err) => {
                console.error(err);
                setDiscount(null);
                setDiscountAmount(0);
                setDiscountError("Something went wrong. Please try again.");
            });
    }, []);

    const value = useMemo(() => ({
        cart,
        addToCart,
        increment,
        decrement,
        removeFromCart,
        clearCart,
        discountCode,
        setDiscountCode,
        discount,
        discountAmount,
        discountError,
        handleApplyDiscount,
        clearDiscount,
        setDiscountAmount,
        discountApplied,
    }), [
        cart,
        discountCode,
        discount,
        discountAmount,
        discountError,
        handleApplyDiscount,
        clearDiscount,
        discountApplied,
        addToCart, clearCart, decrement, increment, removeFromCart,
    ]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
