import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, CreditCard, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CheckoutPage.css';

const CheckoutPage: React.FC = () => {
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = getCartTotal();
  const deliveryFee = total >= 299 ? 0 : 40;
  const finalTotal = total + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim()) {
      alert('Please enter delivery address');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearCart();
      navigate('/profile');
      alert('Order placed successfully! We will deliver within 30 minutes.');
    } catch (error) {
      console.error('Order error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/products');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="page-header">
          <h1>Checkout</h1>
          <p>Review your order and complete your purchase</p>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            <div className="checkout-section">
              <div className="section-header">
                <MapPin size={20} />
                <h3>Delivery Address</h3>
              </div>
              <div className="form-group">
                <label htmlFor="address">Enter your complete address in BBSR</label>
                <textarea
                  id="address"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="House/Flat No, Street, Landmark, Area, Pin Code"
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="checkout-section">
              <div className="section-header">
                <Clock size={20} />
                <h3>Delivery Time</h3>
              </div>
              <div className="delivery-time">
                <div className="time-option selected">
                  <Check size={16} />
                  <div>
                    <strong>Express Delivery</strong>
                    <p>Within 30 minutes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <div className="section-header">
                <CreditCard size={20} />
                <h3>Payment Method</h3>
              </div>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <strong>Cash on Delivery</strong>
                    <p>Pay when you receive your order</p>
                  </div>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="payment-info">
                    <strong>Online Payment</strong>
                    <p>UPI, Cards, Net Banking</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="order-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="order-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">x{item.quantity}</span>
                    </div>
                    <span className="item-total">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-calculations">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="customer-info">
                <h4>Delivering to:</h4>
                <p><strong>{user?.name}</strong></p>
                <p>{user?.phone}</p>
                <p>{user?.email}</p>
              </div>

              <button
                onClick={handlePlaceOrder}
                className={`place-order-btn ${isProcessing ? 'processing' : ''}`}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="processing-spinner">
                    <div className="spinner"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    Place Order - ₹{finalTotal.toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;