import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import {
  TwitterIcon,
  LinkedInIcon,
  PinterestIcon,
  DribbbleIcon,
  GithubIcon,
  SunIcon,
  MoonIcon,
} from "./icons";

import { useSocialLinkData } from "../context/DataProvider";
import Trynow from "./Trynow";
import AuthModal from "./AuthModal";
const CustomLink = ({ href, title, className = "" }) => {
  const router = useRouter();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`h-[1px] inline-block  bg-dark  dark:bg-light absolute  left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? "w-full" : "w-0"
        }`}
      >
        &nbsp;
      </span>
    </Link>
  );
};
const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const router = useRouter();
  const handleClick = () => {
    toggle();
    router.push(href);
  };
  return (
    <button
      href={href}
      className={`${className} relative group`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`h-[1px] inline-block  bg-dark  dark:bg-light absolute  left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? "w-full" : "w-0"
        }`}
      >
        &nbsp;
      </span>
    </button>
  );
};

// const socialLinks = {
//   Twitter: "https://twitter.com/kuyatekiran",
//   LinkedIn: "https://www.linkedin.com/in/kirankuyate",
//   GitHub: "https://github.com/kirankuyate2157",
// };

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded-md text-white ${
        type === "done" ? "bg-green-600" : "bg-yellow-400"
      }`}
    >
      {message}
    </div>
  );
};
const Navbar = () => {
  const [mode, setMode] = useThemeSwitcher();
  const [isOpen, setIsOpen] = useState(false);
  const [notify, setNotify] = useState(false);
  const socialLinks = useSocialLinkData();

  const router = useRouter();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleShowNotification = () => {
    setNotify(true);
    // Close the notification after 3 seconds
    const timer = setTimeout(() => {
      setNotify(false);
    }, 4000);
  };

  const handleCloseNotification = () => {
    setNotify(false);
  };

  let { userName } = router.query;
  if (!userName) userName = "lol";
  // Check if userName is falsy (null, undefined, empty string, etc.)
  const validUserNames = ["kiran312", "john_doe", "someuser"];

  const pathToCheck = "/id/[userName]";
  const route = router.pathname;
  useEffect(() => {
    const validateUserName = (userName) => {
      const user = validUserNames.forEach((name) => name === userName);
      if (!user) {
        // Username is valid, proceed with the logic
        handleShowNotification();
      }
    };
    const match = router.pathname.includes(pathToCheck);
    if (match) validateUserName(userName);
  }, [userName]);

  return (
    <header className='w-full relative px-32 py-8 font-medium text-black dark:text-light flex items-center justify-between  z-10 lg:px-16 md:px-12 sm:px-8'>
      <button
        className=' flex-col justify-center items-center hidden lg:flex '
        onClick={handleClick}
      >
        <span
          className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "rotate-45 traslate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-100 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block transition-all duration-400 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? "-rotate-45 traslate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>

      <div className='w-full flex justify-between items-center lg:hidden'>
        <nav>
          <CustomLink href={`/id/${userName}/`} title='Home' className='mr-4' />
          <CustomLink
            href={`/id/${userName}/about`}
            title='About'
            className='mx-4'
          />
          <CustomLink
            href={`/id/${userName}/projects`}
            title='Projects'
            className='mx-4'
          />
          <CustomLink
            href={`/id/${userName}/articles`}
            title='Articles'
            className='mx-4'
          />
          <CustomLink
            href={`/id/${userName}/dashboards`}
            title='Dashboards'
            className='ml-4'
          />
        </nav>
        <nav className='flex items-center justify-center flex-wrap'>
          <motion.a
            href={socialLinks.Twitter}
            target='_blank'
            className='w-6 mr-3'
            whileHover={{ y: -5 }}
            whileTap={{ scale: 1 }}
          >
            <TwitterIcon />
          </motion.a>
          <motion.a
            href={socialLinks.LinkedIn}
            target='_blank'
            className='w-6 mx-3'
            whileHover={{ y: -5 }}
          >
            <LinkedInIcon />
          </motion.a>
          <motion.a
            href={socialLinks.GitHub}
            target='_blank'
            className='w-6 mx-3'
            whileHover={{ y: -5 }}
          >
            <GithubIcon />
          </motion.a>
          <button
            onClick={() => {
              setMode(mode === "light" ? "dark" : "light");
            }}
            className={`ml-3 flex items-center justify-center rounded-full p-1 ${
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
          >
            {mode == "dark" ? (
              <SunIcon className={"fill-dark"} />
            ) : (
              <MoonIcon className={"fill-dark"} />
            )}
          </button>
          <Trynow />
        </nav>
      </div>

      {isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: "-50", y: "-50" }}
          animate={{ scale: 1, opacity: 1 }}
          className='min-w-[70vw] flex flex-col justify-between items-center   fixed z-30 top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-dark/60 dark:bg-light/75 rounded-lg backdrop-blur-lg p-32'
        >
          <nav className='flex flex-col justify-center items-center'>
            <CustomMobileLink
              href={`/id/${userName}/`}
              title='Home'
              className='mx-4 text-light dark:text-dark'
              toggle={handleClick}
            />
            <CustomMobileLink
              href={`/id/${userName}/about`}
              title='About'
              className='mx-4'
              toggle={handleClick}
            />
            <CustomMobileLink
              href={`/id/${userName}/projects`}
              title='Projects'
              className='mx-4'
              toggle={handleClick}
            />
            <CustomMobileLink
              href={`/id/${userName}/articles`}
              title='Articles'
              className='mx-4'
              toggle={handleClick}
            />
            <CustomLink
              href={`/id/${userName}/dashboards`}
              title='Dashboards'
              className='mx-4'
              toggle={handleClick}
            />
          </nav>
          <nav className='flex items-center gap-2 justify-center flex-wrap mt-3'>
            <motion.a
              href={socialLinks.Twitter}
              target='_blank'
              className='w-6 '
              whileHover={{ y: -5 }}
              whileTap={{ scale: 1 }}
            >
              <TwitterIcon />
            </motion.a>
            <motion.a
              href={socialLinks.LinkedIn}
              target='_blank'
              className='w-6 '
              whileHover={{ y: -5 }}
            >
              <LinkedInIcon />
            </motion.a>
            <motion.a
              href={socialLinks.GitHub}
              target='_blank'
              className='w-6  rounded-full border dark:text-dark  border-light dark:border-dark '
              whileHover={{ y: -5 }}
            >
              <GithubIcon />
            </motion.a>
            <button
              onClick={() => {
                setMode(mode === "light" ? "dark" : "light");
                handleClick();
              }}
              className={`flex items-center justify-center rounded-full p-1 ${
                mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
              }`}
            >
              {mode == "dark" ? (
                <SunIcon className={"fill-dark"} />
              ) : (
                <MoonIcon className={"fill-dark"} />
              )}
            </button>
            <Trynow />
          </nav>
        </motion.div>
      )}

      <AuthModal />
      <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
        <Logo />
      </div>
      {notify && (
        <Notification
          message='User not found 🫠'
          type='warn'
          onClose={handleCloseNotification}
        />
      )}
    </header>
  );
};

export default Navbar;
