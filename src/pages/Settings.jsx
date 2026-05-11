import React, { useState, useEffect } from 'react';
import { FiUser, FiPackage, FiMessageSquare, FiCpu, FiLogOut, FiCheckCircle, FiCoffee, FiSend, FiX } from 'react-icons/fi';

const Settings = ({ currentUser, onLogout }) => {
  const [activeTab, setActiveTab] = useState('orders');
  
  // --- NEW: State to hold orders from the database ---
  const [orderHistory, setOrderHistory] = useState([]);

  // Dummy AI Chat state with stylized avatars
  const [aiMessage, setAiMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'ai', text: 'Hello! I am your Coffee AI Assistant. How can I help you today?', avatar: 'https://cdn-icons-png.flaticon.com/512/4712/4712136.png' }
  ]);

  // --- NEW: Fetch Orders from Backend ---
  useEffect(() => {
    // Only fetch if we are on the 'orders' tab and the user is logged in
    if (activeTab === 'orders' && currentUser) {
      const fetchOrders = async () => {
        // Use MongoDB _id if it exists, otherwise fallback to email
        const userId = currentUser._id || currentUser.email; 
        
        try {
          const response = await fetch(`http://localhost:5000/api/orders/${userId}`);
          if (response.ok) {
            const data = await response.json();
            setOrderHistory(data); // Save database orders to state
          }
        } catch (error) {
          console.error("Error fetching orders from backend:", error);
        }
      };

      fetchOrders();
    }
  }, [currentUser, activeTab]); // Runs whenever the tab or user changes

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiMessage.trim()) return;
    setChatLog([...chatLog, { sender: 'user', text: aiMessage }]);
    setAiMessage('');
    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'ai', text: 'That sounds like a great choice! I recommend trying our Ethiopian Yirgacheffe next time.', avatar: 'https://cdn-icons-png.flaticon.com/512/4712/4712136.png' }]);
    }, 1000);
  };

  return (
    <div className="settings-page-wrapper">
      <h2 className="settings-page-title">Account Settings</h2>
      
      <div className="settings-layout">
        
        {/* --- SIDEBAR --- */}
        <div className="settings-sidebar">
          <div className="user-profile-mini">
            <div className="avatar">
              <FiUser />
            </div>
            <div className="user-details-mini">
              <h3>{currentUser?.name || 'Coffee Lover'}</h3>
              <p>{currentUser?.email || 'user@coffeeapp.com'}</p>
            </div>
          </div>
          
          <div className="settings-nav">
            <button className={`settings-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
              <FiPackage className="nav-icon-small" /> Order History
            </button>
            <button className={`settings-btn ${activeTab === 'feedback' ? 'active' : ''}`} onClick={() => setActiveTab('feedback')}>
              <FiMessageSquare className="nav-icon-small" /> Feedback
            </button>
            <button className={`settings-btn ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
              <FiCpu className="nav-icon-small" /> AI Assistant
            </button>
            
            <button className="settings-btn logout" onClick={onLogout}>
              <FiLogOut className="nav-icon-small" /> Logout
            </button>
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="settings-content">
          
          {/* TAB 1: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="tab-section">
              <h3 className="tab-title">Order History</h3>
              {/* UPDATED: Now maps over orderHistory from Database */}
              {orderHistory.length > 0 ? (
                orderHistory.map((order, index) => (
                  <div key={index} className="order-card">
                    <div className="order-header">
                      {/* Uses the generated ID from MongoDB */}
                      <span className="order-id">{order.orderId || order.id}</span>
                      <span className="status delivered"><FiCheckCircle style={{marginRight: '5px'}}/> {order.status}</span>
                    </div>
                    
                    <div className="order-date-row" style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>
                      <span>Placed on: {new Date(order.date).toLocaleDateString()}</span>
                      {order.estimatedDelivery && (
                        <span style={{color: '#27ae60', fontWeight: 'bold'}}>
                           ⏱️ Est. Arrival: {order.estimatedDelivery}
                        </span>
                      )}
                    </div>
                    
                    <div className="order-items-list">
                      {order.items.map((item, i) => (
                        <div key={i} className="order-item-mini">
                          <span className="item-qty">{item.quantity}x</span> {item.name}
                        </div>
                      ))}
                    </div>
                    
                    <div className="order-total">
                      Total: ${order.total}
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <FiPackage className="empty-icon" />
                  <p>You haven't placed any orders yet.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: FEEDBACK */}
          {activeTab === 'feedback' && (
            <div className="tab-section">
              <h3 className="tab-title">Send Feedback</h3>
              <div className="feedback-form-container">
                <form className="form-group" onSubmit={(e) => { e.preventDefault(); alert('Feedback sent!'); e.target.reset(); }}>
                  <label>How was your experience?</label>
                  <textarea placeholder="Tell us what you think..." rows="5" required style={{width: '100%', padding: '15px', borderRadius: '10px', border: '1px solid #ddd', marginTop: '10px'}}></textarea>
                  <button type="submit" className="action-btn call" style={{marginTop: '20px', width: 'fit-content'}}>Submit Feedback</button>
                </form>
              </div>
            </div>
          )}

          {/* --- TAB 3: AI ASSISTANT --- */}
          {activeTab === 'ai' && (
            <div className="tab-section">
              <h3 className="tab-title">AI Coffee Assistant</h3>
              
              <div className="ai-chat-container">
                <div className="chat-header">
                    <div className="header-logo-group">
                        <FiCpu className="header-icon robot" />
                        <FiCoffee className="header-icon coffee" />
                        <span>Chat with CoffeeAI</span>
                    </div>
                    <div className="online-status">Online</div>
                </div>
                
                <div className="chat-messages-area">
                  {chatLog.map((msg, idx) => (
                    <div key={idx} className={`chat-bubble ${msg.sender}`}>
                      {msg.sender === 'ai' && <img src={msg.avatar} alt="AI Avatar" className="chat-avatar" />}
                      <div className="message-content">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form className="chat-input-row" onSubmit={handleAiSubmit}>
                  <input 
                    type="text" 
                    placeholder="Ask for coffee recommendations..." 
                    value={aiMessage}
                    onChange={(e) => setAiMessage(e.target.value)}
                  />
                  <button type="submit"><FiSend /></button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;