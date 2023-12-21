import React, { useEffect, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { FiChevronUp, FiChevronDown, FiChevronRight } from "react-icons/fi";
import EditArticle from "./EditArticle";
import AddArticle from "./AddArticle";
import { useArticleData, useData } from "../context/DashboardDataProvider";
import { getCurrentUserId } from "./../services/firebaseConfig.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import Notification from "./Notification";

const EditArticles = () => {
  const data = useData();
  const documentId = getCurrentUserId();
  const articles = useArticleData();

  const [allClose, setAllClose] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAddModalOpenAll, setIsAddModalOpenAll] = useState(false);
  const [recentClose, setRecentClose] = useState(false);
  const [articlesData, setArticlesData] = useState(
    [...articles.articlesData] || []
  );
  const [allArticlesData, setAllArticlesData] = useState(
    [...articles.allArticlesData] || []
  );
  const [type, setType] = useState(-1);
  const [articleTemp, setArticleTemp] = useState([
    {
      title: "Article Name...",
      summary: "Summary for the article. Edit and update as needed...",
      time: "5 min read",
      img: "https://kiran.dev/potrate-style.png",
      link: "https://kiran.dev/article-of-dev-ngf01...",
    },
    {
      title: "Article line or title...",
      date: "Feb 20, 2022",
      img: "https://kiran.dev/potrate-style.png",
      link: "https://kiran.dev/article-of-dev-ngf01...",
    },
  ]);
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ",
    type: "warn",
  });

  //  ---------------- handlers -------------------------
  const notifySave = () => {
    setNoteMsg({ message: "Article data is saved 🌨️ ", type: "done" });
    setShowNotification(true);
  };
  const notifyDelete = () => {
    setNoteMsg({ message: "Article data is deleted 🗑️🧹 ", type: "dengues" });
    setShowNotification(true);
  };
  const handleSaveArticle = (updatedArticle, title) => {
    const updatedArticlesData = [...articlesData];
    const indexToUpdate = updatedArticlesData.findIndex(
      (article) => article.title === title
    );

    if (indexToUpdate !== -1) {
      updatedArticlesData[indexToUpdate] = { ...updatedArticle };
      setArticlesData(updatedArticlesData);
    }
    notifySave();
  };

  const handleSaveAllArticle = (updatedArticle, title) => {
    const updatedArticlesData = [...allArticlesData];
    const indexToUpdate = updatedArticlesData.findIndex(
      (article) => article.title === title
    );

    if (indexToUpdate !== -1) {
      updatedArticlesData[indexToUpdate] = { ...updatedArticle };
      setAllArticlesData(updatedArticlesData);
    }
    notifySave();
  };

  const handleDeleteArticle = (title) => {
    const updatedArticlesData = articlesData.filter(
      (article) => article.title !== title
    );
    setArticlesData(updatedArticlesData);
    notifyDelete();
  };

  const handleDeleteAllArticle = (title) => {
    const updatedArticlesData = allArticlesData.filter(
      (article) => article.title !== title
    );
    setAllArticlesData(updatedArticlesData);
    notifyDelete();
  };

  // -------------------- Add new Articles -----------------
  const handleAddArticle = (article) => {
    // Use a functional update to avoid potential infinite loop
    if (type === 0) {
      setArticlesData((prevArticlesData) => [...prevArticlesData, article]);
    } else if (type === 1) {
      setAllArticlesData((prevArticlesData) => [...prevArticlesData, article]);
    } else {
      console.log(" not updated..");
    }
    notifySave();
    setType(-1);
  };

  // ------------------ binary modes --------------------------------
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const openAddModalAll = () => {
    setIsAddModalOpenAll(true);
  };

  const closeAddModalAll = () => {
    setIsAddModalOpenAll(false);
  };

  const addToArticles = () => {
    setType(0);
    openAddModal();
  };
  const addToAllArticles = () => {
    setType(1);
    openAddModalAll();
  };
  // ------------------- binary Mode End -----------------------

  const db = getFirestore();
  const userPortfolioRef = doc(db, "User_portfolio_data", documentId);

  useEffect(() => {
    const updatedData = {
      ...data,
      Articles: {
        allArticlesData: [...allArticlesData],
        articlesData: [...articlesData],
      },
    };

    if (userPortfolioRef && data) {
      updateDoc(userPortfolioRef, updatedData)
        .then(() => {
          console.log("Articles data updated successfully ⭕🌨️.");
        })
        .catch((error) => {
          console.error("Error updating Articles data:", error);
        });
    }
  }, [allArticlesData, articlesData]);

  return (
    <div className='w-screen mb-5 font-mono flex flex-col'>
      <div className='w-full flex justify-between items-center text-white p-4'>
        <h2 className='text-xl sm:text-base px-3 py-1 flex items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold'>
          <span class=' cursor-pointer'>Data</span>
          <span className='w-[2px] h-[80%] bg-gray-500 mx-1' />
          | Edit Articles
          <FiChevronRight />
        </h2>
      </div>
      <div className='flex-grow p-4 overflow-y-auto text-black dark:text-white'>
        <ul className='space-y-4'>
          <li className='bg-transparent border-2 border-gray-600 p-2 rounded-lg shadow-md shadow-primary'>
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={() => setRecentClose(!recentClose)}
            >
              <strong className='cursor-pointer ml-1 font-extrabold'>
                Recent Articles
              </strong>
              <div className='flex gap-3 text-2xl'>
                <button onClick={addToArticles}>
                  <BiAddToQueue />
                </button>
                <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                  {recentClose ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
            </div>
            {articlesData && recentClose && (
              <div>
                <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                {articlesData.map((article, index) => (
                  <EditArticle
                    key={`${index}+${article.title}`}
                    articleData={article}
                    onSave={(newD, title) => {
                      handleSaveArticle(newD, title);
                    }}
                    onDelete={(title) => {
                      handleDeleteArticle(title);
                    }}
                  />
                ))}
              </div>
            )}
            {isAddModalOpen && (
              <AddArticle
                isOpen={isAddModalOpen}
                articleData={articleTemp[type]}
                onSave={handleAddArticle}
                closeModal={closeAddModal}
              />
            )}
          </li>
          <li className='bg-transparent border-2 border-gray-600 p-2 rounded-lg shadow-md shadow-primary'>
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={() => setAllClose(!allClose)}
            >
              <strong className='cursor-pointer ml-1 font-extrabold'>
                All Articles
              </strong>
              <div className='flex gap-3 text-2xl'>
                <button onClick={addToAllArticles}>
                  <BiAddToQueue />
                </button>
                <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                  {allClose ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
            </div>
            {allArticlesData && allClose && (
              <div>
                <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                {allArticlesData.map((article, index) => (
                  <EditArticle
                    key={`${index}+${article.title}`}
                    articleData={article}
                    onSave={(newD, title) => {
                      handleSaveAllArticle(newD, title);
                    }}
                    onDelete={(title) => {
                      handleDeleteAllArticle(title);
                    }}
                  />
                ))}
              </div>
            )}
            {isAddModalOpenAll && (
              <AddArticle
                isOpen={isAddModalOpenAll}
                articleData={articleTemp[type]}
                onSave={handleAddArticle}
                closeModal={closeAddModalAll}
              />
            )}
          </li>
        </ul>
      </div>
      {showNotification && (
        <Notification
          message={noteMsg.message}
          type={noteMsg.type}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default EditArticles;
