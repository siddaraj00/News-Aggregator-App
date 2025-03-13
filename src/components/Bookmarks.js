import React, { useState, useEffect } from "react";
import "../styles/Bookmarks.css";

const Bookmarks = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarkedArticles(bookmarks);
  }, []);

  // ✅ Function to remove a bookmark
  const removeBookmark = (url) => {
    const updatedBookmarks = bookmarkedArticles.filter((article) => article.url !== url);
    setBookmarkedArticles(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    alert("Bookmark removed ❌");
  };

  return (
    <div className="bookmarks">
      <h2>📚 Bookmarked Articles</h2>
      <div className="bookmarks-grid">
        {bookmarkedArticles.length > 0 ? (
          bookmarkedArticles.map((article, index) => (
            <div key={index} className="news-card">
              <img src={article.urlToImage || "placeholder.jpg"} alt={article.title} className="news-image" />
              <h3>{article.title}</h3>
              <p>{article.description || "No description available."}</p>
              <div className="news-actions">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                  Read More
                </a>
                <button onClick={() => removeBookmark(article.url)} className="remove-btn">❌ Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No bookmarks saved.</p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
