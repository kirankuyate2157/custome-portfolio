import React, { useEffect, useState } from "react";
import { FaEquals } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { TiHome } from "react-icons/ti";
import { AiFillRobot } from "react-icons/ai";
import { MdOutlinePortrait } from "react-icons/md";
import { FaLinesLeaning } from "react-icons/fa6";
import { PiDotsNineDuotone } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { MoonIcon, SunIcon } from "../portfolio/icons.js";
import useThemeSwitcher from "../hooks/useThemeSwitcher.js";

const CustomLink = ({ title, className = "", onClick, isActive }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(title);
    }
  };

  return (
    <div
      className={`${className} cursor-pointer relative group`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[1px] inline-block bg-dark dark:bg-light absolute left-0 -bottom-0.5 ${
          isActive ? "w-full" : "w-0"
        } group-hover:w-full transition-[width] ease duration-300`}
      >
        &nbsp;
      </span>
    </div>
  );
};

const NavbarHome = ({ currentTab }) => {
  const [mode, setMode] = useThemeSwitcher();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [tabs, setTabs] = useState("Home");

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleTabClick = (tab) => {
    closeDropdown();
  };
  const handleTabClick2 = () => {
    if (typeof currentTab === 'function') {
      currentTab(tabs);
    }
  };
  useEffect(() => {
    handleTabClick2();
  }, [tabs]);

  const tabM = ["Home", "Portfolio", "Gen AI", "Contact"];

  return (
    <div className='w-full  min-w-[280px]  sm:px-0 px-10 pt-2 sm:pt-0'>
      <div className='w-full flex  justify-between items-center bg-slate-900 dark:bg-slate-400 bg-opacity-25 dark:bg-opacity-10 sm:rounded-none  bg-blur rounded p-2 backdrop-filter backdrop-blur-lg'>
        <div className='w-full md:w-[25%] pl-2 items-center flex'>
          <div className='md:hidden p-1 m-1  text-xl rounded-lg  text-slate-900 dark:text-white bg-gray-300 dark:bg-slate-900'>
            <FaEquals />
          </div>
          <div
            className='flex items-center  text-black dark:text-white sm:p-0 px-2 sm:text-xl font-bold text-2xl'
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
        <div className='w-full md:w-[65%] flex pr-2 justify-between gap-1 items-end '>
          <div className=' lg:hidden w-full flex pr-2 justify-start gap-1 items-center '>
            <CustomLink
              title='Home'
              className='mx-4'
              onClick={(tab) => setTabs(tab)}
              isActive={tabs === "Home"}
            />

            <CustomLink
              title='Portfolio'
              className='mx-4'
              onClick={(tab) => setTabs(tab)}
              isActive={tabs === "Portfolio"}
            />
            <CustomLink
              title='GenAI'
              className='mx-4'
              onClick={(tab) => setTabs(tab)}
              isActive={tabs === 'GenAI'}
            />
            <CustomLink
              title='Contact'
              className='mx-4'
              onClick={(tab) => setTabs(tab)}
              isActive={tabs === "Contact"}
            />
          </div>
         
            <div className='lg:flex hidden p-1 mx-1  text-xl  text-slate-900 dark:text-white '
            onClick={() => setTabs("Home")}
            >
              <TiHome />
              
            </div>
            <div className='lg:flex hidden p-1 mx-1 text-xl   rounded-lg text-slate-900 dark:text-white'
            onClick={() => setTabs("Portfolio")}>
              <MdOutlinePortrait />
            </div>
            <div className='lg:flex hidden p-1 mx-1  text-xl  text-slate-900 dark:text-white ' 
            onClick={() => setTabs("GenAI")}
            >
              <AiFillRobot />
            </div>
            
        
          <div
            className={`p-[0.15rem]  md:my-1     sm:py-0 text-xl  rounded-lg text-slate-900 dark:text-white bg-gray-300 dark:bg-slate-900 flex   ${
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
            onClick={() => {
              setMode(mode === "light" ? "dark" : "light");
            }}
          >
            {mode == "dark" ? (
              <SunIcon className={"fill-dark min-w-[20px]"} />
            ) : (
              <MoonIcon className={"fill-dark min-w-[20px]"} />
            )}
          </div>

          <div className='sm:hidden p-1    mx-1  text-xl rounded-lg text-slate-900 dark:text-white bg-gray-300 dark:bg-slate-900'>
            <IoNotificationsOutline />
          </div>
       
          <div className='p-[0.10rem] mx-1  sm:p-1 sm:m-1  sm:text-lg  text-xl rounded-lg text-slate-900 dark:text-white bg-gray-300 dark:bg-slate-900'>
           
              <img
                src='https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt='dp'
                className='w-7 h-6 sm:w-4 sm:h-5 min-w-[16px] rounded-md'
              />
           
          </div>
          <div
            className=' p-[0.10rem] mx-1 sm:m-1 text-xl  text-slate-900 dark:text-white  cursor-pointer'
            onClick={toggleDropdown}
          >
            < CiMenuKebab />
          </div>
        </div>
      </div>

      {/* Dropdown Modal */}
      {isDropdownOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.7 }}
            className='absolute font-mono right-6 top-14 mt-1 w-48 text-sm sm:text-xs overflow-hidden text-white   border border-gray-300 dark:border-gray-700  shadow-lg bg-slate-900  bg-opacity-25 dark:bg-opacity-10  bg-blur rounded p-2 backdrop-filter backdrop-blur-lg'
          >
            <ul>
              {tabM.map((tab, index) => (
                <li
                  key={index}
                  onClick={() => handleTabClick(tab)}
                  className='px-1  w-full items-center justify-start flex py-2'
                >
                  <a
                    href='http://localhost:3001/id/demo'
                    className='px-1  w-full items-center justify-start flex'
                  >
                    <FaLinesLeaning className='text-xs mr-2' />
                    {tab}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default NavbarHome;
