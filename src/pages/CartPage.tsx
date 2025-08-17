import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <ShoppingBag size={80} />
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to your cart to get started.</p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <span className="item-emoji">{item.image}</span>
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">₹{item.price}/{item.unit}</p>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="item-total">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>{total >= 299 ? 'FREE' : '₹40'}</span>
              </div>
              {total < 299 && (
                <div className="delivery-note">
                  <p>Add ₹{(299 - total).toFixed(2)} more for free delivery!</p>
                </div>
              )}
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{(total + (total >= 299 ? 0 : 40)).toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary checkout-btn">
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>
              <Link to="/products" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;