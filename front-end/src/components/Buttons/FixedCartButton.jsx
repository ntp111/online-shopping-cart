import "./FixedCartButton.css";

function FixedCartButton() {
    const handleScrollToCart = () => {
        const cartElement = document.getElementById("cart-session");
        if (cartElement) {
            cartElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <button className="fixed-cart-button" onClick={handleScrollToCart}>
            <i className="fa-solid fa-cart-shopping"></i>         </button>
    );
}

export default FixedCartButton;
