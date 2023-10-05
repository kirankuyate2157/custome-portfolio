import React,{useState} from 'react'
import { BiAddToQueue } from "react-icons/bi";
import { FiChevronUp, FiChevronDown, FiChevronRight } from "react-icons/fi";
import KiranPortfolioData from '../assets/portfolioData';
import EditArticle from './EditArticle';
import articles from './../pages/articles';
const EditArticles = () => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [allClose,setAllClose]=useState(false);
    const [recentClose,setRecentAllClose]=useState(false);
    const [articlesData, setArticlesData] = useState(KiranPortfolioData.Articles.articlesData || []);
    const [allArticlesData, setAllArticlesData] = useState(KiranPortfolioData.Articles.allArticlesData || []);
  
    const handleOpenFormModal = () => {
        setIsFormModalOpen(true);
      };
   
      // Function to update article data
      const handleSaveArticle = (updatedArticle) => {
        // Find the index of the article to be updated
        const indexToUpdate = articlesData.findIndex(article => article.title === updatedArticle.title);
    
        if (indexToUpdate !== -1) {
          // Create a copy of the article data and update the specific article
          const updatedArticlesData = [...articlesData];
          updatedArticlesData[indexToUpdate] = updatedArticle;
          setArticlesData(updatedArticlesData);
        }
      };
    
      // Function to delete article data
      const handleDeleteArticle = (title) => {
        // Filter out the article to be deleted
        const updatedArticlesData = articlesData.filter(article => article.title !== title);
        setArticlesData(updatedArticlesData);
      };
    

  return (
    <div className="w-screen   mb-5  font-mono text-black dark:text-white flex flex-col">
      <div className="w-full flex justify-between items-center text-white p-4">
        <h2 className="text-xl sm:text-base px-3 py-1 flex items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold">
          <span class=" cursor-pointer">Data</span>
          <span className="w-[2px] h-[80%] bg-gray-500 mx-1" />
          | Edit Articles 
          <FiChevronRight />
        </h2>
        <h2
          className="text-4xl mr-10 sm:mr-0 sm:text-2xl p-2  items-center gap-1 rounded-full   text-pink-500  font-semibold"
          onClick={() => {
            handleOpenFormModal();
          }}
        >
          <BiAddToQueue />
        </h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
      <ul className="space-y-4">
          <li
            className="bg-transparent border-2  shadow-md shadow-pink-300    border-gray-600 p-2 rounded-lg"
            
          >
            <div className="flex items-center justify-between cursor-pointer"
             onClick={() => {
            setRecentAllClose(!recentClose);
          }}>
              <strong className="cursor-pointer ml-1 font-extrabold">
                Recent articles
              </strong>
              <div className="flex gap-2 ">
              
                <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                    { recentClose ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
              </div>
            </div>
            {articlesData && recentClose && (
              <div>
                <hr className="mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700" />
                {articlesData.map((article, index) => (
                    <EditArticle
                    key={index}
                    articleData={article}
                    onSave={handleSaveArticle}
                    onDelete={handleDeleteArticle}
                    />
                ))}
              </div>
            )}
            
          </li>


          <li
            className="bg-transparent border-2   shadow-md shadow-pink-300  border-gray-600 p-2 rounded-lg"
           
          >
            <div className="flex items-center justify-between cursor-pointer"
             onClick={() => {
            
              setAllClose(!allClose);
            }}>
              <strong className="cursor-pointer ml-1 font-extrabold">
                All articles
              </strong>
              <div className="flex gap-2 ">
              
                <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                    { allClose ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
              </div>
            </div>
            {allArticlesData && allClose && (
              <div>
                <hr className="mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700" />
                {allArticlesData.map((article, index) => (
                    <EditArticle
                      key={index}
                      articleData={article}
                      onSave={handleSaveArticle}
                      onDelete={handleDeleteArticle}
                    />
                  ))}
              </div>
            )}
            
          </li>
          </ul>
     
    
      </div>
    </div>
  )
}

export default EditArticles;
