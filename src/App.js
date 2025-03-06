import React, { useState } from "react";
import NewsList from "./components/NewsList";
import SearchBar from "./components/SearchBar";
import Bookmarks from "./components/Bookmarks";

const App = () => {
  const [category, setCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBookmarks, setShowBookmarks] = useState(false);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchQuery(""); // ✅ Reset search when category changes
    setShowBookmarks(false); // ✅ Ensure news page shows when category changes
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowBookmarks(false); // ✅ Hide bookmarks when searching
  };

  return (
    <div className="app-container">
      <SearchBar onSearch={handleSearch} />

      <div className="category-buttons">
        {/* ✅ Added 5 More Categories */}
        <button onClick={() => handleCategoryChange("general")}>General</button>
        <button onClick={() => handleCategoryChange("business")}>Business</button>
        <button onClick={() => handleCategoryChange("sports")}>Sports</button>
        <button onClick={() => handleCategoryChange("technology")}>Technology</button>
        <button onClick={() => handleCategoryChange("entertainment")}>Entertainment</button>
        <button onClick={() => handleCategoryChange("health")}>Health</button>
        <button onClick={() => handleCategoryChange("science")}>Science</button>
      </div>

      {/* ✅ Toggle Between News and Bookmarks */}
      <button className="toggle-btn" onClick={() => setShowBookmarks(!showBookmarks)}>
        {showBookmarks ? "Go to News" : "View Bookmarks"}
      </button>

      {showBookmarks ? <Bookmarks /> : <NewsList category={category} searchQuery={searchQuery} />}
    </div>
  );
};

export default App;
