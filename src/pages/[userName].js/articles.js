import Head from "next/head";
import Link from "next/link";
import React, { useRef } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import { motion, useMotionValue } from "framer-motion";
import TransitionEffect from "../../components/TransitionEffect";

import { useArticleData } from "../../context/DataProvider";

const FramerImage = motion(Image);

const MovingImg = ({ img, title, link }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgRef = useRef(null);

  function handleMouse(event) {
    imgRef.current.style.display = "inline-block";
    x.set(event.pageX);
    y.set(-10);
  }
  function handleMouseLeave(event) {
    imgRef.current.style.display = "none";
    x.set(0);
    y.set(0);
  }
  return (
    <Link
      href={link}
      target='_blank'
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className='capitalize text-xl font-semibold hover:underline md:text-sm xs:text-xs'>
        {title}
      </h2>
      <FramerImage
        style={{ x: x, y: y }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.2 } }}
        ref={imgRef}
        src={img}
        alt={title}
        priority
        width={500}
        height={700}
        sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw'
        className='z-10 w-96 h-auto hidden absolute rounded-lg sm:!hidden'
      />
    </Link>
  );
};

const Article = ({ img, title, date, link }) => {
  return (
    <motion.li
      initial={{ y: 200 }}
      whileInView={{ y: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      viewport={{ once: true }}
      className='relative w-full p-4 py-6 sm:py-2 my-4 rounded-xl flex items-center justify-between bg-light text-dark dark:bg-dark dark:text-light dark:border-light first:mt:mt-0 border border-solid border-dark border-r-4 border-b-4 sm:flex-col md:text-sm xs:text-xs'
    >
      <MovingImg title={title} img={img} link={link} />
      <span className='text-primary dark:text-primaryDark font-semibold pl-4 sm:self-start sm:pl-0'>
        {date}
      </span>
    </motion.li>
  );
};

const FeaturedArticle = ({ img, title, time, summary, link }) => {
  return (
    <li className='relative col-span-1 w-full p-4 bg-light text-dark border border-solid border-dark rounded-lg rounded-br-3xl  dark:bg-dark dark:text-light dark:border-light'>
      <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[1rem] bg-dark dark:bg-light rounded-br-3xl' />
      <Link
        href={link}
        target='_blank'
        className='w-full inline-block cursor-pointer overflow-hidden rounded-lg'
      >
        <FramerImage
          src={img}
          alt={title}
          className='w-full h-auto'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          priority
          width={500}
          height={700}
          sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw'
        />
      </Link>
      <Link href={link} target='_blank'>
        <h2 className='capitalize text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg'>
          {title}
        </h2>
      </Link>
      <p p className='text-sm mb-2'>
        {summary}
      </p>
      <span className='text-primary dark:text-primaryDark font-semibold'>
        {time}
      </span>
    </li>
  );
};

const articles = () => {
  const articles = useArticleData();
  return (
    <>
      <Head>
        <title>kiran kuyate | Article | kiran.dev</title>
        <meta name='description' content='any description..' />
      </Head>
      <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden text-dark'>
        <TransitionEffect />
        <Layout className='pt-16 font-mono'>
          <AnimatedText
            text='words can change the world!'
            className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8'
          />
          <ul className='grid grid-cols-2 gap-16 lg:gap-8 md:grid-cols-1 md:gap-y-16'>
            {articles.articlesData.map((article, index) => (
              <FeaturedArticle key={index} {...article} />
            ))}
          </ul>
          <h2 className='font-bold text-4xl w-full text-center my-16 mt-32'>
            All Articles
          </h2>
          <ul>
            {articles.allArticlesData.map((article, index) => (
              <Article key={index} {...article} />
            ))}
          </ul>
        </Layout>
      </main>
    </>
  );
};

export default articles;
