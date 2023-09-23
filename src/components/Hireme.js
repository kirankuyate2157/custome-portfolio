import React from "react";
import { CircularText } from "./icons";
import Link from "next/link";
const Hireme = () => {
  return (
    <div className='fixed left-4 bottom-4 flex items-center justify-center overflow-hidden md:right-8 md:left-auto md:top-0 md:bottom-auto md:absolute'>
      <div className='w-48 h-auto flex items-center justify-center relative md:w-24 '>
        <CircularText className='fill-dark animate-spin-slow dark:fill-light ' />
        <Link
          href='mailto:admin@gmail.com'
          className='flex text-light bg-dark items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md border border-solid border-dark w-20 h-20 font-semibold  rounded-full hover:bg-light hover:text-dark  dark:bg-light dark:text-dark hover:dark:border-light hover:dark:bg-dark hover:dark:text-light  md:w-12 md:h-12 md:text-[10px] '
        >
          Hire me
        </Link>
      </div>
    </div>
  );
};

export default Hireme;
