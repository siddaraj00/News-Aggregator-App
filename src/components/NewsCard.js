import React from "react";
import { Link } from "react-router-dom";
import "../styles/NewsCard.css";

const NewsCard = ({ article }) => {
  const handleBookmark = () => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    // Prevent duplicate bookmarks
    if (!savedBookmarks.some((item) => item.url === article.url)) {
      savedBookmarks.push(article);
      localStorage.setItem("bookmarks", JSON.stringify(savedBookmarks));
      alert("Article bookmarked! ✅");
    } else {
      alert("Already bookmarked! 🚀");
    }
  };

  return (
    <div className="news-card">
      <img src={article.urlToImage || "placeholder.jpg"} alt={article.title} className="news-image" />
      <h3>{article.title}</h3>
      <p>{article.description || "No description available."}</p>
      <div className="news-actions">
        <Link to={`/article/${encodeURIComponent(article.title)}`} className="read-more">
          Read More
        </Link>
        <button onClick={handleBookmark} className="bookmark-btn">📌 Bookmark</button>
      </div>
    </div>
  );
};

export default NewsCard;
