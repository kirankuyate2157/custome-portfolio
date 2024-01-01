import React from "react";
import Head from "next/head";
import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";
import { GithubIcon } from "@/components/icons";
import { motion } from "framer-motion";
import TransitionEffect from "@/components/TransitionEffect";
import Navbar from "@/components/Navbar"
const FramerImage = motion(Image);
import { useProjectData } from "@/context/DataProvider";

const FeaturedPrject = ({ type, title, summary, img, link, github }) => {
  return (
    <article className='w-full relative flex md:flex-col items-center justify-between rounded-3xl border border-solid border-dark dark:border-light bg-light shadow-2xl p-10 dark:bg-dark lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4'>
      <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark dark:bg-light rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]' />
      <Link
        href={link}
        target='_blank'
        className='w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full'
      >
        <FramerImage
          src={img}
          alt={title}
          className='w-full h-auto'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          priority
          width={800} // Set the width of the image
          height={500} // Set the height of the image
          sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw'
        />
      </Link>
      <div className='w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6'>
        <span className='text-primary dark:text-primaryDark font-medium text-xl xs:text-base'>
          {type}
        </span>
        <Link
          href={link}
          target='_blank'
          className='hover:underline underline-offset-2'
        >
          <h2 className='my-2 w-full text-left text-4xl font-bold  text-dark dark:text-light sm:text-sm'>
            {title}
          </h2>
        </Link>
        <p className='my-2 font-medium text-dark dark:text-light sm:text-xs'>
          {summary}
        </p>
        <div className='flex items-center mt-2'>
          <Link href={github} target='_blank' className='w-10 sm:w-6 lg:w-8'>
            <GithubIcon />
          </Link>
          <Link
            href={link}
            target='_blank'
            className='ml-4 rounded-lg bg-dark text-light  dark:bg-light dark:text-dark p-2 px-6 text-md font-semibold sm:px-4 sm:text-xs'
          >
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = ({ type, title, img, link, github }) => {
  return (
    <article className='w-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark dark:border-light  bg-light p-6 relative  dark:bg-dark xs:p-4'>
      <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[102%] rounded-[1.4rem] bg-dark dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]  ' />
      <Link
        href={link}
        target='_blank'
        className='w-full cursor-pointer overflow-hidden rounded-lg'
      >
        <FramerImage
          src={img}
          alt={title}
          className='w-full h-auto'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          priority
          width={800} // Set the width of the image
          height={600} // Set the height of the image
          sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw'
        />
      </Link>
      <div className='w-full flex flex-col items-start justify-between mt-4'>
        <span className='text-primary  dark:text-primaryDark font-medium text-xl lg:text-lg md:text-base'>
          {type}
        </span>
        <Link
          href={link}
          target='_blank'
          className='hover:underline underline-offset-2'
        >
          <h2 className='my-2 w-full text-left text-3xl font-bold text-dark dark:text-light lg:text-2xl sm:text-lg'>
            {title}
          </h2>
        </Link>

        <div className=' w-full justify-between flex items-center mt-2'>
          <Link
            href={link}
            target='_blank'
            className=' rounded-lg  ml-1 font-semibold md:text-base '
          >
            <span className='underline'>Visit</span> 🔗
          </Link>
          <Link href={github} target='_blank' className='w-8 md:w-6'>
            <GithubIcon />
          </Link>
        </div>
      </div>
    </article>
  );
};
const projects = () => {
  const portfolioData = useProjectData();
  return (
    <>
      <Head>
        <title>Kiran Kuyate | Projects | kiran.dev</title>
        <meta name='description' content='my description' />
      </Head>
      <main>
        <Navbar/>
      <div className='w-full mb-16 flex flex-col items-center justify-center text-dark/75 dark:text-light/75'>
        <TransitionEffect />
        <Layout className='pt-16 font-mono'>
          <AnimatedText
            text='Imagination Trump Knowledge'
            className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8'
          />
          <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-y-24 sm:gap-x-0'>
            {portfolioData.map((project, index) => {
              return (
                <div
                  key={index}
                  className={`sm:col-span-12 ${(index + 1) % 3 === 0 ? "col-span-12" : "col-span-6"
                    }`}
                >
                  {(index + 1) % 3 === 0 ? (
                    <FeaturedPrject {...project} />
                  ) : (
                    <Project {...project} />
                  )}
                </div>
              );
            })}
          </div>
        </Layout>
        </div>
      </main>
    </>
  );
};

export default projects;
