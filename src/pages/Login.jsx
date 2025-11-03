import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../store/AuthContext'; // <-- DELETE THIS LINE

// ... (The rest of your component code)

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { login } = useAuth(); // <-- DELETE THIS LINE
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Since AuthContext is removed, the login function is temporarily replaced
    // with a simple alert and redirection for testing purposes.
    
    alert(`Attempting to log in with ${email}...`);
    
    // MOCK success: Just navigate home
    navigate('/'); 
  };

  return (
    <div className="auth-page">
      <h2>Customer Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;