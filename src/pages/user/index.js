import React, { useState } from 'react';
import AddArticle from './../../components/AddArticle.js';

const ParentComponent = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [recentArticlesData, setRecentArticlesData] = useState([
    {
      title: 'Article Name...',
      summary: 'Summary for the article. Edit and update as needed...',
      time: '5 min read',
      img: 'https://kiran.dev/potrate-style.png',
      link: 'https://kiran.dev/article-of-dev-ngf01...',
    },
  ]);

  const handleAddNewData = (newArticle) => {
    setRecentArticlesData([...recentArticlesData, newArticle]);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <button onClick={openAddModal}>Add New Article</button>

      {isAddModalOpen && (
        <AddArticle
          articleData={recentArticlesData[0]}
          onSave={handleAddNewData}
          onClose={closeAddModal}
        />
      )}

      <div>
        <h2>Recent Articles:</h2>
        {recentArticlesData.map((article, index) => (
          <div key={`${article.title}-${index}`}>
            <p>Title: {article.title}</p>
            <p>Summary: {article.summary}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ParentComponent;
