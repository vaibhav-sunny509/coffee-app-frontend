import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Ensure you have installed react-icons

const Cart = ({ cartItems, updateQuantity, onCheckout }) => {
  // Calculate Total (Price * Quantity)
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="container">
      <h2 style={{ marginBottom: '20px' }}>Your Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h3>Your cart is empty 😔</h3>
          <p>Go add some delicious coffee!</p>
        </div>
      ) : (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              {/* Product Image & Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
                <img src={item.img} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '5px', objectFit: 'cover'}} />
                <div>
                  <h4>{item.name}</h4>
                  <p style={{ color: '#666' }}>${item.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="quantity-controls">
                <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span className="qty-value">{item.quantity}</span>
                <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>

              {/* Item Total */}
              <div style={{ fontWeight: 'bold', marginLeft: '20px', minWidth: '80px', textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          
          <div className="total-section">
            Total: ${totalAmount.toFixed(2)}
          </div>
          
          {/* UPDATED BUTTON: Now triggers the Checkout navigation */}
          <button 
            className="add-btn" 
            style={{ width: '100%', marginTop: '20px', fontSize: '1.2rem' }}
            onClick={onCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;