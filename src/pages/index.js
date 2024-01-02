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
      <main className='w-full' style={{fontFamily: "Quicksand"}}>
      <div className=" min-h-[100vh] bg-[#151829] " style={{ backgroundImage: "linear-gradient(to bottom, #960443, #7c134d, #601d50, #44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a, #161829, #151829, #151829)",  }}>
        <Navbar />
        <div className=' pb-40 sm:px-1 px-10 max-w-[1530px]' >
          <div className='relative w-full '>
            {/* -------section 1------- */}
            <div className='absolute inset-0 bg-noise'>
              <div className='pt-10 w-full flex justify-between md:relative md:flex-col-reverse'>
                <div className=' w-full p-10 flex flex-col gap-6 sm:gap-3'>
                <h2
                    className=' text-6xl md:text-lg  leading-tight font-extrabold'
                  >
                    The Platform Which Really Help Users To Do Something
                    Better<span className='animate-pulse text-pink-600'>.__</span>
                  </h2>
                  <p className='text-md md:text-sm sm:text-xs pr-8 leading-relaxed'>
                    Ultimate platform for people to stay productive and find
                    online presence, tools in an easy way in a single platform.
                    Kways makes it easy to access at your hand, just as you
                    because we believe in better ways...
                  </p>
                </div>

                <div className='w-full flex justify-center items-center'>
            <div className='w-full overflow-hidden  relative  '>
              <Image
                src={Animation}
                alt='Kways'
                className='rounded-full opacity-60  -m-10 border-4 border-transparent w-[80%]'
              />
              <p className="w-1/2 absolute bottom-20 right-3 text-gray-200 font-bold md:font-normal ">Save Time, Boost Productivity, and Amplify Success...</p>
            </div>
                </div>
              </div>
              <div className=" w-full my-10  flex justify-center">
                <button className="bg-[#151829] border border-1 text-primary border-gray-400 p-2 px-5 rounded-xl flex  items-center gap-5">Explore Now <FaChevronCircleRight className="animate-pulse" /> </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className=' pb-40 sm:px-1 px-10  overflow-hidden relative' >
            <div className="flex ">
            <div className="absolute z-[1] w-[60%] h-[60%] -right-[40%] rounded-full bottom-40"style={{ background: "linear-gradient(90deg, #601d50 40%, #960443 100%)",
  filter: "blur(900px)"}} />
  <div className="absolute z-[0] w-[60%] h-[60%] -right-[40%] rounded-full bottom-45"style={{ background: "linear-gradient(90deg, #6A15DA 40%, #960443 100%)",
  filter: "blur(900px)"}} />
            <Carousal/>
          </div>
         </div>
      </main>
    </>
  );
}
