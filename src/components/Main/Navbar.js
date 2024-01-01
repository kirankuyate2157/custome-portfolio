import React from "react";
import { FaEquals } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { PiDotsNineDuotone } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { MoonIcon, SunIcon } from "../icons";
import useThemeSwitcher from "../hooks/useThemeSwitcher";

const Navbar = () => {
  const [mode, setMode] = useThemeSwitcher();
  return (
    <div className='w-full min-w-[280px] sm:px-0 px-10 pt-2 sm:pt-0'>
      <div className='w-full flex justify-between items-center bg-slate-900 dark:bg-slate-400 bg-opacity-25 dark:bg-opacity-10 sm:rounded-none  bg-blur rounded p-2 backdrop-filter backdrop-blur-lg'>
        <div className='w-full pl-2 items-center flex'>
          <div className='p-1 m-1  text-xl rounded-lg  text-slate-900 dark:text-white bg-gray-300 dark:bg-slate-900'>
            <FaEquals />
          </div>
          <div
            className='flex items-center  text-black dark:text-white px-2 font-bold text-2xl'
            style={{ fontFamily: "Black Ops One" }}
          >
            <h1 className='font-shadow-b-3xl '>KWAYS</h1>
          </div>
          <div className='sm:hidden w-[50%]  ml-4 flex text-xs pl-2 py-1 px-1 items-center gap-2 m-1 rounded-lg text-black dark:text-white bg-slate-900 bg-opacity-10 dark:bg-opacity-40 '>
            <FiSearch className='text-lg' />
            <input
              type='text'
              className='rounded bg-transparent placeholder:text-black dark:placeholder:text-gray-500 w-full  focus:none outline-none p-1'
              placeholder='Start searching here..'
            />
          </div>
        </div>
        <div className='w-full flex pr-2 justify-end gap-1 items-center '>
          <div
            className={`p-[0.15rem] m-1  rounded-lg text-slate-900 dark:text-white bg-gray-300 dark:bg-slate-900  ${
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
            onClick={() => {
              setMode(mode === "light" ? "dark" : "light");
            }}
          >
            {mode == "dark" ? (
              <SunIcon className={"fill-dark"} />
            ) : (
              <MoonIcon className={"fill-dark"} />
            )}
          </div>
          <div className='sm:hidden p-1 m-1  text-xl rounded-lg text-slate-900 dark:text-white bg-gray-300 dark:bg-slate-900'>
            <CiMail />
          </div>
          <div className='sm:hidden p-1 m-1  text-xl rounded-lg text-slate-900 dark:text-white bg-gray-300 dark:bg-slate-900'>
            <IoNotificationsOutline />
          </div>
          <div className='sm:hidden p-1 m-1  text-xl rounded-lg text-slate-900 dark:text-white bg-gray-300 dark:bg-slate-900'>
            <PiDotsNineDuotone />
          </div>
          <div className='p-[0.10rem] m-1  text-xl rounded-lg text-slate-900 dark:text-white bg-gray-300 dark:bg-slate-900'>
            <div className=''>
              <img
                src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt='dp'
                className='w-6 h-6 rounded-md'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;