import React from 'react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.title}</h4>
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div className="cart-controls">
        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          disabled={item.quantity >= item.stock}
        >
          +
        </button>
        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
      </div>
    </div>
  );
};

export default CartItem;