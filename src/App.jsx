import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// --- Component Imports ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// --- Page Imports ---
import Home from './pages/Home';
import Medicines from './pages/Medicines';
import MedicineDetails from './pages/MedicineDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact'; // <-- ADDED SUPPORT PAGE

// --- Context Import (CRITICAL for protection) ---
import { useAuth } from './store/AuthContext'; 


// Custom Component to protect routes requiring authentication
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, user } = useAuth();
  
  if (!isLoggedIn) {
    // 1. If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // 2. If a role is required (like 'admin') and the user doesn't have it, deny access
    // This is useful for preventing standard users from seeing the Admin Dashboard
    return <Navigate to="/" replace />; 
  }
  
  // 3. If authenticated and authorized, render the desired page
  return children;
};


function App() {
  return (
    <>
      <Navbar />
      
      <main className="main-content">
        <Routes>
          {/* --- Public Routes (Accessible by anyone) --- */}
          <Route path="/" element={<Home />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/medicines/:id" element={<MedicineDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/contact" element={<Contact />} /> {/* <-- ADDED ROUTE */}

          {/* --- Protected Routes (Require Login) --- */}
          
          {/* Checkout requires general login */}
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin requires login AND specific 'admin' role */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* --- Fallback Route (404) --- */}
          <Route path="*" element={
            <div className="text-center p-10">
              <h1>404</h1>
              <p>The page you are looking for does not exist.</p>
            </div>
          } />
        </Routes>
        
      </main>
      
      <Footer />
    </>
  );
}

export default App;