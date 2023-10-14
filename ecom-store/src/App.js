import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MetaTags from './Components/MetaTags/MetaTags';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Footer from './Components/Footer/Footer';
import Home from './Components/Homepage/HomePage';
import Contact from './Components/Contact/Contact';
import { CartProvider } from './Components/CartContext/CartContext';
import CartIcon from './Components/CartIcon/CartIcon';
import ProductPage from './Components/ProductPage/ProductPage';
import CheckoutPage from './Components/CheckoutPage/CheckoutPage';
import ProductId from './Components/ProductId/ProductId';
import CheckOutSuccessPage from './Components/CheckOutSuccessPage/CheckOutSuccessPage';
import SearchBar from './Components/SearchBar/SearchBar';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  console.log(products);

  // Function to handle search
  const handleSearch = (searchTerm) => {
    // Filter products based on title or tags containing the search term
    console.log(searchTerm); // Add this line to check the input value
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredProducts(filtered);
  };

  return (
    <Router>
      <MetaTags />
      <CartProvider>
        <div className="site">
          <Header />
          <Nav onSearch={handleSearch} /> {/* Pass onSearch prop here */}
          <div className="site-content">
            <main>
              <Switch>
                <Route exact path="/" render={() => <Home products={filteredProducts.length ? filteredProducts : products} isLoading={isLoading} error={error} />} />
                <Route path="/contact" component={Contact} />
                <Route path="/checkout" component={CheckoutPage} />
                <Route path="/product/:id" component={ProductId} />
                <Route path="/products" component={ProductPage} />
                <Route path="/checkout-success" component={CheckOutSuccessPage} />
                {/* Add more routes as needed */}
              </Switch>
            </main>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
