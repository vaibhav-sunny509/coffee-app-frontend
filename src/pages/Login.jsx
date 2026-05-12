import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc'; // Google Icon
import { FaFacebook } from 'react-icons/fa'; // Facebook Icon

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Send data to your Node.js backend
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      // 2. Wait for the backend to respond
      const data = await response.json();

      // 3. Handle success or error
      if (response.ok) {
        // Login success! Pass the real user data to your App state
        onLogin(data.user); 
        navigate('/menu');
      } else {
        // Backend sent an error (e.g., wrong password)
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      alert("Server is down. Please try again later.");
    }
  };
  const handleSocialLogin = (platform) => {
    // 1. Feedback to user
    alert(`Redirecting to ${platform} for secure authentication...`);
    
    // 2. Simulate the delay of going to Google/Facebook and back
    setTimeout(() => {
        // 3. Create mock user data based on the platform
        const mockEmail = `user@${platform.toLowerCase()}.com`;
        const mockName = `${platform} User`;

        // 4. Trigger the App's login function
        onLogin(mockEmail, mockName);

        // 5. Redirect to Home Page
        navigate('/'); 
    }, 1500); // 1.5 second delay to simulate the redirect
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

        {/* --- SOCIAL LOGIN SECTION --- */}
        <div className="social-login-section">
            <div className="divider">
                <span>Or continue with</span>
            </div>
            
            <div className="social-buttons">
                {/* Google Button */}
                <button className="social-btn google" onClick={() => handleSocialLogin('Google')}>
                    <FcGoogle className="social-icon" /> Google
                </button>
                
                {/* Facebook Button */}
                <button className="social-btn facebook" onClick={() => handleSocialLogin('Facebook')}>
                    <FaFacebook className="social-icon" /> Facebook
                </button>
            </div>
        </div>

        {/* Toggle Login/Signup */}
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