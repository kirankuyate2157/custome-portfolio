import Head from "next/head";
import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";
import lightBulb from "../../public/images/svgs/miscellaneous_icons_1.svg";
import ProfilePic from "../../public/images/profile/pa3.png";
import AnimatedText from "../../components/AnimatedText";
import Hireme from "../../components/Hireme";
import { LinkArrow } from "../../components/icons";
import TransitionEffect from "../../components/TransitionEffect";
import { motion } from "framer-motion";

import { useHomeData } from "../../context/DataProvider";
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
// const homeData = {
//   name: "kiran Kuyate",
//   ProfileImg: ProfilePic,
//   title: "Shaping Future Code Horizons",
//   description:
//     "I love unraveling complex code challenges. Explore my projects, from diving into data intricacies to crafting user-friendly web, software experiences. With Javascript, Java, C++, Python, and a deep commitment to growth, I'm actively shaping the future of software engineering.",
//   resumeLink: "./kirankuyate2024.pdf",
//   email: "kiranrkuyate2021@gmail.com",
// };

export default function Home() {
  const homeData = useHomeData();
  // const homeData = homeData2.Home.homeData;
  // console.log("context home data : ", homeData);

  let stars = [
    { top: "20%", left: "10%", color: "yellow-500", size: "3" },
    { top: "60%", left: "80%", color: "green-500", size: "4" },
    { top: "40%", left: "-4%", color: "blue-500", size: "2" },
    { top: "15%", left: "120%", color: "purple-500", size: "3" },
    { top: "70%", left: "-20%", color: "red-500", size: "2" },
    { top: "80%", left: "20%", color: "yellow-500", size: "3" },
    { top: "30%", left: "80%", color: "green-500", size: "4" },
    { top: "70%", left: "-10%", color: "blue-500", size: "2" },
    { top: "85%", left: "-50%", color: "purple-500", size: "3" },
    { top: "90%", left: "20%", color: "red-500", size: "2" },
    { top: "80%", left: "10%", color: "yellow-500", size: "3" },
    { top: "98%", left: "80%", color: "green-500", size: "4" },
    { top: "150%", left: "-40%", color: "blue-500", size: "2" },
    { top: "0%", left: "88%", color: "purple-500", size: "3" },
    { top: "77%", left: "112%", color: "red-500", size: "2" },
    { top: "20%", left: "-30%", color: "yellow-500", size: "3" },
    { top: "60%", left: "-20%", color: "green-500", size: "4" },
    { top: "40%", left: "-50%", color: "blue-500", size: "2" },
    { top: "15%", left: "60%", color: "purple-500", size: "3" },
    { top: "70%", left: "70%", color: "yellow-500", size: "2" },
    { top: "80%", left: "80%", color: "yellow-500", size: "3" },
    { top: "30%", left: "-90%", color: "green-500", size: "4" },
    { top: "70%", left: "90%", color: "blue-500", size: "2" },
    { top: "85%", left: "100%", color: "yellow-500", size: "3" },
    { top: "90%", left: "110%", color: "red-500", size: "2" },
    { top: "80%", left: "120%", color: "yellow-500", size: "3" },
    { top: "98%", left: "130%", color: "green-500", size: "4" },
    { top: "20%", left: "120%", color: "blue-500", size: "2" },
    { top: "5%", left: "110%", color: "purple-500", size: "3" },
    { top: "77%", left: "100%", color: "yellow-500", size: "2" },
    { top: "111%", left: "10%", color: "yellow-500", size: "3" },
    { top: "110%", left: "73%", color: "yellow-500", size: "4" },
    { top: "10%", left: "88%", color: "blue-500", size: "2" },
    { top: "115%", left: "66%", color: "purple-500", size: "3" },
    { top: "10%", left: "20%", color: "primary", size: "2" },
    { top: "88%", left: "20%", color: "yellow-500", size: "3" },
    { top: "72%", left: "80%", color: "green-500", size: "4" },
    { top: "110%", left: "81%", color: "blue-500", size: "2" },
  ];
  stars = stars.map((star) => {
    const randomTop = Math.random() * 25 + "%";
    const randomLeft = Math.random() * 25 + 75 + "%";

    // For some stars, generate opposite top and left values
    if (Math.random() < 0.5) {
      return { ...star, top: randomTop, left: randomLeft };
    } else {
      return { ...star, top: randomLeft, left: randomTop };
    }
  });
  return (
    <>
      <Head>
        <title>{homeData.name} portfolio | kiran.dev</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex items-center text-dark w-full min-h-screen dark:text-light '>
        <TransitionEffect />
        <Layout className='pt-0 font-mono md:pt-16 sm:pt-8'>
          <div className='flex  items-center justify-between w-full lg:flex-col'>
            <div className='w-[40%] md:w-full relative '>
              <Star top='10%' left='10%' color='yellow-500' size='3' />
              <Star top='20%' left='10%' color='primary' size='3' />
              <Star top='20%' left='5%' color='primary' size='2' />
              <Star top='75%' left='83%' color='primaryDark' size='3' />
              <Star top='80%' left='90%' color='green-500' size='4' />
              <Star top='85%' left='69%' color='blue-500' size='4' />

              {stars.map((star, index) => (
                <Star
                  key={index}
                  top={star.top}
                  left={star.left}
                  color={star.color}
                  size={star.size}
                />
              ))}
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
      </main>
    </>
  );
}
