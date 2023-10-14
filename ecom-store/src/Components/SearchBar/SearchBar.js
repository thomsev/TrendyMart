import React, { useState } from 'react';
import './SearchBar.css'; // Import the CSS file

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by title or tag..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="search-button" type="submit">Search</button> 
      </form>
    </div>
  );
}

export default SearchBar;
