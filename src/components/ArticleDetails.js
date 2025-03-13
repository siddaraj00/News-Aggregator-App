import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ArticleDetails.css';

const ArticleDetails = () => {
  const { id } = useParams();
  // Implement article fetching logic here

  return (
    <div className="article-details">
      {/* Article content */}
    </div>
  );
};

export default ArticleDetails;
