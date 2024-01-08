import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import LinesEllipsis from "react-lines-ellipsis";
import StartPortfolio from "./StartPortfolio";

const Preview=()=>{
  return <>
    <div
        className=' text-xs w-full p-2 flex gap-2 rounded overflow-hidden  text-black dark:text-gray-100 bg-white dark:bg-[#151829] border dark:border-[#231e39] relative'
       
      >
        <div
              className='absolute z-[0] w-[80%] h-[80%] right-[40%] rounded-full  opacity-30 bottom-4'
              style={{
                background: "linear-gradient(90deg, #6A15DA 40%, #960443 100%)",
                filter: "blur(900px)",
              }}
            />
        <img
          src='https://avatars.githubusercontent.com/u/84271800?v=4'
          alt='user profile'
          className='min-w-[80px] w-[20%] h-auto rounded z-10'
        />
        <div class=' w-[70%] gap-2 flex flex-col z-10'>
          <h2 className='pb-1 text-lg'>Kiran Kuyate </h2>
          <p className='flex flex-wrap'>
          <LinesEllipsis
          text={`I'm happy to share that I have obtained a new certification of Advanced Software Engineering Virtual Program of Walmart Global Tech, it was provided by Forage. #walmartglobaltech #theforage #softwareengineer #virtualexperience`}
          maxLine={2}
          ellipsis='...'
          trimRight
          basedOn='words'
        />
          </p>
          <div className='py-1 flex gap-2 justify-start items-center'>
            <button className="flex  gap-2 p-1 border border-pink-600 dark:border-pink-200  rounded items-center">
            visit <FaChevronRight className='animate-pulse text-pink-200' />
            </button>
          </div>
        </div>
      </div>
  </>
}
const PortfolioLists = () => {
  return (
    <div>
      <div className='max-w-[612px] min-w-[360px] text-white my-4 m-2 rounded-lg '>
        <div className='flex items-center gap-2 w-full px-2 flex-col pb-10  overflow-y-auto text-sm '>
        <StartPortfolio/>
        <Preview/><Preview/><Preview/><Preview/>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLists;
