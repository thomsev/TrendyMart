// ProductsList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductPage.css';

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/online-shop/`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-list-container">
      {products.map(product => (
        <Link key={product.id} to={`/product/${product.id}`} className="product-list-item">
          <img src={product.imageUrl} alt={product.title} />
          <h2>{product.title}</h2>
          <p className="price">Price: ${product.price}</p>
          <p className="discount-price">Discounted Price: ${product.discountedPrice}</p>
        </Link>
      ))}
    </div>
);

}

export default ProductsList;
