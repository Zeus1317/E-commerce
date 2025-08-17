import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import './ProductsPage.css';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart } = useCart();

  const categories = [
    'all', 'vegetables', 'fruits', 'dairy', 'bakery', 'snacks', 'beverages'
  ];

  useEffect(() => {
    // Mock product data
    const mockProducts: Product[] = [
      // Vegetables
      { id: '1', name: 'Fresh Tomatoes', price: 40, category: 'vegetables', image: '🍅', rating: 4.5, unit: 'kg' },
      { id: '2', name: 'Green Onions', price: 25, category: 'vegetables', image: '🧅', rating: 4.2, unit: 'bunch' },
      { id: '3', name: 'Fresh Carrots', price: 35, category: 'vegetables', image: '🥕', rating: 4.4, unit: 'kg' },
      { id: '4', name: 'Broccoli', price: 60, category: 'vegetables', image: '🥦', rating: 4.3, unit: 'kg' },
      { id: '5', name: 'Bell Peppers', price: 80, category: 'vegetables', image: '🫑', rating: 4.6, unit: 'kg' },
      
      // Fruits
      { id: '6', name: 'Fresh Apples', price: 120, category: 'fruits', image: '🍎', rating: 4.5, unit: 'kg' },
      { id: '7', name: 'Bananas', price: 50, category: 'fruits', image: '🍌', rating: 4.3, unit: 'dozen' },
      { id: '8', name: 'Oranges', price: 90, category: 'fruits', image: '🍊', rating: 4.4, unit: 'kg' },
      { id: '9', name: 'Grapes', price: 150, category: 'fruits', image: '🍇', rating: 4.6, unit: 'kg' },
      { id: '10', name: 'Mangoes', price: 200, category: 'fruits', image: '🥭', rating: 4.7, unit: 'kg' },
      
      // Dairy
      { id: '11', name: 'Fresh Milk', price: 60, category: 'dairy', image: '🥛', rating: 4.5, unit: 'liter' },
      { id: '12', name: 'Paneer', price: 180, category: 'dairy', image: '🧀', rating: 4.4, unit: '250g' },
      { id: '13', name: 'Yogurt', price: 45, category: 'dairy', image: '🥛', rating: 4.3, unit: '500g' },
      { id: '14', name: 'Butter', price: 120, category: 'dairy', image: '🧈', rating: 4.2, unit: '100g' },
      
      // Bakery
      { id: '15', name: 'White Bread', price: 35, category: 'bakery', image: '🍞', rating: 4.1, unit: 'loaf' },
      { id: '16', name: 'Croissant', price: 25, category: 'bakery', image: '🥐', rating: 4.4, unit: 'piece' },
      { id: '17', name: 'Bagel', price: 40, category: 'bakery', image: '🥯', rating: 4.2, unit: 'piece' },
      
      // Snacks
      { id: '18', name: 'Potato Chips', price: 50, category: 'snacks', image: '🍟', rating: 4.0, unit: 'pack' },
      { id: '19', name: 'Cookies', price: 80, category: 'snacks', image: '🍪', rating: 4.3, unit: 'pack' },
      { id: '20', name: 'Popcorn', price: 60, category: 'snacks', image: '🍿', rating: 4.1, unit: 'pack' },
      
      // Beverages
      { id: '21', name: 'Orange Juice', price: 90, category: 'beverages', image: '🧃', rating: 4.4, unit: 'liter' },
      { id: '22', name: 'Coffee', price: 250, category: 'beverages', image: '☕', rating: 4.6, unit: '500g' },
      { id: '23', name: 'Green Tea', price: 180, category: 'beverages', image: '🍵', rating: 4.5, unit: '100g' }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, sortBy, products]);

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Fresh Groceries</h1>
          <p>Choose from our wide selection of fresh products delivered to your doorstep</p>
        </div>

        <div className="filters-section">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <div className="category-filter">
              <Filter size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="sort-filter">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span className="product-emoji">{product.image}</span>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  <Star size={14} fill="currentColor" />
                  <span>{product.rating}</span>
                </div>
                <div className="product-price">
                  ₹{product.price}
                  <span className="unit">/{product.unit}</span>
                </div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  <Plus size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;