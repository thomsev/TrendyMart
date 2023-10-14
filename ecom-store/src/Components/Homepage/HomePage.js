import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './HomePage.css';

function Home() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [filteredProducts, setFilteredProducts] = useState([]); 

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await fetch('https://api.noroff.dev/api/v1/online-shop');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    // Function to handle search
    const handleSearch = () => {
        // Filter products based on title or tags containing the search term
        const filtered = products.filter(
            (product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredProducts(filtered);
    };

    // Handle search term change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <div className="home-container">
            <h2>Welcome to TrendyMart's Wonderland!</h2>
            <p>From chic to unique, we've got your style cravings covered. Browse our complete collection below and experience our unbeatable prices firsthand!</p>
            {isLoading && <p>Loading products...</p>}
            {error && <p>Error: {error}</p>}
            <form className="custom-search-form" onSubmit={handleSearchSubmit}>
    <input
        className="custom-search-input"
        type="text"
        placeholder="Search by title or tag..."
        value={searchTerm}
        onChange={handleSearchChange}
    />
    <button className="custom-search-button" type="submit">Search</button>
</form>

            <div className="products-list-container">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`} className="product-list-item">
                            <img src={product.imageUrl} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p className="price">Price: ${product.price}</p>
                            <p className="discount-price">Discounted Price: ${product.discountedPrice}</p>
                        </Link>
                    ))
                ) : (
                    products.map((product) => (
                        <Link key={product.id} to={`/product/${product.id}`} className="product-list-item">
                            <img src={product.imageUrl} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p className="price">Price: ${product.price}</p>
                            <p className="discount-price">Discounted Price: ${product.discountedPrice}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;
