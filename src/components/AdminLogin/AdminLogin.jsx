import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [adminID, setAdminID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validID = '8979';
    const validPassword = '8979';
    if (adminID === validID && password === validPassword) {
      localStorage.setItem('adminAuthenticated', true); 
      navigate('/adminmenu');
    } else {
      setError('Invalid Admin ID or Password');
    }
  };

  return (
    <div className='admin-login-wrapper'>
        <div className="admin-login-container">
        <h1 className='admin-login-title'>Admin Login</h1>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Admin ID"
            value={adminID}
            onChange={(e) => setAdminID(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button className='admin-login-button' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
