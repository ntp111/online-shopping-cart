import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import OrderPage from './pages/OrderPage.jsx';
import YourOrderPage from './pages/YourOrderPage.jsx';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<OrderPage />} />
                <Route path="/your-orders" element={<YourOrderPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
