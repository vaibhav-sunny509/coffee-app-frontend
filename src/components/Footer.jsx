import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCoffee, FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiSend, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { FaGooglePlay, FaApple, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }

    
    const message = `
      🎉 Thank you for subscribing to CoffeeApp! 🌿
      
      We have sent a confirmation email to: ${email}
      
      You will now receive:
      ✅ Weekly Menu Updates
      ✅ Exclusive Discounts
      ✅ Coffee Brewing Tips
      
      Stay tuned for our next brew! ☕
    `;
    
    alert(message);
    setEmail(""); // Clear the input field
  };

  return (
    <div className="footer-wrapper">
      
      <div className="newsletter-container">
        <div className="newsletter-box">
            <div className="newsletter-image">
                <img src="https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?q=80&w=400" alt="Food" />
            </div>
            <div className="newsletter-content">
                <h4><span style={{color: '#f36f21'}}>🌿</span> Newsletters <span style={{color: '#f36f21'}}>🌿</span></h4>
                <h2>Get Our Every Single Menu Notifications</h2>
                <div className="newsletter-features">
                    <span>✅ Regular Updates</span>
                    <span>✅ Weekly Updates</span>
                    <span>✅ Monthly Updates</span>
                </div>
                <form className="newsletter-form" onSubmit={handleSubscribe}>
                    <div className="input-group-news">
                        <FiMail className="news-icon" />
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Subscribe <FiSend /></button>
                    </div>
                </form>
            </div>
        </div>
      </div>

      {/* --- 2. MAIN FOOTER --- */}
      <footer className="main-footer">
        <div className="footer-content">
            
            {/* Column 1: Brand */}
            <div className="footer-col brand-col">
                <Link to="/" className="footer-logo">
                    <FiCoffee /> <span>CoffeeApp</span>
                </Link>
                <p>
                    Brewing happiness directly to your cup. Follow us for the latest updates and coffee culture.
                </p>
                <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer"><FiFacebook /></a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer"><FiTwitter /></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"><FiInstagram /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FiLinkedin /></a>
                </div>
            </div>

            {/* Column 2: Our Menus */}
            <div className="footer-col">
                <h3>Our Menus</h3>
                <ul>
                    <li><Link to="/menu">Espresso</Link></li>
                    <li><Link to="/menu">Latte</Link></li>
                    <li><Link to="/menu">Cappuccino</Link></li>
                    <li><Link to="/menu">Cold Brew</Link></li>
                    <li><Link to="/menu">Specialty</Link></li>
                </ul>
            </div>

            {/* Column 3: Useful Links */}
            <div className="footer-col">
                <h3>Useful Links</h3>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/order-tracking">Track Order</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div className="footer-col contact-col">
                <h3>Contact Us</h3>
                <ul>
                    <li><a href="tel:+12125550199"><FiPhone /> +1 (212) 555-0199</a></li>
                    <li><a href="mailto:hello@coffeeapp.com"><FiMail /> hello@coffeeapp.com</a></li>
                    <li><a href="https://maps.google.com" target="_blank" rel="noreferrer"><FiMapPin /> 123 Brew Street, NY</a></li>
                </ul>
            </div>

            {/* Column 5: Download App */}
            <div className="footer-col download-col">
                <h3>Download App</h3>
                <p>Save $3 with App & New User only</p>
                <div className="app-buttons">
                    <a href="https://play.google.com" target="_blank" rel="noreferrer" className="store-btn">
                        <FaGooglePlay className="store-icon" />
                        <div className="btn-text">
                            <span>Get it on</span>
                            <strong>Google Play</strong>
                        </div>
                    </a>
                    <a href="https://apple.com/app-store" target="_blank" rel="noreferrer" className="store-btn">
                        <FaApple className="store-icon" />
                        <div className="btn-text">
                            <span>Download on the</span>
                            <strong>App Store</strong>
                        </div>
                    </a>
                </div>
            </div>

        </div>

        {/* --- 3. BOTTOM BAR --- */}
        <div className="footer-bottom">
            <p>&copy; 2026 All rights reserved by <strong>CoffeeApp</strong></p>
            <div className="payment-methods">
                <span>Accept For</span>
                <FaCcPaypal title="PayPal" />
                <FaCcMastercard title="Mastercard" />
                <FaCcVisa title="Visa" />
                <FaCcAmex title="Amex" />
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;