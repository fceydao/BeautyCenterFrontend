import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';
import logo from '../images/logo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/api/login', { username, password });
      localStorage.setItem('userId', response.data.user.id);  // Save user ID to localStorage
      navigate('/randevu');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Invalid username or password');  // Display an alert for invalid login
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');  // Remove user ID from localStorage
    // Burada başka bir işlem yapılabilir, örneğin kullanıcıyı ana sayfaya yönlendirebilirsiniz
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Misc Beauty" className="logo" />
      <div className="login-form-wrapper">
        <div className="welcome-message">Mizc Beauty'ye Hoş Geldiniz</div>
        <h2 className="login-title"></h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label className="login-label">
              Username:
            </label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="login-input" required />
          </div>
          <div className="login-input-group">
            <label className="login-label">
              Password:
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" required />
          </div>
          <button type="submit" className="login-button">Login</button>
          <button type="button" onClick={handleLogout} className="logout-button">Logout</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
