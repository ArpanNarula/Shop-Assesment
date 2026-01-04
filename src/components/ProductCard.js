import React from 'react';

const ProductCard = React.memo(({ product, onAddToCart }) => {
  // Simple check for stock
  const isOutOfStock = product.stock <= 0;

  return (
    <div className={`product-card ${isOutOfStock ? 'out-of-stock' : ''}`}>
      <div className="image-container">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <div className="info">
        <h3>{product.title}</h3>
        <p className="category">{product.category}</p>
        <div className="price-row">
          <span className="price">${product.price}</span>
          <span className={`status ${isOutOfStock ? 'no-stock' : 'in-stock'}`}>
            {isOutOfStock ? 'Out of Stock' : 'In Stock'}
          </span>
        </div>
        <button 
          onClick={() => onAddToCart(product)} 
          disabled={isOutOfStock}
          className="add-btn"
        >
          {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
});

export default ProductCard;