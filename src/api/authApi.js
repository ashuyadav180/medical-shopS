// src/api/authApi.js

// Mock user database (in a real app, this would be a database call)
const MOCK_USER_DB = [
    { id: 'u1', email: 'user@example.com', name: 'Ashu User', role: 'customer', passwordHash: 'hashed123' },
    { id: 'u2', email: 'admin@example.com', name: 'Admin User', role: 'admin', passwordHash: 'hashedadmin' },
];

/**
 * Simulates a user login request.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise that resolves with user data and a token on success.
 */
export const loginUser = ({ email, password }) => {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            const user = MOCK_USER_DB.find(u => u.email === email);

            // In a real app, you would check passwordHash against the provided password.
            // Here, we just check for the presence of the email and a simple mock password check.
            if (user && password === "password") { 
                console.log(`Mock API: User ${email} logged in successfully.`);
                
                // Return necessary data for the frontend
                resolve({
                    token: `mock_jwt_${user.id}_${Date.now()}`,
                    user: { id: user.id, email: user.email, name: user.name, role: user.role }
                });
            } else {
                console.error("Mock API: Login failed.");
                reject({ message: "Invalid email or password. Use email: user@example.com and password: password" });
            }
        }, 800);
    });
};

/**
 * Simulates a user registration request.
 * @param {Object} userData - User registration details (email, password, name).
 * @returns {Promise<Object>} A promise that resolves with a success message.
 */
export const registerUser = ({ email, password, name }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (MOCK_USER_DB.some(u => u.email === email)) {
                reject({ message: "Email already registered." });
            } else {
                console.log(`Mock API: User ${email} registered.`);
                // In a real app, you would save this to the database.
                resolve({ message: "Registration successful! You can now log in." });
            }
        }, 1000);
    });
};