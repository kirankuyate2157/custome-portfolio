import React from "react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa6";

import quotes from "../../../public/images/svgs/quotes.svg";
const FeedbackCard = ({ ans, question }) => {
  return (
    <>
     <section
  className='flex border  border-[#B50C58] justify-between flex-col px-10 py-8 rounded-[20px] max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5'
>
        <FaQuoteLeft 
          style={{ color: 'red' }}
          className=' w-[42.6px] h-[27.6px] object-contain'
        />
        <p className=' font-poppins font-normal text-[18px] leading-[22.4px] text-black dark:text-white my-2'>
          {question}
        </p>
        <div className='flex flex-row '>
          <div className=' flex ml-4 text-gray-700 dark:text-gray-300 '>
          <span>-</span>
            <h2 className='ml-1 font-poppins font-normal text-[16px] leading-[24px] '>
              {ans}
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

const Carousal = () => {
  return (
    <div className=' flex mb-20 mx-auto'>
      <div className='flex gap-4  flex-wrap  justify-center  w-full feedback-container relative z-[1]'>
        <FeedbackCard
          ans='Ritesh mahant'
          question='Hey, I want to show new company in an online presence, but I don`t know web development.'
        />
        <FeedbackCard
          ans='Toomy jessy'
          question=' want to do quick documentation or cover letters for dynamic roles and topics.'
        />
        <FeedbackCard
          ans='Lemon khan'
          question='How can I make my portfolio stand out and attract attention from recruiters?'
        />
        <FeedbackCard
          ans='Tanishqa barbar'
          question='Hey, I`m unsure about my career path, networking and need guidance .'
        />
      </div>
    </div>
  );
};
export default Carousal;
