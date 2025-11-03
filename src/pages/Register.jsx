// src/pages/Register.jsx (UPDATED)

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/authApi'; // <--- Import API function

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    
    try {
        await registerUser({ name, email, password });
        setMessage("Registration successful! Redirecting to login...");
        
        // Wait 1 second before redirecting
        setTimeout(() => navigate('/login'), 1000); 
    } catch (err) {
        setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister} className="auth-form">
        {error && <p style={{color: 'red', marginBottom: '15px'}}>{error}</p>}
        {message && <p style={{color: 'green', marginBottom: '15px'}}>{message}</p>}
        
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password (min 6 chars)" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in here</Link></p>
    </div>
  );
}

export default Register;