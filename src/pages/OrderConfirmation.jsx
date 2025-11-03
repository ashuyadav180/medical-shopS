import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function OrderConfirmation() {
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // 1. Generate a mock order ID for immediate display
    const mockId = 'ORDER-' + Math.floor(Math.random() * 100000);
    setOrderId(mockId);
    
    // 2. In a real app, you might also clear any last vestiges of the cart 
    //    or fetch the final order summary here.
  }, []);

  return (
    <div className="confirmation-page text-center p-20">
      <h1 style={{color: '#28a745', fontSize: '2.5rem', marginBottom: '15px'}}>✅ Order Placed Successfully!</h1>
      
      {orderId ? (
        <p style={{fontSize: '1.2rem', margin: '20px 0'}}>
          Your order number is: <strong>{orderId}</strong>.
        </p>
      ) : (
        <p>Processing your confirmation details...</p>
      )}
      
      <p style={{marginBottom: '30px', color: '#6c757d'}}>
        A detailed confirmation email has been sent to your registered address.
      </p>

      <div className="action-links">
        <Link to="/medicines" className="cta-button">
          Continue Shopping
        </Link>
        <Link to="/" className="home-link" style={{marginLeft: '20px'}}>
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;