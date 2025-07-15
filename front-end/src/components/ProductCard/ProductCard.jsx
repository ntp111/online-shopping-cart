import { useCart } from "../../contexts/CartContext/useCart.js";
import { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product, quantity }) {
    const { addToCart, increment, decrement } = useCart();
    const [activeButton, setActiveButton] = useState(null);
    const handleIncrement = () => {
        increment(product.id);
        setActiveButton("plus");
        setTimeout(() => setActiveButton(null), 200);
    };

    const handleDecrement = () => {
        decrement(product.id);
        setActiveButton("minus");
        setTimeout(() => setActiveButton(null), 200);
    };
    return (
        <div className="product-card">
            <div className="top-container">
                <div className="product-image">
                    <img src={product.image_url} alt={product.name} />
                </div>
                <div className="cart-controls-container">
                    {quantity > 0 ? (
                        <div className="cart-controls">
                            <img className={`icon-img ${activeButton === "minus" ? "active" : ""}`} onClick={handleDecrement} src="/images/minus.png" alt="minus"
                            />

                            <span className="cart-item-quantity">{quantity}</span>

                            <img className={`icon-img ${activeButton === "plus" ? "active" : ""}`} onClick={handleIncrement} src="/images/plus.png" alt="plus"
                            />
                        </div>
                    ) : (
                        <button className="cart-add" onClick={() => addToCart(product.id)}><span><i className="fa-solid fa-cart-plus"></i>Add to Cart</span></button>
                    )}
                </div>


            </div>
            <div className="product-info">
                <p className="product-category text-color-3" >{product.category}</p>
                <p className="product-name" >{product.name}</p>
                <p className="product-price text-color-1"> ${product.price}</p>
            </div>

        </div>
    );
}

export default ProductCard;
