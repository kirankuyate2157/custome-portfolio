import React, { useEffect, useState } from 'react'
import { BiAddToQueue } from 'react-icons/bi'
import { FiChevronUp, FiChevronDown, FiChevronRight } from 'react-icons/fi'
import EditArticle from './EditArticle'
import { useArticleData, useData } from '../context/DashboardDataProvider'
import { getCurrentUserId } from "./../services/firebaseConfig.js";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';


const EditArticles = () => {
  const data = useData();
  const documentId = getCurrentUserId();
  const articles = useArticleData();


  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [allClose, setAllClose] = useState(false);
  // const [portfolio,setPortfolio] = useState({...data});
  const [recentClose, setRecentAllClose] = useState(false)
  const [articlesData, setArticlesData] = useState(articles.articlesData || [])
  const [allArticlesData, setAllArticlesData] = useState(articles.allArticlesData || [])
  const [type, setType] = useState(0);
  const [showAddArticle, setShowAddArticle] = useState(0);
  const [articleTemp, setArticleTemp] = useState([{
    title: ' Article Name...',
    summary: 'Summary for the article. Edit and update as needed...',
    time: '5 min read',
    img: 'https://kiran.dev/potrate-style.png',
    link: 'https://kiran.dev/article-of-dev-ngf01...',
  }, {
    title: 'Article line or title...',
    date: 'Feb 20, 2022',
    img: 'https://kiran.dev/potrate-style.png',
    link: 'https://kiran.dev/article-of-dev-ngf01...',
  },])

  // ---------------------- binary decision handler --------------------------------
  const handleOpenFormModal = () => {
    setIsFormModalOpen(true)
  }

  // --------------------- operation handlers ---------------------------------------
  // Function to update article data
  const handleSaveArticle = (updatedArticle, title) => {
    // Find the index of the article to be updated
    const indexToUpdate = articlesData.findIndex((article) => article.title === title)

    if (indexToUpdate !== -1) {
      // Create a copy of the article data and update the specific article
      const updatedArticlesData = [...articlesData]
      updatedArticlesData[indexToUpdate] = updatedArticle
      setArticlesData(updatedArticlesData)
    }
  }

  // Function to update All article data
  const handleSaveAllArticle = (updatedArticle, title) => {
    // Find the index of the article to be updated
    const indexToUpdate = allArticlesData.findIndex((article) => article.title === title)

    if (indexToUpdate !== -1) {
      // Create a copy of the article data and update the specific article
      const updatedArticlesData = [...allArticlesData]
      updatedArticlesData[indexToUpdate] = updatedArticle
      setAllArticlesData(updatedArticlesData)
    }
  }

  // Function to delete article data
  const handleDeleteArticle = (title) => {
    // Filter out the article to be deleted
    const updatedArticlesData = articlesData.filter((article) => article.title !== title)
    setArticlesData(updatedArticlesData)
  }

  // Function to delete article data
  const handleDeleteAllArticle = (title) => {
    // Filter out the article to be deleted
    const updatedArticlesData = allArticlesData.filter((article) => article.title !== title)
    setAllArticlesData(updatedArticlesData)
  }


  const handleAddArticle = (article) => {
    if (!type) {
      setArticlesData([...articlesData, article]);
    } else {
      setAllArticlesData([...allArticlesData, article])
    }
    setShowAddArticle(0);
    setType(false);
  }



  // ---------------- update to firebase -----------------------
  const db = getFirestore();
  if (documentId) {
    var userPortfolioRef = doc(db, 'User_portfolio_data', documentId);
  }
  else {
    console.log(" current user id not found !")
  }

  useEffect(() => {
    // Create a copy of the original data
    const updatedData = {
      ...data,
      Articles: {
        allArticlesData: [...allArticlesData],
        articlesData: [...articlesData],
      },
    };


    if (userPortfolioRef) {
      if (data) {
        console.log("started home data updating .⚙️...")

        // Update the document in Firestone
        updateDoc(userPortfolioRef, updatedData)
          .then(() => {
            console.log('Articals  data updated successfully ⭕🌨️.');
          })
          .catch((error) => {
            console.error('Error updating Home data :', error);
          });
      }
    }
  }, [allArticlesData, articlesData]);




  // useEffect(() => {
  //   getDoc(userPortfolioRef)
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setPortfolioData(snapshot.data());
  //       } else {
  //         console.error('Portfolio data not found for document ID:', documentId);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error loading portfolio data:', error);
  //     });
  // }, [documentId, userPortfolioRef]);


  // -------------------------- effect ------------------------------- 
  useEffect(() => {
    console.log("All articles: ", allArticlesData);
    console.log("Articles: ", articlesData);

    // Create a copy of the original data
    const updatedData = {
      ...data,
      Articles: {
        allArticlesData: [...allArticlesData],
        articlesData: [...articlesData],
      },
    };

    console.log("Updated Articles: 📜📜📜 ", updatedData);
  }, [allArticlesData, articlesData])


  return (
    <>
      <div className='w-screen   mb-5  font-mono text-black dark:text-white flex flex-col'>
        <div className='w-full flex justify-between items-center text-white p-4'>
          <h2 className='text-xl sm:text-base px-3 py-1 flex items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold'><span class=' cursor-pointer'>Data</span> <span className='w-[2px] h-[80%] bg-gray-500 mx-1' /> | Edit Articles <FiChevronRight /></h2>
          {/* <h2 className='text-4xl mr-10 sm:mr-0 sm:text-2xl p-2 items-center gap-1 rounded-full text-pink-500 font-semibold' onClick={() => {handleOpenFormModal()}}><BiAddToQueue /></h2> */}
        </div>
        <div className='flex-grow p-4 overflow-y-auto'>
          <ul className='space-y-4'>
            <li className='bg-transparent border-2  shadow-md shadow-pink-300    border-gray-600 p-2 rounded-lg'>
              <div className='flex items-center justify-between cursor-pointer' onClick={() => { setRecentAllClose(!recentClose) }}>
                <strong className='cursor-pointer ml-1 font-extrabold'>Recent articles</strong>
                <div className='flex gap-3 text-2xl'>
                  <button >
                    <BiAddToQueue />
                  </button>
                  <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                    {recentClose ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
                </div>
              </div>
              {articlesData && recentClose && (
                <div>
                  <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                  {articlesData.map((article, index) => (
                    <EditArticle
                      key={`${article.title}-${index}`}
                      articleData={article}
                      onSave={handleSaveArticle}
                      onDelete={handleDeleteArticle} />
                  ))}
                </div>
              )}
            </li>
            <li className='bg-transparent border-2   shadow-md shadow-pink-300  border-gray-600 p-2 rounded-lg'>
              <div className='flex items-center justify-between cursor-pointer' onClick={() => { setAllClose(!allClose) }}>
                <strong className='cursor-pointer ml-1 font-extrabold'>All articles</strong>
                <div className='flex gap-3 text-2xl'>
                  <button >
                    <BiAddToQueue />
                  </button>
                  <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                    {allClose ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
                </div>
              </div>
              {allArticlesData && allClose && (
                <div>
                  <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                  {allArticlesData.map((article, index) => (
                    <EditArticle
                      key={`${article.title}-${index}`}
                      articleData={article}
                      onSave={handleSaveAllArticle}
                      onDelete={handleDeleteAllArticle} />
                  ))}
                </div>
              )}
            </li>
          </ul>

        </div>
      </div>
    </>
  )
}

export default EditArticles
