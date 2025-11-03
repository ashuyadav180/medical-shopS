import React from 'react';
import { Link } from 'react-router-dom';

// NOTE: You can uncomment the import below and map products here 
// if you want the home page to also show featured items.
// import MedicineCard from '../components/MedicineCard'; 

function Home() {
  return (
    <div className="home-page">
      
      {/* 1. Hero Section */}
      <section className="hero-section">
        <h1>Your Trusted Source for Healthcare Products</h1>
        <p>Fast, reliable delivery of medicines and wellness items directly to your door.</p>
        <Link to="/medicines" className="cta-button">
          Shop All Medicines
        </Link>
      </section>

      {/* 2. Key Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <h3>💊 Wide Selection</h3>
            <p>Browse thousands of prescription and over-the-counter products.</p>
          </div>
          <div className="feature-item">
            <h3>📦 Fast Delivery</h3>
            <p>Quick processing and tracking for all orders.</p>
          </div>
          <div className="feature-item">
            <h3>🔒 Secure Shopping</h3>
            <p>Your health data and payments are always protected.</p>
          </div>
        </div>
      </section>

      {/* 3. Authentication Call-to-Action */}
      <section className="auth-section">
        <h2>New Here?</h2>
        <p>Log in or create an account to manage prescriptions and view order history.</p>
        <div className="auth-links">
          <Link to="/login" className="login-link">Login</Link>
          <Link to="/register" className="register-link">Register Now</Link>
        </div>
      </section>

    </div>
  );
}

export default Home;