import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';

const Favorites = ({ favorites, products, toggleFavorite, addToCart }) => {
  // Filter the full product list to find only the ones in the favorites array
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', margin: '40px 0', fontSize: '2.5rem', color: '#4b3621' }}>
        Your Favorites ❤️
      </h2>

      {/* CONDITIONAL RENDERING: Check if list is empty */}
      {favoriteProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          <FiHeart style={{ fontSize: '4rem', color: '#ddd', marginBottom: '20px' }} />
          <h3>No Favorites Yet</h3>
          <p>Go to the <Link to="/menu" style={{ color: '#c29545', fontWeight: 'bold' }}>Menu</Link> and click the heart icon to save your favorite coffees!</p>
        </div>
      ) : (
        <div className="product-grid">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.img} alt={product.name} className="product-image" />
              
              <div className="product-info">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                    <h3 style={{margin: 0}}>{product.name}</h3>
                    
                    {/* Button to Remove from Favorites */}
                    <button 
                      onClick={() => toggleFavorite(product.id)} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: '#e91e63' }}
                      title="Remove from Favorites"
                    >
                      <FiHeart style={{fill: '#e91e63'}} />
                    </button>
                </div>

                <p style={{ color: '#c29545', fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
                
                <button onClick={() => addToCart(product)} className="add-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;