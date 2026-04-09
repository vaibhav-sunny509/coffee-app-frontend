import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Import the CSS styles

const Navbar = () => {
  return (
    <nav className="navbar"> {/* Use the class 'navbar' instead of inline styles */}
      <h2>☕ Bit&Bean</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;