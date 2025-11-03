// src/pages/Contact.jsx

import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- MOCK API CALL HERE ---
    console.log("Submitting support request:", formData);
    
    alert("Thank you! Your message has been sent. We will respond within 24 hours.");
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
    
    // In a real application, you would call an API endpoint: 
    // sendSupportEmail(formData).then(success => ...)
  };

  return (
    <div className="contact-page">
      <h1>Contact Our Support Team</h1>
      <p>Have questions about a medicine, your order, or need technical help? Send us a message!</p>
      
      <div className="contact-details">
          <h3>Quick Help</h3>
          <p>📧 Email: support@medicalshop.com</p>
          <p>📞 Phone: 1-800-PHARMACY (M-F, 9am-5pm)</p>
          <p>📍 Address: 123 Health Blvd, Wellness City</p>
      </div>

      <form onSubmit={handleSubmit} className="support-form">
          <h3>Send Us a Message</h3>
          <input type="text" name="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} required />
          <input type="text" name="subject" placeholder="Subject (e.g., Order #1001, Prescription Inquiry)" value={formData.subject} onChange={handleChange} required />
          <textarea name="message" placeholder="Your detailed message..." value={formData.message} onChange={handleChange} rows="5" required />
          
          <button type="submit" className="cta-button">Submit Request</button>
      </form>
    </div>
  );
}

export default Contact;