import React from "react";
import Image from "next/image";
import coverImage from "../../../public/images/profile/coverImage.png";
import { FaChevronRight } from "react-icons/fa6";

const RecentIntraction = () => {
  return (
    <>
      <div className=' w-full p-2 flex gap-2 '>
        <img
          src='https://avatars.githubusercontent.com/u/84271800?v=4'
          alt='user profile'
          className='min-w-[20px] w-[10%] h-[40px] flex   rounded'
        />
        <div class=' w-[70%]flex flex-col'>
          <p className='pb-1'>recently liked post </p>
          <p className='flex flex-wrap'>
            I'm happy to share that Advanced Software{" "}
          </p>
          <p className='py-1 flex gap-2 items-center'>
            <span className='relative'>
              <span>💡</span>
              <span className='ml-[-10px]'>🩷</span>
              <span className='ml-[-10px]'>👍🏻</span>
            </span>{" "}
            234 likes
          </p>
        </div>
      </div>
    </>
  );
};

const Profile = () => {
  return (
    <div className='flex flex-col gap-2 my-4'>
      <div
        className='  rounded overflow-hidden max-w-[440px]'
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #960443, #7c134d, #601d50, #601d50,#44214b,#44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a, #161829, #151829)",
        }}
      >
        <div className='relative items-center mb-5   w-full'>
          {/* Cover Image */}
          <Image
            src={coverImage}
            alt='cover image'
            className='w-full h-32 object-cover '
          />

          {/* Profile Image */}
          <img
            src='https://avatars.githubusercontent.com/u/84271800?v=4'
            alt='user profile'
            className='w-32 h-32 object-cover items-center absolute bottom-0 transform translate-x-[120%] translate-y-[25%] rounded-full border-4 border-white'
          />
        </div>
        <div className='flex flex-col text-center p-4'>
          {/* User Name */}
          <h2 className='text-xl font-bold'>Kiran Kuyate</h2>
          {/* Handle Text */}
          <p className='text-gray-600 text-xs'>
            SDE aspirants 💫 | final yr | web dev (MERN) | DS | DSA | AI
            enthusiast | 2x100DaysOfCode .
          </p>
        </div>
        <div className='flex text-sm justify-between p-4'>
          {/* Profile Views Count */}
          <div className='flex  flex-col'>
            <p className='font-semibold self-start'>Profile Views</p>
            <p className='self-center'>100</p>
          </div>
          {/* Post Count */}
          <div className='flex  flex-col'>
            <p className='font-semibold self-start'>Post Count</p>
            <p className='self-center'>50</p>
          </div>
        </div>
      </div>
      <div
        className=' text-xs w-full p-2 flex gap-2 rounded max-w-[440px]'
        style={{
          backgroundImage:
            "linear-gradient(to right, #960443, #7c134d, #601d50, #601d50,#44214b,#44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a, #161829, #151829)",
        }}
      >
        <img
          src='https://avatars.githubusercontent.com/u/84271800?v=4'
          alt='user profile'
          className='min-w-[80px] w-[20%] h-auto rounded'
        />
        <div class=' w-[70%] flex flex-col'>
          <h2 className='pb-1 text-lg'>Portfolio </h2>
          <p className='flex flex-wrap'>
            I'm happy to share that Advanced Software Engineering Virtual
            Program of Walmart Global{" "}
          </p>
          <p className='py-1 flex gap-2 items-center'>
            visit <FaChevronRight className='animation-pulse' />
          </p>
        </div>
      </div>
      <div
        className='text-[0.5rem] text-gray-300 text-xs w-full p-2 flex flex-col gap-2 rounded max-w-[440px]'
        style={{
          backgroundImage:
            "linear-gradient(to right, #960443, #7c134d, #601d50, #601d50,#44214b,#44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a, #161829, #151829)",
        }}
      >
        <RecentIntraction />
        <hr className=' border-gray-400 self-center w-[80%]' />
        <RecentIntraction />
        <hr className=' border-gray-400 self-center w-[80%]' />
        <RecentIntraction />
      </div>
    </div>
  );
};

export default Profile;
