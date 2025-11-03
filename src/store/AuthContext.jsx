// src/store/AuthContext.jsx (COMPLETE AND CORRECT CODE)

import React, { useState, createContext, useEffect } from 'react';

const retrieveStoredData = () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    return { 
        token: storedToken, 
        user: storedUser ? JSON.parse(storedUser) : null 
    };
};

export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    user: null,
    login: (token, userData) => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const data = retrieveStoredData();
    const [token, setToken] = useState(data.token);
    const [user, setUser] = useState(data.user);

    // Update useEffect to correctly check local storage and initialize state
    useEffect(() => {
        if (data.token) {
            setToken(data.token);
            setUser(data.user);
        }
    }, []); 

    const loginHandler = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        // Store user data in local storage
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logoutHandler = () => {
        setToken(null);
        setUser(null);
        // Remove data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const contextValue = {
        isLoggedIn: !!token, 
        token: token,
        user: user,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// --- CRITICAL ADDITION ---
// This line provides the named export 'useAuth' that your Navbar.jsx needs.
export const useAuth = () => React.useContext(AuthContext);