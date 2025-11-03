import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMedicines } from '../api/medicineApi';

function Medicines() {
  const [allMedicines, setAllMedicines] = useState([]); 
  const [filteredMedicines, setFilteredMedicines] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Data Fetching
  useEffect(() => {
    const getMedicines = async () => {
      try {
        const data = await fetchMedicines();
        setAllMedicines(data); 
        setFilteredMedicines(data);
      } catch (err) {
        setError("Failed to fetch medicines. Please check the mock API file.");
      } finally {
        setLoading(false);
      }
    };
    getMedicines();
  }, []);

  // 2. Search/Filtering Logic (Runs whenever searchTerm changes)
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
    
    if (lowerCaseSearchTerm) {
      const results = allMedicines.filter(medicine => 
        // IMPROVED FILTERING LOGIC: Check name, description, AND category
        medicine.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        medicine.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        medicine.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredMedicines(results);
    } else {
      // If search bar is empty, show all medicines
      setFilteredMedicines(allMedicines);
    }
  }, [searchTerm, allMedicines]); 

  // 3. Placeholder for Add to Cart logic
  const handleAddToCart = (medicine) => {
    alert(`[MOCK] Added ${medicine.name} to cart.`);
  };


  // --- Render Logic ---
  if (loading) return <div className="medicines-page text-center p-20"><h2>Loading Medicines...</h2></div>;
  if (error) return <div className="medicines-page text-center p-20" style={{color: 'red'}}><h2>Error: {error}</h2></div>;


  return (
    <div className="medicines-page">
      <h2>Our Medicine Catalog</h2>
      
      {/* --- IMPROVED SEARCH INPUT --- */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by name, category (e.g., Pain Relief), or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Direct state update
          className="medicine-search-input"
        />
      </div>

      {/* --- Display the Filtered List --- */}
      {filteredMedicines.length === 0 ? (
          <p className="no-results">No medicines found matching "{searchTerm}".</p>
      ) : (
          <div className="medicine-list">
            {filteredMedicines.map(medicine => (
              
              <div key={medicine.id} className="medicine-card">
                <Link to={`/medicines/${medicine.id}`}>
                  <h3>{medicine.name}</h3>
                </Link>
                <p className="description">{medicine.description}</p>
                <p className="price">${medicine.price.toFixed(2)}</p>
                
                <button onClick={() => handleAddToCart(medicine)}>
                  Add to Cart
                </button>
              </div>
              
            ))}
          </div>
      )}
    </div>
  );
}

export default Medicines;