import React, { useState } from 'react';
import './CheckoutPage.css';
import { useCart } from '../CartContext/CartContext';
import { useHistory } from 'react-router-dom'; 
import InputMask from 'react-input-mask';


function CheckoutPage() {
  const { state, dispatch, clearCart } = useCart();
  const cartItems = state.items;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const history = useHistory();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted: ', formData);
    clearCart(); // <-- Clear the cart here
    history.push('/checkout-success');
  };

  const handleRemove = (item) => {
    dispatch({ type: 'REMOVE_ITEM', payload: item });
  };
  
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="cart-items">
      {cartItems.map(item => (
    <div key={item.id} className="cart-item">
      <img src={item.imageUrl} alt={item.title} width="50" />
      <p>{item.title}</p>
      <p>${item.price.toFixed(2)}</p>
      <button className="remove-button" onClick={() => handleRemove(item)}>Remove</button>
    </div>
  ))}
</div>
<p className="total-price">Total: ${totalPrice.toFixed(2)}</p>

      <form onSubmit={handleSubmit}>
        <h3>Shipping Details</h3>
        <label>First Name: <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} /></label>
        <label>Last Name: <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} /></label>
        <label>Address Line 1: <input type="text" name="address1" value={formData.address1} onChange={handleChange} /></label>
        <label>Address Line 2 (Optional): <input type="text" name="address2" value={formData.address2} onChange={handleChange} /></label>
        <label>City: <input type="text" name="city" value={formData.city} onChange={handleChange} /></label>
        <label>State/Province: <input type="text" name="state" value={formData.state} onChange={handleChange} /></label>
        <label>Postal Code: <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} /></label>
        <label>Country: <input type="text" name="country" value={formData.country} onChange={handleChange} /></label>
        <label>Phone: <input type="tel" name="phone" value={formData.phone} onChange={handleChange} /></label>
        
<h3>Payment Details</h3>
<label>Cardholder Name: 
  <input type="text" name="cardName" value={formData.cardName} onChange={handleChange} />
</label>

<label>Card Number: 
  <InputMask mask="9999 9999 9999 9999" maskChar=" " value={formData.cardNumber} onChange={handleChange}>
    {(inputProps) => <input {...inputProps} type="text" name="cardNumber" />}
  </InputMask>
</label>

<label>Expiry Date (MM/YY): 
  <InputMask mask="99/99" value={formData.expiryDate} onChange={handleChange}>
    {(inputProps) => <input {...inputProps} type="text" name="expiryDate" />}
  </InputMask>
</label>

<label>CVV: 
  <InputMask mask="999" value={formData.cvv} onChange={handleChange}>
    {(inputProps) => <input {...inputProps} type="text" name="cvv" />}
  </InputMask>
</label>

<label>Email: 
  <input type="email" name="email" value={formData.email} onChange={handleChange} />
</label>
        
        <button type="submit">Order</button>
      </form>
    </div>
  );
}

export default CheckoutPage;


