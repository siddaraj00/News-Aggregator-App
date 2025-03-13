import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ onSearch, onCategoryChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = ['General', 'Business', 'Technology', 'Sports', 'Entertainment', 'Health'];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">NewsAggregator</Link>
      </div>
      <div className="nav-categories">
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => onCategoryChange(category.toLowerCase())}
            className="category-btn"
          >
            {category}
          </button>
        ))}
      </div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <Link to="/bookmarks" className="bookmarks-link">
        Bookmarks
      </Link>
    </nav>
  );
};

export default Navbar;
