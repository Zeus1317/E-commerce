import React from 'react';
import { User, Mail, Phone, MapPin, Clock, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  const recentOrders = [
    {
      id: '1',
      date: '2024-01-15',
      items: 5,
      total: 450,
      status: 'Delivered'
    },
    {
      id: '2',
      date: '2024-01-12',
      items: 3,
      total: 320,
      status: 'Delivered'
    },
    {
      id: '3',
      date: '2024-01-10',
      items: 8,
      total: 680,
      status: 'Delivered'
    }
  ];

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container">
          <div className="not-logged-in">
            <User size={80} />
            <h2>Please log in to view your profile</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h1>Welcome back, {user.name}!</h1>
            <p>Manage your profile and view your order history</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <User size={20} />
                </div>
                <div className="info-details">
                  <label>Full Name</label>
                  <span>{user.name}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div className="info-details">
                  <label>Email Address</label>
                  <span>{user.email}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Phone size={20} />
                </div>
                <div className="info-details">
                  <label>Phone Number</label>
                  <span>{user.phone}</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={20} />
                </div>
                <div className="info-details">
                  <label>Delivery Location</label>
                  <span>Bhubaneswar, Odisha</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
            </div>
            <div className="orders-list">
              {recentOrders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-info">
                    <div className="order-header">
                      <span className="order-id">Order #{order.id}</span>
                      <span className={`order-status status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <div className="order-detail">
                        <Clock size={16} />
                        <span>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                      <div className="order-detail">
                        <ShoppingBag size={16} />
                        <span>{order.items} items</span>
                      </div>
                    </div>
                  </div>
                  <div className="order-total">
                    ₹{order.total}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <div className="section-header">
              <h2>Account Statistics</h2>
            </div>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <ShoppingBag size={24} />
                </div>
                <div className="stat-info">
                  <div className="stat-number">12</div>
                  <div className="stat-label">Total Orders</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <span className="rupee-icon">₹</span>
                </div>
                <div className="stat-info">
                  <div className="stat-number">5,450</div>
                  <div className="stat-label">Total Spent</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <User size={24} />
                </div>
                <div className="stat-info">
                  <div className="stat-number">6</div>
                  <div className="stat-label">Months Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;