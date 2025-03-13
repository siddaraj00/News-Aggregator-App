import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY; // Use from .env file

const NewsList = ({ category, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
      if (searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok") {
          setArticles(data.articles || []);
        } else {
          setError("Failed to fetch news. Please try again.");
        }
      } catch (error) {
        setError("Error fetching news. Check your network.");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, searchQuery]);

  const handleBookmark = (article) => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

    if (savedBookmarks.some((item) => item.url === article.url)) {
      alert("This article is already bookmarked.");
      return;
    }

    savedBookmarks.push(article);
    localStorage.setItem("bookmarks", JSON.stringify(savedBookmarks));
    alert("Article bookmarked!");
  };

  return (
    <div className="news-container">
      {loading && <p>Loading news...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && articles.length > 0 ? (
        articles.map((article, index) => (
          <div key={index} className="news-card">
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="news-image" />}
            <h3>{article.title}</h3>
            <p>{article.description || "No description available."}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
              Read more
            </a>
            <button onClick={() => handleBookmark(article)} className="bookmark-btn">
              Bookmark
            </button>
          </div>
        ))
      ) : (
        !loading && !error && <p>No news found.</p>
      )}
    </div>
  );
};

export default NewsList;
