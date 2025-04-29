import React, { useState, useEffect } from 'react';
import './app.css'; // Assume we have corresponding CSS


const ProductPage = () => {
  // Sample product data (in a real app, this would come from an API)
  const allProducts = [
    { id: 1, name: 'Smartphone X', category: 'Phones', price: 499.99, rating: 4.5, image: '/images/products/smartphone X.jpg', description: 'Latest smartphone with advanced camera features', stock: 15 },
    { id: 2, name: 'Laptop Pro', category: 'Laptops', price: 999.99, rating: 4.8, image: 'laptop-pro.jpg', description: 'High-performance laptop for professionals', stock: 8 },
    { id: 3, name: 'Wireless Earbuds', category: 'Accessories', price: 79.99, rating: 4.2, image: 'earbuds.jpg', description: 'Noise-cancelling wireless earbuds', stock: 25 },
    { id: 4, name: 'Smart Watch', category: 'Wearables', price: 199.99, rating: 4.3, image: 'smartwatch.jpg', description: 'Fitness tracking and notifications', stock: 12 },
    { id: 5, name: 'Tablet Lite', category: 'Tablets', price: 299.99, rating: 4.0, image: 'tablet.jpg', description: 'Compact tablet for everyday use', stock: 7 },
    { id: 6, name: 'Gaming Console', category: 'Gaming', price: 399.99, rating: 4.7, image: 'console.jpg', description: 'Next-gen gaming experience', stock: 5 },
   
  ];


  // State management
  const [products, setProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique categories for filter
  const categories = ['All', ...new Set(allProducts.map(product => product.category))];

  // Filter products based on search, category and price
  useEffect(() => {
    setIsLoading(true);
    
    let filtered = allProducts;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setProducts(filtered);
    
    // Simulate loading delay
    setTimeout(() => setIsLoading(false), 300);
  }, [searchTerm, selectedCategory, priceRange]);

  // Handle product selection
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle close product details
  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="product-page">
  {/* Header Section */}
  <header className="page-header" style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ flex: 1 }}>
      <h1>CELICE WACECE Electronics</h1>
      <p>Your one-stop shop for the latest gadgets</p>
    </div>
    <img 
      src="2.jpg" 
      alt="Electronics" 
      style={{ 
        borderRadius: '100%', // This makes the image rounded
        width: '100px', // Adjust the width as needed
        height: '100px', // Adjust the height as needed
        marginLeft: '20px' // Space between text and image
      }} 
    />
  </header>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="main-content">
        {/* Filters Section */}
        <section className="filters-section">
          <div className="filter-group">
            <h3>Categories</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Price Range</h3>
            <div className="price-range">
              <span>${priceRange[0]}</span>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="price-slider"
              />
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </section>

        {/* Product Listing Section */}
        <section className="product-listing-section">
          {isLoading ? (
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i> Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <p>No products found matching your criteria.</p>
              <button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setPriceRange([0, 1000]);
              }}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {products.map(product => (
                <div 
                  key={product.id} 
                  className="product-card"
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="product-image">
                    <img src={`/1.jpg/${product.image}`} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <div className="product-meta">
                      <span className="price">${product.price.toFixed(2)}</span>
                      <span className="rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <i 
                            key={i} 
                            className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''} ${i === Math.floor(product.rating) && product.rating % 1 > 0 ? 'half-filled' : ''}`}
                          ></i>
                        ))}
                      </span>
                    </div>
                    <p className="category">{product.category}</p>
                    <button className="view-details">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Product Details Modal */}
      {selectedProduct && (
        <section className="product-details-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseDetails}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="product-details-container">
              <div className="product-details-image">
                <img src={`/image/${selectedProduct.image}`} alt={selectedProduct.name} />
              </div>
              
              <div className="product-details-info">
                <h2>{selectedProduct.name}</h2>
                <div className="details-meta">
                  <span className="price">${selectedProduct.price.toFixed(2)}</span>
                  <span className="rating">
                    {selectedProduct.rating} 
                    <i className="fas fa-star"></i>
                    ({Math.floor(Math.random() * 100) + 1} reviews)
                  </span>
                  <span className={`stock ${selectedProduct.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                    {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
                
                <p className="description">{selectedProduct.description}</p>
                
                <div className="product-actions">
                  <div className="quantity-selector">
                    <button>-</button>
                    <span>1</span>
                    <button>+</button>
                  </div>
                  <button className="add-to-cart">
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </button>
                  <button className="wishlist">
                    <i className="fas fa-heart"></i> Wishlist
                  </button>
                </div>
                
                <div className="product-specs">
                  <h4>Specifications</h4>
                  <table>
                    <tbody>
                      <tr>
                        <td>Category</td>
                        <td>{selectedProduct.category}</td>
                      </tr>
                      <tr>
                        <td>Brand</td>
                        <td>ABC Electronics</td>
                      </tr>
                      <tr>
                        <td>Warranty</td>
                        <td>1 Year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer Section */}
      <footer className="page-footer">
        <p>© {new Date().getFullYear()} ABC Company - Rwamagana District, Eastern Province, Rwanda</p>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;