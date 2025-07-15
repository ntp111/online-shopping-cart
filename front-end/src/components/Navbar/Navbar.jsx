import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
            </div>
            <ul className="navbar-menu">
                <li>
                    <Link to="/">Menu</Link>
                </li>
                <li>
                    <Link to="/your-orders">Ordered Items</Link>
                </li>
            </ul>

        </nav>
    );
}

export default Navbar;
