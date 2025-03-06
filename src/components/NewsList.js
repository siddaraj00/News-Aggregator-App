import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_NEWS_API_KEY; // Ensure this is set

const NewsList = ({ category, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      if (!API_KEY) {
        setError("API key is missing. Check your .env file.");
        setLoading(false);
        return;
      }

      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
      if (searchQuery) {
        url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${API_KEY}`;
      }

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0", // Helps bypass certain API restrictions
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "ok") {
          setArticles(data.articles || []);
        } else {
          setError(`API Error: ${data.message}`);
        }
      } catch (error) {
        setError("Error fetching news. Check your network and API key.");
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
