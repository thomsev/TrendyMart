import React from 'react';
import { useCart } from '../CartContext/CartContext'; 
import './CartIcon.css';
import { useHistory } from 'react-router-dom';

function CartIcon() {
  const { state } = useCart();
  const history = useHistory();

  const handleIconClick = () => {
    history.push('/checkout');
  };  
  
  return (
    <div className="cart-icon" onClick={handleIconClick}>
      <i className="shopping-icon">🛒</i> <span>{state.itemCount}</span>
    </div>
  );
}

export default CartIcon;
