import { CartProvider } from "./CartContext/CartContext.jsx";

export default function Providers({ children }) {
    return <CartProvider>{children}</CartProvider>;
}
