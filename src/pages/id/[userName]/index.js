import Head from "next/head";

import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Image from "next/image";
import Link from "next/link";
import lightBulb from "../../../../public/images/svgs/miscellaneous_icons_1.svg";
import ProfilePic from "../../../../public/images/profile/pa3.png";
import AnimatedText from "@/components/AnimatedText";
import Hireme from "@/components/Hireme";
import { LinkArrow } from "@/components/icons";
import TransitionEffect from "@/components/TransitionEffect";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

import { useHomeData } from "@/context/DataProvider";
const Star = ({ top, left, color, size }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -10 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      className={`absolute w-${size} h-${size} bg-${color} rounded-full z-50`}
      style={{ top, left }}
    />
  );
};

export default function Home() {
  const homeData = useHomeData();

  return (
    <>
      <Head>
        <title>{homeData.name} portfolio | kiran.dev</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
      <Navbar />
      <div className='flex items-center text-dark w-full min-h-screen dark:text-light '>
   
        <TransitionEffect />
       
        <Layout className='pt-0 font-mono md:pt-16 sm:pt-8 bg-red-200'>
          <div className='flex  items-center justify-between w-full lg:flex-col'>
            <div className='w-[40%] md:w-full relative '>
              <Image
                src={homeData.profileImg}
                alt='kiran kuyate'
                className='w-full h-auto lg:hidden md:inline-block md:w-full md:h-auto'
                priority
                width={400}
                height={900}
                sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,50vw'
              />
            </div>
            <div className='w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center'>
              <AnimatedText
                text={homeData.title}
                className='!text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl'
              />
              <p className='my-4 text-base font-medium md:text-sm sm:text-xs'>
                {homeData.description}
              </p>
              <div className='flex items-center self-start mt-2 lg:self-center'>
                <Link
                  href={homeData.resumeLink}
                  target={"_blank"}
                  className='flex items-center bg-dark text-light dark:bg-light dark:text-dark p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark hover:dark:border-light hover:dark:bg-dark hover:dark:text-light  md:p-2 md:px-4 md:text-base'
                >
                  Resume <LinkArrow className={"w-6 ml-1"} />
                </Link>
                <Link
                  href={`mailto:${homeData.email}`}
                  target={"_blank"}
                  className='ml-4 text-lg font-medium capitalize text-dark dark:text-light  underline md:text-base'
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Layout>
        <div className='absolute right-8 bottom-8 inline-block w-24 sm:hidden'>
          <a href='https://github.com/kirankuyate2157' target='_blank'>
            <Image src={lightBulb} alt='kiran.dev' className='w-full h-auto' />
          </a>
        </div>
        </div>
      </main>
    </>
  );
}
