import React, { useState } from "react";
import "../styles/SearchBar.css"; // Make sure you have this CSS file or create one.

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query); // Call the function passed as a prop
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search news..."
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
