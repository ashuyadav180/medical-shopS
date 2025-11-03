import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/CartContext'; 
import { useAuth } from '../store/AuthContext'; // Used for validation

function Checkout() {
  const { items, totalAmount, clearCart } = useCart();
  const { isLoggedIn } = useAuth(); 
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({ name: '', address: '' });
  
  const handleInputChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
        alert("You must be logged in to complete your order.");
        return;
    }
    if (items.length === 0) {
        alert("Your cart is empty!");
        navigate('/cart');
        return;
    }
    if (!shippingDetails.name || !shippingDetails.address) {
        alert("Please enter all shipping details.");
        return;
    }

    // --- MOCK ORDER PLACEMENT ---
    console.log("Submitting final order:", { items, totalAmount });
    
    clearCart(); // Clear the cart state after successful mock submission
    
    navigate('/order-confirmation'); // Redirect to confirmation page
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <div className="shipping-form">
          <h3>Shipping Information</h3>
          <form onSubmit={handleSubmitOrder}>
            <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} required />
            <textarea name="address" placeholder="Shipping Address" onChange={handleInputChange} required />
            
            <h3>Payment Method</h3>
            <p className="small-text">Secure payment gateway integration goes here.</p>

            <button type="submit" className="place-order-button" disabled={items.length === 0}>
              Place Order (${totalAmount.toFixed(2)})
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {items.map(item => (
            <p key={item.id}>{item.name} x {item.quantity} (${(item.price * item.quantity).toFixed(2)})</p>
          ))}
          <hr/>
          <h4>Grand Total: ${totalAmount.toFixed(2)}</h4>
        </div>
      </div>
    </div>
  );
}

export default Checkout;