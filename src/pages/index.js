import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
import roketbg from "../../public/images/svgs/roketbg.svg";
import Animation from "../../public/images/svgs/Animation.svg";
import lightBulb from "../../public/images/svgs/miscellaneous_icons_1.svg";
import ProfilePic from "../../public/images/profile/pa3.png";
import AnimatedText from "../components/AnimatedText";
import Hireme from "../components/Hireme";
import { LinkArrow } from "../components/icons";
import TransitionEffect from "../components/TransitionEffect";
import { motion } from "framer-motion";
import { FaChevronCircleRight } from "react-icons/fa";
import { MdOutlineWifiCalling } from "react-icons/md";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { SiSpinrilla } from "react-icons/si";
import Navbar from "../components/Main/Navbar";
import Carousal from "../components/Main/ScrollBar";
export default function Home() {
  return (
    <>
      <Head>
        <title> Kways | kiran2157.dev</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='w-full' style={{ fontFamily: "Quicksand" }}>
        <div
          className=' min-h-[100vh] bg-[#151829] '
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #960443, #7c134d, #601d50, #44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a, #161829, #151829, #151829)",
          }}
        >
          <Navbar />
          <div className=' pb-40 sm:px-1 px-10 max-w-[1530px]'>
            <div className='relative w-full '>
              {/* -------section 1------- */}
              <div className='absolute inset-0 bg-noise'>
                <div className='pt-10 w-full flex justify-between md:relative md:flex-col-reverse'>
                  <div className=' w-full p-10 flex flex-col gap-6 sm:gap-3'>
                    <h2 className=' text-6xl md:text-lg  leading-tight font-extrabold'>
                      The Platform Which Really Help Users To Do Something
                      Better
                      <span className='animate-pulse text-pink-600'>.__</span>
                    </h2>
                    <p className='text-md md:text-sm sm:text-xs pr-8 leading-relaxed'>
                      Ultimate platform for people to stay productive and find
                      online presence, tools in an easy way in a single
                      platform. Kways makes it easy to access at your hand, just
                      as you because we believe in better ways...
                    </p>
                  </div>

                  <div className='w-full flex justify-center items-center'>
                    <div className='w-full overflow-hidden  relative  '>
                      <Image
                        src={Animation}
                        alt='Kways'
                        className='rounded-full opacity-60  -m-10 border-4 border-transparent w-[80%]'
                      />
                      <p className='w-1/2 absolute bottom-20 right-3 text-gray-200 font-bold md:font-normal '>
                        Save Time, Boost Productivity, and Amplify Success...
                      </p>
                    </div>
                  </div>
                </div>
                <div className=' w-full my-10  flex justify-center'>
                  <button className='bg-[#151829] border border-1 z-20 text-primary border-gray-400 p-2 px-5 rounded-xl flex  items-center gap-5'>
                    Explore Now{" "}
                    <FaChevronCircleRight className='animate-pulse' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --------- section  2 ------- */}
        <div className=' py-10 sm:px-1 px-10  overflow-hidden relative'>
          <div className='flex '>
            <div
              className='absolute z-[1] w-[60%] h-[60%] -right-[40%] rounded-full opacity-40 bottom-40'
              style={{
                background: "linear-gradient(90deg, #601d50 40%, #960443 100%)",
                filter: "blur(900px)",
              }}
            />
            <div
              className='absolute z-[0] w-[60%] h-[60%] -right-[40%] rounded-full opacity-30 bottom-45'
              style={{
                background: "linear-gradient(90deg, #6A15DA 40%, #960443 100%)",
                filter: "blur(900px)",
              }}
            />
            <Carousal />
          </div>
        </div>

        {/* ----- section 3 --------- */}
        <div className='max-w-[1600px]'>
          <div
            className=' bg-[#151829] flex flex-col gap-2 py-6 pb-40 sm:px-4 px-20  relative'
            style={{
              backgroundImage:
                "linear-gradient(to right top, #c6095b,#622c69, #151829,  #151829, #342955, #27264a,#151829, #151829, #151829, #191d34, #171a2e, #151829)",
            }}
          >
            <section id='Solution' className='flex  md:flex-col-reverse'>
              <div className='flex-1 flex justify-center items-start flex-col'>
                <h1
                  className={`font-poppins font-semibold text-[42px] xs:text-[32px] text-white leading-[56.8px] xs:leading-[40px] w-full`}
                >
                  Portfolio Features & Future Enhancements{" "}
                  <br className='sm:block hidden' />
                  in few easy steps.
                </h1>
                <p
                  className={`font-poppins font-normal text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
                >
                  Current Features: Dive into the current offerings of Kways,
                  including interactive UI design, chat-based discussions,
                  project displays, and more.
                </p>
                <p
                  className={`font-poppins font-normal text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
                >
                  Learn about upcoming updates, scalability plans, and AI-driven
                  features to boost your portfolio's impact.
                </p>
                <button
                  type='button'
                  className=' flex items-center gap-2 text-md hover:bg-pink-400 bg-transparent border border-gray-100 text-red-600 hover:text-black hover:ease-in hover:duration-300 p-2 px-4 my-5 rounded-lg text-poppins text-normal'
                >
                  Get Started <FaChevronCircleRight className='animate-pulse' />
                </button>
              </div>
              <div
                className={`flex-1 w-1/2 md:w-full  flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative  pb-4 md:pb-0`}
              >
                <Image
                  src={Animation}
                  alt='card deals'
                  className='w-[70%] md:w-[50%] h-full '
                />
              </div>
            </section>
            <section id='Solution' className='flex  md:flex-col'>
              <div
                className={`flex-1 w-1/2 md:w-full flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative  pb-4 md:pb-0`}
              >
                <Image
                  src={Animation}
                  alt='card deals'
                  className=' w-[70%] md:w-[50%] h-full '
                />
              </div>
              <div className='flex-1 flex justify-center items-start flex-col'>
                <h1
                  className={`font-poppins font-semibold text-[42px] xs:text-[32px] text-white leading-[56.8px] xs:leading-[40px] w-full`}
                >
                  Empowering Your Career <br className='sm:block hidden' />
                  in few easy steps.
                </h1>
                <p
                  className={`font-poppins font-normal text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
                >
                  Understand how HR professionals can leverage Kways to find
                  talented individuals based on portfolio ratings, AI
                  recommendations, and detailed data.
                </p>
                <p
                  className={`font-poppins font-normal text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
                >
                  Discover how AI can generate cover letters, emails, and
                  provide tailored recommendations for career growth.
                </p>
                <button
                  type='button'
                  className=' flex items-center gap-3 text-md hover:bg-pink-400 bg-transparent border border-gray-100 text-red-600 hover:text-black hover:ease-in hover:duration-300 p-2 px-4 my-5 rounded-lg text-poppins text-normal'
                >
                  Comming Soon.. <SiSpinrilla className='animate-spin' />
                </button>
              </div>
            </section>
            <section id='Solution' className='flex  md:flex-col-reverse'>
              <div className='flex-1 flex justify-center items-start flex-col'>
                <h1
                  className={`font-poppins font-semibold text-[42px] xs:text-[32px] text-white leading-[56.8px] xs:leading-[40px] w-full`}
                >
                  Community & Inspiration <br className='sm:block hidden' />
                  in few easy steps.
                </h1>
                <p
                  className={`font-poppins font-normal text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
                >
                  Read inspiring stories of individuals and startups who found
                  success through Kways.
                </p>
                <p
                  className={`font-poppins font-normal text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
                >
                  Access tutorials, tech explorations, and motivation to keep
                  you consistent in a dynamic environment.
                </p>
                <button
                  type='button'
                  className=' flex items-center gap-2 text-md hover:bg-pink-400 bg-transparent border border-gray-100 text-red-600 hover:text-black hover:ease-in hover:duration-300 p-2 px-4 my-5 rounded-lg text-poppins text-normal'
                >
                  Get Started <FaChevronCircleRight className='animate-pulse' />
                </button>
              </div>
              <div
                className={`flex-1 w-1/2 md:w-full  flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative  pb-4 md:pb-0`}
              >
                <Image
                  src={Animation}
                  alt='card deals'
                  className='w-[70%] md:w-[50%] h-full '
                />
              </div>
            </section>
            <section id='Solution' className='flex  md:flex-col'>
              <div
                className={`flex-1 w-1/2 md:w-full flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative  pb-4 md:pb-0`}
              >
                <Image
                  src={Animation}
                  alt='card deals'
                  className=' w-[70%] md:w-[50%] h-full '
                />
              </div>
              <div className='flex-1 flex justify-center items-start flex-col'>
                <h1
                  className={`font-poppins font-semibold text-[42px] xs:text-[32px] text-white leading-[56.8px] xs:leading-[40px] w-full`}
                >
                  Stay Informed <br className='sm:block hidden' />
                  in few easy steps.
                </h1>
                <p
                  className={`font-poppins font-normal text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
                >
                  Receive curated newsletters with trending news, innovations,
                  and research impacting your field.
                </p>
                <p
                  className={`font-poppins font-normal text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
                >
                  Share your tutorials and explanations with the community,
                  promoting a culture of learning and growth.
                </p>
                <button
                  type='button'
                  className=' flex items-center gap-3 text-md hover:bg-pink-400 bg-transparent border border-gray-100 text-red-600 hover:text-black hover:ease-in hover:duration-300 p-2 px-4 my-5 rounded-lg text-poppins text-normal'
                >
                  Comming Soon.. <SiSpinrilla className='animate-spin' />
                </button>
              </div>
            </section>
            <section id='Solution' className='flex  md:flex-col-reverse'>
              <div className='flex-1 flex justify-center items-start flex-col'>
                <h1
                  className={`font-poppins font-semibold text-[42px] xs:text-[32px] text-white leading-[56.8px] xs:leading-[40px] w-full`}
                >
                  Get Involved
                  <br className='sm:block hidden ' />
                  <span className='p-1' />
                  in few easy steps.
                </h1>
                <p
                  className={`font-poppins font-normal text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
                >
                  Freelance Opportunities and Careers: Connect with the Kways
                  team to bring your ideas to life or find Careers, freelance
                  opportunities.
                </p>
                <p
                  className={`font-poppins font-normal text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
                >
                  Share your thoughts, contribute to discussions, and be an
                  active part of the Kways community.
                </p>
                <button
                  type='button'
                  className=' flex items-center gap-2 text-md hover:bg-pink-400 bg-transparent border border-gray-100 text-red-600 hover:text-black hover:ease-in hover:duration-300 p-2 px-4 my-5 rounded-lg text-poppins text-normal'
                >
                  Got to Careers{" "}
                  <FaChevronCircleRight className='animate-pulse' />
                </button>
              </div>
              <div
                className={`flex-1 w-1/2 md:w-full  flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative  pb-4 md:pb-0`}
              >
                <Image
                  src={Animation}
                  alt='card deals'
                  className='w-[70%] md:w-[50%] h-full '
                />
              </div>
            </section>
          </div>
        </div>
        <div className='p-20 sm:p-10'>
          <div className=' rounded-2xl bg- w-full p-10 sm:p-5 flex flex-row justify-between md:flex-col md:items-center border border-pink-600 relative'>
            <div
              className='absolute z-[1] w-[60%] h-[60%] right-[40%] rounded-full opacity-40 bottom-40'
              style={{
                background: "linear-gradient(90deg, #601d50 40%, #960443 100%)",
                filter: "blur(900px)",
              }}
            />
            <div className='w-full'>
              <h1
                className={`font-poppins font-semibold text-[42px] xs:text-[32px] text-black dark:text-white leading-[56.8px] xs:leading-[40px] w-full`}
              >
                Let’s try our services now! or Join Kways Today!
              </h1>
              <p
                className={`font-poppins font-normal text-gray-800 dark:text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
              >
                Empowering your digital journey – Kways, your one-stop solution
                for web and desktop app development and other, offers top-notch
                services tailored to your needs.
              </p>
              <p
                className={`font-poppins font-normal text-gray-800 dark:text-gray-300 text-[18px] leading-[28.8px] max-w-[470px] mt-5`}
              >
                Provide contact details for any inquiries, support, or
                collaboration opportunities.
              </p>
            </div>
            <div className='w-[80%] flex items-center justify-end'>
              <button
                type='button'
                className='flex  items-center gap-2 text-md hover:bg-pink-400 bg-transparent border border-black dark:border-gray-100 text-red-600 hover:text-black hover:ease-in hover:duration-300 p-2  px-4 my-5 rounded-lg text-poppins text-normal'
              >
                Get in Touch <FaChevronCircleRight className='animate-pulse' />
              </button>
            </div>
          </div>
          <div className=' w-full my-10  text-2xl flex justify-center'>
            <h2 className=' z-20 text-primary font-semibold p-2 px-5 rounded-xl flex  items-center gap-5'>
              Contact Now
              <MdOutlineWifiCalling className='animate-bounce' />
            </h2>
          </div>
          <section id='Solution' className='flex px-2 lg:flex-col'>
            <div className='flex-1 flex justify-center items-start flex-col'>
              <h1
                className={`font-poppins font-semibold text-[42px] xs:text-[32px] text-black dark:text-white leading-[56.8px] xs:leading-[40px] w-full`}
              >
                Contact with our team !
              </h1>
              <p
                className={`font-poppins font-normal text-gray-800 dark:text-gray-300 text-[18px] leading-[22.8px] max-w-[470px] mt-5`}
              >
                Whether you`re a start-up or fortune-500 or personalized, we`d
                love to chat about you ideas,products, and make a personalised
                plan tha fits your business.
              </p>
              <p
                className={`font-poppins flex items-center gap-2  font-normal text-gray-800 dark:text-gray-300 text-[15px] leading-[22.8px] max-w-[470px] mt-5`}
              >
             
                <IoCheckmarkDoneCircle className='text-pink-700 text-lg' />
                Learn more about Kways chat now
              </p>
              <p
                className={`font-poppins flex items-center gap-2 font-normal text-gray-800 dark:text-gray-300 text-[15px] leading-[22.8px] max-w-[470px] mt-2`}
              >
                <IoCheckmarkDoneCircle className='text-pink-700 text-lg' />
                Find the right solution for your needs
              </p>
              <p
                className={`font-poppins flex items-center gap-2  font-normal text-gray-800 dark:text-gray-300 text-[15px] leading-[22.8px] max-w-[470px] mt-2`}
              >
                <IoCheckmarkDoneCircle className='text-pink-700 text-lg' />{" "}
                Schedule a demo or meet.
              </p>
            </div>
            <div
              className={`flex-1  md:w-full  flex justify-center items-center md:mr-10 mr-0  mt-10 relative  pb-4 md:pb-0`}
            >
               <div
              className='absolute z-[0] w-[70%] h-[60%] right-[40%] rounded-full opacity-50 bottom-40'
              style={{
                background: "linear-gradient(90deg, #601d50 40%, #960443 100%)",
                filter: "blur(900px)",
              }}
            />
              <div class='z-10 grid grid-cols-1 text-black md:grid-cols-2  gap-4'>
                <div class='mb-4 dark:text-white'>
                  <label
                    for='firstName'
                    class='block text-sm font-medium text-gray-700 dark:text-gray-300 '
                  >
                    First Name
                  </label>
                  <input
                    type='text'
                    id='firstName'
                    name='firstName'
                    className='mt-1 p-2 w-full border  border-gray-700 rounded-md dark:bg-[#161A2E]  outline-none focus:outline-none focus:border-pink-500'
                  />
                </div>
                <div class='mb-4'>
                  <label
                    for='lastName'
                    class='block text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Last Name
                  </label>
                  <input
                    type='text'
                    id='lastName'
                    name='lastName'
                    className='mt-1 p-2 w-full border  border-gray-600 rounded-md dark:bg-[#161A2E]  outline-none focus:outline-none focus:border-pink-500'
                  />
                </div>
                <div class='mb-4'>
                  <label
                    for='email'
                    class='block text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Email *
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    className='mt-1 p-2 w-full border  border-gray-600 rounded-md dark:bg-[#161A2E]  outline-none focus:outline-none focus:border-pink-500'
                  />
                </div>
                <div class='mb-4'>
                  <label
                    for='phoneNumber'
                    class='block text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Contact Number
                  </label>
                  <input
                    type='tel'
                    id='phoneNumber'
                    name='phoneNumber'
                    className='mt-1 p-2 w-full border  border-gray-600 rounded-md dark:bg-[#161A2E]  outline-none focus:outline-none focus:border-pink-500'
                  />
                </div>
                <div class='mb-4'>
                  <label
                    for='company'
                    class='block text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Company
                  </label>
                  <input
                    type='text'
                    id='company'
                    name='company'
                    className='mt-1 p-2 w-full border  border-gray-600 rounded-md dark:bg-[#161A2E]  outline-none focus:outline-none focus:border-pink-500'
                  />
                </div>
                <div class='mb-4'>
                  <label
                    for='country'
                    class='block text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Country
                  </label>
                  <input
                    type='text'
                    id='country'
                    name='country'
                    className='mt-1 p-2 w-full border  border-gray-600 rounded-md dark:bg-[#161A2E]  outline-none focus:outline-none focus:border-pink-500'
                  />
                </div>
                <div class='col-span-2 mb-4'>
                  <label
                    for='subject'
                    class='block text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Subject *
                  </label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    required
                    className='mt-1 p-2 w-full border  border-gray-600 rounded-md dark:bg-[#161A2E]  outline-none focus:outline-none focus:border-pink-500'
                  />
                </div>
                <div class='col-span-2 mb-4'>
                  <label
                    for='message'
                    class='block text-sm font-medium text-gray-700 dark:text-gray-300'
                  >
                    Message *
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    rows='4'
                    required
                    className='mt-1 p-2 w-full  border  border-gray-600 rounded-md dark:bg-[#161A2E]  outline-none focus:outline-none focus:border-pink-500'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  class='px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-600'
                >
                  Send Message
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
