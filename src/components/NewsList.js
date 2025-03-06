import React, { useEffect, useState } from "react";

const NewsList = ({ category = "general", searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      let url = `http://localhost:3001/news?category=${category}`;
      if (searchQuery) {
        url = `http://localhost:3001/news?query=${encodeURIComponent(searchQuery)}`;
      }

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.articles) {
          setArticles(data.articles);
        } else {
          setError("No news found.");
        }
      } catch (error) {
        setError("Error fetching news. Check your backend server.");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, searchQuery]);

  const handleBookmark = (article) => {
    try {
      let savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

      if (savedBookmarks.some((item) => item.url === article.url)) {
        alert("This article is already bookmarked.");
        return;
      }

      savedBookmarks.push(article);
      localStorage.setItem("bookmarks", JSON.stringify(savedBookmarks));
      alert("Article bookmarked!");
    } catch (error) {
      console.error("Bookmarking Error:", error);
      alert("Failed to bookmark article.");
    }
  };

  return (
    <div className="news-container">
      {loading && <p>Loading news...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && articles.length === 0 && <p>No news found.</p>}

      {!loading && !error && articles.length > 0 && (
        articles.map((article, index) => (
          <div key={index} className="news-card">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="news-image" />
            )}
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
      )}
    </div>
  );
};

export default NewsList;
