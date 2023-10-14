import React from 'react';
import { Link } from 'react-router-dom'; // <-- Import already here
import './CheckOutSuccessPage.css';

function CheckOutSuccess() {
  return (
    <div className="checkout-success">
      <h2>Thank You for Shopping with TrendyMart!</h2>
      <p>Your trust means the world to us. We're thrilled you chose TrendyMart and we've sent a confirmation email to your provided address. We're certain you'll love your new picks!</p>
      <p>If there's anything amiss or if you have any queries, our TrendyMart support is here to assist. Please feel free to <Link to="/contact">reach out to us</Link>.</p>
      
      {/* Link to the homepage added below */}
      <p><Link to="/">Click here to return to the homepage</Link>.</p>
    </div>
  );
}

export default CheckOutSuccess;

