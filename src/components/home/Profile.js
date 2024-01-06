import React,{useState,useEffect} from "react";
import Image from "next/image";
import blankProf from "../../../public/images/profile/blankProf.png";
import { FaChevronRight } from "react-icons/fa6";
import { getCurrentUserId } from "@/services/firebaseConfig.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";

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
  const [accountData, setAccountData] = useState(null);
  const [userPortfolio,setUserPortfolio]=useState(null);
  const userId = getCurrentUserId();
  const db = getFirestore();

  const fetchAccountData = async () => {
    
    if (userId) {
      const accountRef = doc(db, "accounts", userId);
        console.log("fetching  data ..");
      try {
        const accountDataSnapshot = await getDoc(accountRef);

        if (accountDataSnapshot.exists()) {
          const newAccountData = accountDataSnapshot.data();

          // Update the state with the fetched user portfolio data
          setAccountData(() => newAccountData);
        }
      } catch (error) {
        return null;
      }
    }
  };
  const fetchPortfolioData = async () => {
    
    if (userId) {
      const PortfolioRef = doc(db, "Users", userId);
        console.log("fetching  data ..");
      try {
        const PortfolioDataSnapshot = await getDoc(PortfolioRef);

        if (PortfolioDataSnapshot.exists()) {
          const newPortfolioData = PortfolioDataSnapshot.data();

          // Update the state with the fetched user portfolio data
          setUserPortfolio(() => newPortfolioData.profileData );
        }
      } catch (error) {
        return null;
      }
    }
  };

useEffect(()=>{
  fetchAccountData();
  fetchPortfolioData();
  console.log("user port ",userPortfolio);
},[]);

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
                src={accountData?.coverImg || blankProf}
                alt='cover image'
            className='w-full h-32 object-cover '
            priority
            width={900}
            height={400}
            sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,50vw'
          />

          {/* Profile Image */}
          <Image
                src={accountData?.avatar || blankProf}
                alt='user profile'
            className='w-32 h-32 object-cover items-center absolute bottom-0 transform translate-x-[120%] translate-y-[25%] rounded-full border-4 border-white'
            priority
            width={400}
            height={900}
            sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,50vw'
         />
        </div>
        <div className='flex flex-col text-center p-4'>
          {/* User Name */}
          <h2 className='text-xl font-bold'>{accountData?.name}</h2>
          {/* Handle Text */}
          <p className='text-gray-600 text-xs'>
          {accountData?.handle}
          </p>
        </div>
        <div className='flex text-sm justify-between p-4'>
          {/* Profile Views Count */}
          <div className='flex  flex-col'>
            <p className='font-semibold self-start'>Profile Views</p>
            <p className='self-center'>{accountData?.profileViews}</p>
          </div>
          {/* Post Count */}
          <div className='flex  flex-col'>
            <p className='font-semibold self-start'>Post Count</p>
            <p className='self-center'>{accountData?.TotalPosts}</p>
          </div>
        </div>
      </div>
      {userPortfolio&&(<div
        className=' text-xs w-full p-2 flex gap-2 rounded max-w-[440px]'
        style={{
          backgroundImage:
            "linear-gradient(to right, #960443, #7c134d, #601d50, #601d50,#44214b,#44214b, #2c2040, #231e39, #1c1c32, #16192a, #16192a, #161829, #151829)",
        }}
      >
        <Image
          src={userPortfolio?.portfolioImg ||accountData?.avatar || blankProf }
          alt='portfolio profile'
          className='min-w-[80px] w-[20%] h-auto rounded'
          priority
          width={900}
          height={400}
          sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,50vw'
        />
        <div class=' w-[70%] flex flex-col'>
          <h2 className='pb-1 text-lg'>{userPortfolio.name} Portfolio </h2>
          <p className='flex flex-wrap'>
            I'm happy to share that Advanced Software Engineering Virtual
            Program of Walmart Global
          </p>
          <a href={userPortfolio.profileLink} className='py-1 mt-1 flex gap-2 items-center'>
            visit <FaChevronRight className='animation-pulse' />
          </a>
        </div>
      </div>)}
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
