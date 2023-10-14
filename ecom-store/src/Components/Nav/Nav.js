import React from 'react';
import CartIcon from '../CartIcon/CartIcon';
import './Nav.css';

function Nav({ onSearch }) { 
  return (
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/contact">Contact</a></li>
        
        <li><CartIcon /></li> 
      </ul>
    </nav>
  );
}

export default Nav;

  