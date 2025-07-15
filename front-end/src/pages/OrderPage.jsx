import { useEffect, useState } from "react";
import api from "../api/api.js";
import { getOrCreateCustomerId } from "../utils/newCustomer.js";
import ProductList from "../components/ProductList/ProductList.jsx";
import CartSummary from "../components/CartSummary/CartSummary.jsx";
import FixedCartButton from "../components/Buttons/FixedCartButton.jsx";
import "./Pages.css";

function OrderPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getOrCreateCustomerId();

        api
            .get("/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="container order-page">
            <div className="product-list">
                <ProductList products={products} />
            </div>

            <div className="cart-summary">
                <CartSummary products={products} />
            </div>
            <FixedCartButton/>
        </div>

    );
}

export default OrderPage;
