import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // --- FIXED: Updated to live Render URL (REPLACE WITH YOUR ACTUAL URL!) ---
      const response = await fetch('https://YOUR-RENDER-APP-NAME.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user); 
        navigate('/menu');
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Server is down. Please try again later.");
    }
  };

  const handleSocialLogin = (platform) => {
    alert(`Redirecting to ${platform} for secure authentication...`);
    
    setTimeout(() => {
        const mockEmail = `user@${platform.toLowerCase()}.com`;
        const mockName = `${platform} User`;
        onLogin(mockEmail, mockName);
        navigate('/'); 
    }, 1500); 
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h2>{isLogin ? 'Member Login' : 'Create Account'}</h2>
        <p style={{marginBottom: '20px', color: '#666'}}>
            {isLogin ? 'Welcome back! Log in to continue.' : 'Join us for exclusive coffee perks.'}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <div style={{ position: 'relative' }}>
                <FiUser style={{ position: 'absolute', top: '15px', left: '15px', color: '#888', fontSize: '1.2rem' }} />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  style={{paddingLeft: '45px'}}
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <div style={{ position: 'relative' }}>
                <FiMail style={{ position: 'absolute', top: '15px', left: '15px', color: '#888', fontSize: '1.2rem' }} />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  style={{paddingLeft: '45px'}}
                />
            </div>
          </div>

          <div className="input-group">
            <div style={{ position: 'relative' }}>
                <FiLock style={{ position: 'absolute', top: '15px', left: '15px', color: '#888', fontSize: '1.2rem' }} />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  style={{paddingLeft: '45px'}}
                />
            </div>
          </div>

          <button type="submit" className="login-btn">
            {isLogin ? 'Login Securely' : 'Sign Up'}
          </button>
        </form>

        <div className="social-login-section">
            <div className="divider">
                <span>Or continue with</span>
            </div>
            
            <div className="social-buttons">
                <button className="social-btn google" onClick={() => handleSocialLogin('Google')}>
                    <FcGoogle className="social-icon" /> Google
                </button>
                <button className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
                    <FaFacebook className="social-icon" /> Facebook
                </button>
            </div>
        </div>

        <div className="toggle-section">
          <p style={{marginBottom: '10px', color: '#555'}}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up / Register' : 'Login Here'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;