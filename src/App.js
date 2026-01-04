import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import ProductCard from './components/ProductCard.js';
import CartItem from './components/CartItem.js';

export default function App() {
  // State for products and UI
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter State
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState(''); 

  // Cart State (with localStorage persistence), now here users will not loose items even if they refresh
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('my-ecommerce-cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetching limited to 20 items as per assesment directions
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20') 
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      })
      // this is catch block
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  // here cart also persists
  useEffect(() => {
    localStorage.setItem('my-ecommerce-cart', JSON.stringify(cart));
  }, [cart]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search (Case insensitive)
    if (search) {
      result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (category) {
      result = result.filter(p => p.category === category);
    }

    // Sorts on basis of price
    if (sortOrder === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, search, category, sortOrder]);

  // Extract unique categories for the dropdown, easy access
  const categories = useMemo(() => {
    return [...new Set(products.map(p => p.category))];
  }, [products]);

  // Cart Actions to add product to cart
  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev; 
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return; 
    setCart(prev => prev.map(item => {
        if (item.id === id) {
            return { ...item, quantity: Math.min(newQty, item.stock) };
        }
        return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSortOrder('');
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Total for the cart logic
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="app-container">
      <header>
        <h1>Mini Shop</h1>
      </header>

      <main className="layout">
        {/* Left Side: Controls & Grid */}
        <section className="product-section">
          
          <div className="filters-bar">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={handleSearchChange}
              className="search-input"
            />
            
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
              <option value="">Sort by Price</option>
              <option value="low-high">Low -> High</option>
              <option value="high-low">High -> Low</option>
            </select>

            <button onClick={clearFilters} className="clear-btn">Clear</button>
          </div>

          {loading ? (
            <div className="loading">Loading products...</div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="empty-state">No products found matching your criteria.</div>
              ) : (
                <div className="product-grid">
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      onAddToCart={addToCart} 
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        {/* Right Side: Cart */}
        <aside className="cart-sidebar">
          <h2>Your Cart ({totalItems})</h2>
          
          <div className="cart-items">
            {cart.length === 0 ? (
              <p className="empty-cart-msg">Your cart is empty.</p>
            ) : (
              cart.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))
            )}
          </div>

          <div className="cart-summary">
            <div className="row">
              <span>Total:</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
            <button className="checkout-btn" disabled={cart.length === 0}>
              Checkout
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}