import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import LinesEllipsis from "react-lines-ellipsis";
import StartPortfolio from "./StartPortfolio";

const Preview=()=>{
  return <>
    <div
        className=' text-xs w-full p-2 flex gap-2 rounded'
        style={{
          backgroundImage:
            "linear-gradient(to right, #960443, #7c134d, #601d50, #601d50,#44214b,#44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a, #161829, #151829)",
        }}
      >
        <img
          src='https://avatars.githubusercontent.com/u/84271800?v=4'
          alt='user profile'
          className='min-w-[80px] w-[20%] h-auto rounded'
        />
        <div class=' w-[70%] gap-2 flex flex-col'>
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
            <button className="flex  gap-2 p-1 border border-pink-200 rounded items-center">
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
