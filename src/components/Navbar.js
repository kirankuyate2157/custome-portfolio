import React,{useState} from "react";
import Link from "next/link";
import { FaEquals } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaLinesLeaning } from "react-icons/fa6";
import { PiDotsNineDuotone } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";
import { MoonIcon, SunIcon } from "./portfolio/icons";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import { useRouter } from "next/router";


const Navbar = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const router=useRouter();
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleTabClick = (tab) => {
 router.push("/k");
    closeDropdown();
  };

  const tabs = [ "Try Now","Portfolio", "Generative AI", "Socials", "Contact"];

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
          <div
            className=' p-1 m-1  text-xl rounded-lg text-slate-900 dark:text-white bg-gray-300 dark:bg-slate-900 cursor-pointer'
            onClick={toggleDropdown}
          >
            <PiDotsNineDuotone />
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
     className='absolute font-mono right-6 top-14 mt-1 w-48 text-sm sm:text-xs overflow-hidden text-white   border border-gray-300 dark:border-gray-700  shadow-lg bg-slate-900  bg-opacity-25 dark:bg-opacity-10  bg-blur rounded p-2 backdrop-filter backdrop-blur-lg'>
          
        <ul>
         
            {tabs.map((tab, index) => (
              <li
                key={index}
                onClick={() => handleTabClick(tab)}
                className='px-1  w-full items-center justify-start flex py-2'
              >
                <a href="https://custome-portfolio.vercel.app/k" className='px-1  w-full items-center justify-start flex'>
                <FaLinesLeaning className="text-xs mr-2" />
                {tab}
                </a>
               
              </li>
            ))}
          </ul>
        </motion.div >
        </AnimatePresence>
        )}
    
    </div>
  );
};

export default Navbar;

