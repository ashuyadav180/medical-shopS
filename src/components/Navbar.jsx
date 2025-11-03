import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/AuthContext'; 
import { useCart } from '../store/CartContext'; 

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { items } = useCart(); 
  
  // Calculation logic for the cart icon display
  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0); 

  return (
    <header className="navbar">
      <h1><Link to="/">💊 Medical Shop</Link></h1>
      <nav>
        <ul>
          <li><Link to="/medicines">Shop</Link></li>
          
          {/* Show Admin link only if logged in and role is admin */}
          {isLoggedIn && user?.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
          
          <li>
            <Link to="/cart">
              Cart ({cartItemCount})
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              // Show Logout button with user's first name
              <button onClick={logout}>Logout ({user.name.split(' ')[0]})</button>
            ) : (
              // Show Login link if logged out
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

// CRITICAL: Ensure the component is exported only once as the default export
export default Navbar;