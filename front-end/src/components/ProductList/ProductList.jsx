import { useCart } from '../../contexts/CartContext/useCart.js';
import ProductCard from '../ProductCard/ProductCard.jsx';
import './ProductList.css';

function ProductList({ products }) {
    const { cart } = useCart();

    return (
        <div className="products-container">
        <h1 className='text-color-4'>Dessert</h1>
        <div className="products">
            {products.map((p) => (
                <ProductCard
                    key={p.id}
                    product={p}
                    quantity={cart[p.id] || 0}
                />
            ))}
        </div>
        </div>

    );
}

export default ProductList;
