import React from 'react';
// [1] Import FiHeart icon
import { FiPlus, FiMinus, FiSearch, FiHeart } from 'react-icons/fi';

// [2] Add 'favorites' and 'toggleFavorite' to the props list
const Menu = ({ products, addToCart, cart, updateQuantity, searchQuery, favorites, toggleFavorite }) => {
  
  const getCartItem = (id) => {
    return cart.find(item => item.id === id);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      
      {/* [3] Added Animated Floating Image Here */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img 
          src="https://cdn-icons-png.flaticon.com/512/751/751621.png" 
          alt="Hot Coffee" 
          className="floating-coffee" 
          style={{ width: '100px' }} 
        />
      </div>

      <h2 style={{ textAlign: 'center', margin: '20px 0 40px', fontSize: '2.5rem', color: '#4b3621' }}>
        {searchQuery ? `Results for "${searchQuery}"` : "Our Complete Collection"}
      </h2>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          <FiSearch style={{ fontSize: '3rem', marginBottom: '10px' }} />
          <h3>No coffee found matching "{searchQuery}"</h3>
          <p>Try searching for "Espresso", "Latte", or "Roast"</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => {
            const cartItem = getCartItem(product.id);

            return (
              <div key={product.id} className="product-card">
                <img src={product.img} alt={product.name} className="product-image" />
                
                <div className="product-info">
                  
                  {/* [4] Wrap Title and Heart Button in a Flex container */}
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                    <h3 style={{margin: 0}}>{product.name}</h3>
                    
                    {/* THE FAVORITE BUTTON */}
                    <button 
                      onClick={() => toggleFavorite(product.id)} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#e91e63' }}
                      title="Add to Favorites"
                    >
                      {/* If favorite, show filled heart, else outline */}
                      {favorites && favorites.includes(product.id) ? <FiHeart style={{fill: '#e91e63'}} /> : <FiHeart />}
                    </button>
                  </div>

                  <p style={{ color: '#c29545', fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
                  
                  {cartItem ? (
                    <div className="quantity-controls" style={{ justifyContent: 'center', marginTop: '10px' }}>
                      <button className="qty-btn" onClick={() => updateQuantity(product.id, -1)}><FiMinus /></button>
                      <span className="qty-value">{cartItem.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(product.id, 1)}><FiPlus /></button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(product)} className="add-btn">
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Menu;