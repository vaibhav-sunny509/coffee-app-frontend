import React, { useState, useEffect } from 'react';
import { FiHome, FiPhone, FiMessageSquare, FiCheck, FiMapPin, FiSend, FiX, FiClock } from 'react-icons/fi';
import { FaMotorcycle } from 'react-icons/fa';

const OrderTracking = () => {
  // Simulation State
  const [statusStep, setStatusStep] = useState(0); 
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'driver', text: 'Hello! I am on my way with your coffee. ☕' }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const steps = ["Accepted", "Preparing", "On the way", "Delivered"];

  // SIMULATE PROGRESS (Auto-advance every 4 seconds)
  useEffect(() => {
    if (statusStep < 3) {
      const timer = setTimeout(() => {
        setStatusStep(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [statusStep]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages([...chatMessages, { sender: 'user', text: newMessage }]);
    setNewMessage("");
    setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'driver', text: "Ok, thanks! See you soon." }]);
    }, 1500);
  };

  return (
    <div className="tracking-page-wrapper">
      <div className="container" style={{maxWidth: '600px'}}>
        
        {/* --- 1. MAP SECTION (Upgraded) --- */}
        <div className="tracker-card map-card">
            <div className="map-visual">
                <FiHome className="map-icon cafe" />
                
                <div className="map-route-line">
                    <div className="route-progress" style={{width: `${(statusStep / 3) * 100}%`}}></div>
                </div>
                
                <div className="bike-wrapper" style={{left: `${(statusStep / 3) * 100}%`}}>
                    <div className="bike-circle pulse-animation">
                        <FaMotorcycle />
                    </div>
                </div>

                <FiMapPin className="map-icon home" />
                
                {/* NEW: ETA Badge */}
                {statusStep < 3 && (
                    <div className="eta-badge">
                        <FiClock style={{marginRight: '5px'}}/> Arriving in {4 - statusStep} mins
                    </div>
                )}
            </div>
        </div>

        {/* --- 2. ORDER STATUS CARD --- */}
        <div className="tracker-card status-card-main">
            <div className="order-header-track">
                <div>
                    {statusStep === 3 ? (
                        <h2 className="status-title delivered">Order Delivered!</h2>
                    ) : (
                        <h2 className="status-title">Order In Progress</h2>
                    )}
                    <span className="order-id-track">Order ID: #ORD-2870</span>
                </div>
                {statusStep < 3 && <span className="live-indicator">LIVE</span>}
            </div>

            {/* Stepper with Glow Effect */}
            <div className="status-stepper">
                {steps.map((step, index) => (
                    <div key={index} className={`step-item ${index <= statusStep ? 'active' : ''}`}>
                        <div className={`step-circle ${index <= statusStep ? 'glow' : ''}`}>
                            {index <= statusStep ? <FiCheck /> : <div className="dot" />}
                        </div>
                        <span className="step-label">{step}</span>
                        {index < 3 && <div className={`step-line ${index < statusStep ? 'filled' : ''}`}></div>}
                    </div>
                ))}
            </div>

            {/* Delivery Partner (Trust Booster Layout) */}
            <div className="driver-info-box">
                <div className="driver-profile">
                    <div className="driver-img-container">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Driver" className="driver-img" />
                        <div className="online-dot"></div>
                    </div>
                    <div>
                        <h3>Deepak</h3>
                        <span className="driver-rating">★ 4.8 (500+ deliveries)</span>
                    </div>
                </div>
                <div className="driver-actions">
                    {/* Secondary Action */}
                    <button className="action-btn chat" onClick={() => setShowChat(!showChat)}>
                        <FiMessageSquare /> Chat
                    </button>
                    {/* Primary Action */}
                    <a href="tel:+919876543210" className="action-btn call">
                        <FiPhone /> Call
                    </a>
                </div>
            </div>
        </div>

        {/* --- 3. CELEBRATION BANNER (Bouncy) --- */}
        {statusStep === 3 && (
            <div className="celebration-banner bounce-in">
                <div className="confetti">🎉</div>
                <h3>Delivered!</h3>
                <p>Enjoy your coffee ☕</p>
            </div>
        )}

        {/* --- 4. CHAT WINDOW --- */}
        {showChat && (
            <div className="chat-overlay">
                <div className="chat-window-box slide-up">
                    <div className="chat-header">
                        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Driver" style={{width:'30px', borderRadius:'50%'}} />
                            <span>Chat with Deepak</span>
                        </div>
                        <button onClick={() => setShowChat(false)}><FiX /></button>
                    </div>
                    
                    <div className="chat-messages-area">
                        {chatMessages.map((msg, i) => (
                            <div key={i} className={`chat-bubble ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <form className="chat-input-row" onSubmit={handleSendMessage}>
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button type="submit"><FiSend /></button>
                    </form>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default OrderTracking;