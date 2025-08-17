import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Truck, Shield, Star, ChevronRight } from 'lucide-react';
import './HomePage.css';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <Clock size={24} />,
      title: '30-Min Delivery',
      description: 'Lightning fast delivery across BBSR'
    },
    {
      icon: <Shield size={24} />,
      title: 'Quality Assured',
      description: 'Fresh products with quality guarantee'
    },
    {
      icon: <Truck size={24} />,
      title: 'Free Delivery',
      description: 'Free delivery on orders above ₹299'
    }
  ];

  const categories = [
    { name: 'Vegetables', image: '🥬', count: '50+ items' },
    { name: 'Fruits', image: '🍎', count: '40+ items' },
    { name: 'Dairy', image: '🥛', count: '30+ items' },
    { name: 'Bakery', image: '🍞', count: '25+ items' },
    { name: 'Snacks', image: '🍿', count: '60+ items' },
    { name: 'Beverages', image: '🥤', count: '35+ items' }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                Fresh Groceries
                <span className="highlight"> Delivered </span>
                to Your Doorstep in BBSR
              </h1>
              <p>
                Get the freshest groceries delivered in just 30 minutes across Bhubaneswar. 
                Shop from 1000+ products with guaranteed quality and best prices.
              </p>
              <div className="hero-actions">
                <Link to="/products" className="btn btn-primary">
                  Start Shopping
                  <ArrowRight size={18} />
                </Link>
                <Link to="/auth" className="btn btn-outline">
                  Sign Up Now
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">10,000+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Products Available</div>
                </div>
                <div className="stat">
                  <div className="stat-number">30min</div>
                  <div className="stat-label">Average Delivery</div>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="grocery-illustration">
                <div className="floating-item item-1">🥕</div>
                <div className="floating-item item-2">🍎</div>
                <div className="floating-item item-3">🥛</div>
                <div className="floating-item item-4">🍞</div>
                <div className="main-basket">🛒</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title">Why Choose BBSR Grocery?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories section">
        <div className="container">
          <div className="categories-header">
            <h2 className="section-title">Shop by Category</h2>
            <Link to="/products" className="view-all">
              View All <ChevronRight size={18} />
            </Link>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/products?category=${category.name.toLowerCase()}`}
                className="category-card"
              >
                <div className="category-image">
                  <span className="category-emoji">{category.image}</span>
                </div>
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p>"Excellent service! Fresh vegetables delivered within 30 minutes. The quality is amazing and prices are very reasonable."</p>
              <div className="customer">
                <div className="customer-name">Priya Sharma</div>
                <div className="customer-location">Patia, BBSR</div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p>"Best grocery delivery app in Bhubaneswar. Wide variety of products and super fast delivery. Highly recommended!"</p>
              <div className="customer">
                <div className="customer-name">Raj Kumar</div>
                <div className="customer-location">Jaydev Vihar, BBSR</div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p>"Love the convenience and quality. No need to visit the market anymore. Everything delivered fresh to my doorstep."</p>
              <div className="customer">
                <div className="customer-name">Anita Patel</div>
                <div className="customer-location">Chandrasekharpur, BBSR</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of happy customers in Bhubaneswar and experience the convenience of smart grocery delivery.</p>
            <Link to="/products" className="btn btn-primary">
              Shop Now
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;