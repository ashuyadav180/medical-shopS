import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMedicineById } from '../api/medicineApi'; 
import { useCart } from '../store/CartContext'; 

function MedicineDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart(); 

  // --- Data Fetching Logic (Omitted for brevity, but assumed here) ---
  useEffect(() => {
    // ... logic to call fetchMedicineById(id) ...
  }, [id]);

  // --- Handlers ---
  const handleAddToCart = () => {
    if (!medicine || medicine.stock === 0) return;

    const itemToAdd = {
      id: medicine.id,
      name: medicine.name,
      price: medicine.price,
      quantity: 1, 
    };
    addItem(itemToAdd);
    alert(`Added one unit of ${medicine.name} to cart.`);
  };

  // --- Conditional Rendering for States ---
  if (isLoading) {
    return <div className="detail-loading text-center p-20"><h2>Loading Product Details...</h2></div>;
  }
  if (!medicine) {
    return (
      <div className="detail-error text-center p-20">
        <h1>404</h1>
        <h2>Medicine Not Found</h2>
        <button onClick={() => navigate('/medicines')} className="cta-button" style={{marginTop: '20px'}}>
            Back to Shop
        </button>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="product-detail-page">
      <div className="product-detail-grid">
        
        {/* 1. Product Image / Visuals */}
        <div className="detail-visuals">
          <div className="main-image">
             
          </div>
          <p className="small-text-disclaimer">Product appearance may vary slightly from image shown.</p>
        </div>

        {/* 2. Product Information and Actions */}
        <div className="detail-info-actions">
          
          <h1 className="product-title">{medicine.name}</h1>
          <p className="product-category">Category: <strong>{medicine.category}</strong></p>

          <hr className="divider" />
          
          <div className="price-and-stock">
            <span className="price-large">${medicine.price.toFixed(2)}</span>
            <span className={`stock-status status-${medicine.stock > 10 ? 'high' : 'low'}`}>
              {medicine.stock > 0 ? (medicine.stock > 10 ? 'In Stock' : 'Low Stock') : 'Out of Stock'}
            </span>
          </div>

          <p className="short-description">{medicine.description}</p>
          
          <div className="cart-action-group">
            {/* Input for Quantity can be added here */}
            
            <button 
              onClick={handleAddToCart} 
              disabled={medicine.stock === 0}
              className="add-to-cart-button"
            >
              {medicine.stock > 0 ? 'Add to Cart' : 'Currently Unavailable'}
            </button>
          </div>

        </div>
      </div>
      
      {/* 3. Detailed Information Section */}
      <div className="detailed-sections">
        <h2>Product Details & Usage</h2>
        <p>
            {/* Placeholder for long, professional detail text */}
            This medicine is manufactured under strict quality control standards. Always read the label and follow the directions for use. If symptoms persist, talk to your health professional.
        </p>
      </div>

    </div>
  );
}

export default MedicineDetails;