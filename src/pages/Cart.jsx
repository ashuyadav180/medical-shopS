import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/CartContext'; // Uses the working cart hook

function Cart() {
  const { items, totalAmount, addItem, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart is Empty</h2>
        <p>Browse our <Link to="/medicines">medicines</Link> to start shopping!</p>
      </div>
    );
  }

  const formattedTotal = totalAmount.toFixed(2);

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <div>
              <h4>{item.name}</h4>
              <span className="price">${item.price.toFixed(2)}</span>
            </div>
            <div className="controls">
              {/* removeItem handles decreasing quantity or removing the item */}
              <button onClick={() => removeItem(item.id)}>-</button> 
              <span className="quantity">{item.quantity}</span>
              {/* addItem handles incrementing quantity by 1 */}
              <button onClick={() => addItem({ ...item, quantity: 1 })}>+</button> 
            </div>
            <span className="subtotal">${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <button onClick={clearCart} className="delete-button" style={{width: 'auto', marginRight: '15px'}}>
            Clear Cart
        </button>
        <h3>Total: ${formattedTotal}</h3>
        <Link to="/checkout" className="checkout-button">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;