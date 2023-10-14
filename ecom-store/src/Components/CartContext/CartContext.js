import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { 
        ...state, 
        itemCount: state.itemCount + 1, 
        items: [...state.items, action.payload]
      };
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        itemCount: updatedItems.length,
        items: updatedItems
      };
    }
    case 'INITIALIZE_CART':
      return action.payload;
    case 'CLEAR_CART':
      return { ...state, itemCount: 0, items: [] }; 
    default:
      return state;
  }
};

const initialCartState = {
  itemCount: 0,
  items: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'INITIALIZE_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, clearCart }}> {/* Here we're also passing down the clearCart function. */}
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
