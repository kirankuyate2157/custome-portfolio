import React, { useEffect, useRef } from "react";
import Head from "next/head";
import AnimatedText from "@/components/portfolio/AnimatedText";
import Layout from "@/components/portfolio/Layout";
import Image from "next/image";
import profilePic from "../../../../public/images/profile/rp1.jpg";
import { useMotionValue, useSpring, useInView } from "framer-motion";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import TransitionEffect from "@/components/portfolio/TransitionEffect";
import Navbar from "@/components/portfolio/Navbar"
import { useAboutData } from "../../../context/DataProvider";

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);

  // Convert months to fraction of a year
  const yearFraction = value / 12;

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(yearFraction);
    }
  }, [isInView, yearFraction, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      const formattedValue = (latest * 12).toFixed(1); // Calculate value in years with one decimal place
      const intValue = parseInt(formattedValue, 10); // Parse the integer part

      if (ref.current) {
        // Display the value without decimal if the decimal is zero
        ref.current.textContent = formattedValue.endsWith(".0")
          ? intValue.toString()
          : formattedValue;
      }
    });
  }, [springValue]);

  return <span ref={ref}>{yearFraction.toFixed(1)}</span>;
};

const About = () => {
  const aboutPageData = useAboutData();
  return (
    <>
      <Head>
        <title>About Page | kiran.dev </title>
        <meta name='description' content='any description' />
      </Head>
      <main>
      <Navbar />
      <div className='w-full flex items-center  text-dark dark:text-light justify-center'>
        <TransitionEffect />
        <Layout className='pt-16 font-mono'>
          <AnimatedText
            text={aboutPageData.aboutData.title}
            className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8'
          />
          <div className='grid w-full grid-cols-8 gap-16 sm:gap-8'>
            <div className='col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8'>
              <h2 className='mb-4 text-xl font-bold font-mono uppercase text-dark/75  dark:text-light/75'>
                Biography
              </h2>
              {aboutPageData.aboutData.bio.map((para, index) => (
                <p key={index} className='my-2 font-medium'>
                  {para}
                </p>
              ))}
            </div>
            <div className='col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4  md:order-1 md:col-span-8'>
              <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light' />
              <Image
                src={aboutPageData.aboutData.profileImg}
                alt='Kiran Kuyate'
                className='w-full h-auto rounded-2xl'
                priority
                width={500}
                height={700}
                sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,50vw'
              />
            </div>
            <div className='col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row md:order-3'>
              {aboutPageData.aboutData.statistics.map((statistic, index) => (
                <div
                  key={index}
                  className='flex flex-col items-end justify-center xl:items-center'
                >
                  <span className='inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl'>
                    <AnimatedNumber value={statistic.value} />+
                  </span>
                  <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm'>
                    {statistic.label}
                  </h2>
                </div>
              ))}
            </div>
          </div>
          <Skills data={aboutPageData.aboutData.skills} />
          <Experience data={aboutPageData.experienceData} />
          <Education data={aboutPageData.educationData} />
        </Layout>
        </div>
      </main>
    </>
  );
};

export default About;
