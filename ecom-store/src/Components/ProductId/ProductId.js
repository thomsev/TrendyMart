// ProductId.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductId.css';
import { useCart } from '../CartContext/CartContext';

function ProductId() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    console.log("Add to cart clicked!"); 
};

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/online-shop/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
        <img src={product.imageUrl} alt={product.title} />
        
        <div className="product-info">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p class="discounted-price">Discounted Price: ${product.discountedPrice}</p>
            <p>Rating: {product.rating}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>

            {product.reviews && product.reviews.length > 0 ? (
                <div className="reviews-section">
                    <h2>Reviews:</h2>
                    {product.reviews.map(review => (
                        <div key={review.id} className="review">
                            <p>{review.description}</p>
                            <p><strong>{review.username}</strong> - Rating: {review.rating}/5</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No reviews available</p>
            )}
        </div>
    </div>
);
}

export default ProductId;
