// src/api/medicineApi.js

// NOTE: Must be 'let' so admin functions can modify it
let MOCK_MEDICINES = [ 
    { id: 'p1', name: 'Paracetamol 500mg', price: 3.50, description: 'Effective pain reliever...', category: 'Pain Relief', stock: 50, },
    { id: 'p2', name: 'Multivitamin Complex', price: 15.99, description: 'Daily supplement...', category: 'Vitamins', stock: 120, },
    { id: 'p3', name: 'Cough Suppressant Syrup', price: 9.75, description: 'Non-drowsy formula...', category: 'Cold & Flu', stock: 30, },
    { id: 'p4', name: 'First Aid Bandages (20ct)', price: 4.25, description: 'Assorted waterproof...', category: 'First Aid', stock: 80, },
];

/** * Public function to fetch all medicines (Used in Medicines.jsx)
 */
export const fetchMedicines = () => { // <-- CRITICAL: Must be 'export const'
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mock API: Medicines fetched successfully.");
            resolve(MOCK_MEDICINES);
        }, 500);
    });
};

/**
 * Public function to fetch details for a single medicine (Used in MedicineDetails.jsx)
 */
export const fetchMedicineById = (id) => { // <-- CRITICAL: Must be 'export const'
    return new Promise((resolve) => {
        setTimeout(() => {
            const medicine = MOCK_MEDICINES.find(m => m.id === id);
            resolve(medicine);
        }, 300);
    });
};

// --- NEW ADMIN FUNCTIONS ---

export const addMedicine = (newMedicine) => { // <-- CRITICAL: Must be 'export const'
    return new Promise((resolve) => {
        setTimeout(() => {
            const id = 'p' + (MOCK_MEDICINES.length + 1);
            const medicine = { 
                ...newMedicine, 
                id: id, 
                stock: parseInt(newMedicine.stock) 
            };
            MOCK_MEDICINES.push(medicine);
            resolve(medicine);
        }, 300);
    });
};

export const updateMedicine = (updatedMedicine) => { // <-- CRITICAL: Must be 'export const'
    // ... (logic) ...
};

export const deleteMedicine = (id) => { // <-- CRITICAL: Must be 'export const'
    // ... (logic) ...
};