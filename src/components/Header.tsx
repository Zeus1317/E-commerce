import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      navigate('/auth');
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <div className="logo-icon">🛒</div>
            <div className="logo-text">
              <span className="logo-main">BBSR Grocery</span>
              <span className="logo-sub">Smart Delivery</span>
            </div>
          </Link>

          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <div className="location-indicator">
              <MapPin size={16} />
              <span>BBSR</span>
            </div>
          </nav>

          <div className="header-actions">
            <Link to="/cart" className="cart-button">
              <ShoppingCart size={20} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
            
            <button onClick={handleAuthAction} className="auth-button">
              <User size={20} />
              <span>{user ? 'Logout' : 'Login'}</span>
            </button>

            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;