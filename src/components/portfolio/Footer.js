import React from "react";
import Layout from "./Layout";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className='w-full border-t-2  text-dark dark:text-light border-solid border-dark dark:border-light font-medium text-lg md:text-base overflow-hidden relative'>
      <Layout className='py-8 flex items-center justify-between text-sm md:flex-col lg:py-6'>
      <div
                  className='absolute z-[1] w-[80%] h-[60%] right-[40%] rounded-full opacity-70 '
                  style={{
                    background:
                      "linear-gradient(90deg, #601d50 40%, #960443 100%)",
                    filter: "blur(900px)",
                  }}
                />
        <span>{new Date().getFullYear()} &copy; All Rights Reserved.</span>
        <div className=' flex items-center lg:py-2'>
          Devloped by &nbsp;
          <Link
            href='https://github.com/kirankuyate2157'
            className='underline underline-offset-2'
            target={"_blank"}
          >
            Kiran2157.Dev
          </Link>
        </div>
        <Link
          href='https://www.linkedin.com/in/kirankuyate/'
          className='underline underline-offset-2'
          target={"_blank"}
        >
          say hello!
        </Link>
      </Layout>
    </footer>
  );
};

export default Footer;
