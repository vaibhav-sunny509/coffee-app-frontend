import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaMobileAlt, FaMoneyBillAlt } from 'react-icons/fa';

const Checkout = ({ onPlaceOrder, cart }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 45); 
    setEstimatedDelivery(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const grandTotal = Math.max(0, subtotal - discount);

  const applyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "WELCOME2026") {
        setDiscount(subtotal * 0.10); 
        setCouponMessage("Success! 10% Discount Applied.");
    } else {
        setDiscount(0);
        setCouponMessage("Invalid Coupon Code.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- UPDATED: Pass the estimated delivery time to App.jsx! ---
    onPlaceOrder(grandTotal.toFixed(2), estimatedDelivery);

    if (paymentMethod === 'cod') {
        alert(`Your delivery is confirmed! 🚚\nEstimated Arrival: ${estimatedDelivery}\nPay cash upon arrival.`);
        navigate('/order-tracking');
    } else if (paymentMethod === 'card') {
        if (!cardNumber || !expiry || !cvv) {
            alert("Please enter all card details.");
            return;
        }
        alert(`Card Saved! Redirecting to Bank...\nEstimated Arrival: ${estimatedDelivery}`);
        window.location.href = "https://www.hdfcbank.com/"; 
    } else {
        window.location.href = "https://razorpay.com/payment-gateway/"; 
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: 'center', margin: '30px 0', color: '#4b3621' }}>Checkout & Payment</h2>
      
      <div className="checkout-layout" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'stretch' }}>
        
        {/* Left Side: Form */}
        <form className="checkout-form" onSubmit={handleSubmit} style={{flex: 1, minWidth: '300px', margin: 0, display: 'flex', flexDirection: 'column'}}>
            <h3>Shipping Address</h3>
            <div className="form-group"><label>Full Name</label><input type="text" placeholder="John Doe" required /></div>
            <div className="form-group"><label>House No. / Flat No.</label><input type="text" placeholder="Apt 4B" required /></div>
            <div className="form-group"><label>Street Address</label><input type="text" placeholder="123 Coffee Lane" required /></div>
            <div className="form-group"><label>City & Zip Code</label><input type="text" placeholder="New York, 10001" required /></div>
            
            <h3 style={{marginTop: '30px', marginBottom: '15px'}}>Payment Method</h3>
            <div className="payment-options">
            
            <div className={`payment-card-container ${paymentMethod === 'card' ? 'active-container' : ''}`} style={{border: paymentMethod === 'card' ? '2px solid #c29545' : '1px solid #ddd', borderRadius: '8px', padding: '10px', marginBottom: '10px', transition: '0.3s'}}>
                <label className="payment-card" style={{border: 'none', background: 'transparent', margin: 0, padding: '5px'}}>
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                    <FaCreditCard size={30} color="#1A1F71" /> 
                    <span style={{fontWeight: 'bold', marginLeft: '10px'}}>Credit / Debit Cards</span>
                </label>

                {paymentMethod === 'card' && (
                    <div className="card-inputs" style={{marginTop: '15px', paddingLeft: '35px'}}>
                        <div className="form-group" style={{marginBottom: '10px'}}>
                            <input type="text" placeholder="Card Number (XXXX-XXXX-XXXX-XXXX)" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength="19" style={{padding: '10px', width: '100%'}} required />
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <div className="form-group" style={{marginBottom: '0', flex: 1}}>
                                <input type="text" placeholder="Expiry (MM/YY)" value={expiry} onChange={(e) => setExpiry(e.target.value)} maxLength="5" style={{padding: '10px', width: '100%'}} required />
                            </div>
                            <div className="form-group" style={{marginBottom: '0', flex: 1}}>
                                <input type="password" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} maxLength="3" style={{padding: '10px', width: '100%'}} required />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <label className={`payment-card ${paymentMethod === 'upi' ? 'active' : ''}`}>
                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                <FaMobileAlt size={30} color="#27ae60" /> UPI
            </label>
            <label className={`payment-card ${paymentMethod === 'cod' ? 'active' : ''}`}>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                <FaMoneyBillAlt size={30} color="#2b2b2b" /> Cash on Delivery
            </label>

            </div>

            <div style={{marginTop: 'auto', paddingTop: '30px'}}>
                <button type="submit" className="add-btn" style={{ fontSize: '1.2rem', margin: 0 }}>
                    {paymentMethod === 'cod' ? `Confirm Order ($${grandTotal.toFixed(2)})` : `Pay $${grandTotal.toFixed(2)}`}
                </button>
            </div>
        </form>

        {/* Right Side: Order Summary */}
        <div style={{ flex: 0.8, minWidth: '300px', display: 'flex' }}>
            <div className="cart-container" style={{padding: '30px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
                <h3 style={{borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px', color: '#4b3621'}}>Order Summary</h3>
                
                <div style={{flex: 1}}> 
                    {cart.map((item, idx) => (
                        <div key={idx} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.95rem'}}>
                            <span>{item.quantity}x {item.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    
                    <div style={{borderTop: '1px solid #eee', margin: '20px 0'}}></div>

                    <div style={{marginBottom: '20px'}}>
                        <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Have a Coupon?</label>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <input type="text" placeholder="Enter Code..." value={couponCode} onChange={(e) => setCouponCode(e.target.value)} style={{padding: '10px', flex: 1, border: '1px solid #ddd', borderRadius: '5px'}} />
                            <button type="button" onClick={applyCoupon} style={{background: '#4b3621', color: 'white', border: 'none', padding: '0 20px', borderRadius: '5px', cursor: 'pointer'}}>Apply</button>
                        </div>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#666'}}>
                        <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#27ae60'}}>
                            <span>Discount</span><span>-${discount.toFixed(2)}</span>
                        </div>
                    )}
                </div>

                {/* --- NEW: Display Estimated Delivery --- */}
                <div style={{marginTop: 'auto'}}>
                    <div style={{ background: '#fdfbf7', border: '1px solid #d4a373', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', color: '#4b3621', fontWeight: 'bold' }}>
                        ⏱️ Estimated Delivery: <span style={{color: '#27ae60'}}>{estimatedDelivery}</span>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 'bold', color: '#4b3621', borderTop: '2px solid #eee', paddingTop: '20px'}}>
                        <span>Total</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;