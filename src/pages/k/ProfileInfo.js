import React, { useState } from "react";
import Image from "next/image";
import LinesEllipsis from "react-lines-ellipsis";
import coverImage from "../../../public/images/profile/coverImage.png";
import Post from "../../components/home/Post";

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

const ProfileInfo = () => {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div>
      <div className='max-w-[612px] min-w-[360px] text-white my-4 m-2 rounded-lg '>
        <div className='flex items-center  flex-col  text-sm '>
          <div
            className='rounded w-full overflow-hidden '
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #960443, #7c134d, #601d50, #601d50,#44214b,#44214b,#601d50,#44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a )",
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
                className='w-32 h-32 object-cover items-center absolute bottom-0 transform translate-x-[180%] translate-y-[25%] rounded-full border-4 border-white'
              />
            </div>
            <div className='flex flex-col text-center p-4'>
              {/* User Name */}
              <h2 className='text-xl font-bold'>Kiran Kuyate</h2>
              {/* Handle Text */}
              <p className='text-gray-400 text-xs'>
                SDE aspirants 💫 | final yr | web dev (MERN) | DS | DSA | AI
                enthusiast | 2x100DaysOfCode .
              </p>
            </div>
          </div>
          <div
            className='w-full mt-2 rounded-md px-4'
            style={{
              backgroundImage:
                "linear-gradient(to right ,#44214b ,#601d50,#601d50, #601d50,#44214b,#44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a, #161829, #151829)",
            }}
          >
            <div className='flex flex-col justify-start py-4'>
              <h1 className='font-bold'>About</h1>
              <div className='text-xs rounded p-2 border border-[#2c2040]'>
                <LinesEllipsis
                  text={`I'm happy to share that I have obtained a new certification of Advanced Software Engineering Virtual Program of Walmart Global Tech, it was provided by Forage. #walmartglobaltech #theforage #softwareengineer #virtualexperience`}
                  maxLine={showFullText ? 1000 : 3}
                  ellipsis='.. See more...'
                  trimRight
                  basedOn='words'
                  onClick={() => setShowFullText(!showFullText)}
                />
              </div>
            </div>
            <hr className='border-gray-500 py-2' />
            <div className='flex flex-col '>
              <h1 className='font-bold'>Contact</h1>
              <div className='flex flex-col gap-2 py-2 text-xs px-2'>
                <div className='flex gap-2 justify-start'>
                  <h3 className='font-semibold'>Email</h3>
                  <p>kirankuyate@gmail.com</p>
                </div>

                <div className='flex gap-2 justify-start'>
                  <h3 className='font-semibold'>Profile Url</h3>
                  <p>localhost:3000/k/kiran2157</p>
                </div>

                <div className='flex gap-2 justify-start'>
                  <h3 className='font-semibold'>Phone</h3>
                  <p>8855962341</p>
                </div>
              </div>
            </div>
            <hr className='border-gray-500 py-2' />

            <div className='flex flex-col'>
              <div className='flex gap-2 py-2 justify-between'>
                <h3 className='text-xs'>Profile views</h3>
                <p>301</p>
              </div>
              <div className='flex gap-2 py-2 justify-between'>
                <h3 className='text-xs'>Total posts</h3>
                <p>4</p>
              </div>
            </div>
          </div>
          <div
            className='w-full mt-2 rounded-md py-2 sm:px-0 px-4'
            style={{
              backgroundImage:
                "linear-gradient(to right ,#44214b ,#601d50,#601d50, #601d50,#44214b,#44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a, #161829, #151829)",
            }}
          >
            <div className='flex flex-col justify-start py-4 '>
              <h1 className='font-bold px-4'>Posts</h1>
            </div>
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
