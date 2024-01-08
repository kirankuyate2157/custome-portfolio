import React, { useEffect, useState } from "react";
import Image from "next/image";
import LinesEllipsis from "react-lines-ellipsis";
import blankProf from "../../../public/images/profile/blankProf.png";
import Post from "../../components/home/Post";
import { getUserData } from "@/services/firebaseConfig.js";
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

const getBanner = () => {
  const banners = [
    "https://firebasestorage.googleapis.com/v0/b/nari-376818.appspot.com/o/template%2FpinkMenifest2.png?alt=media&token=a8d8b5bf-b20d-4870-9d4f-c1d5c88e84d1",
    "https://firebasestorage.googleapis.com/v0/b/nari-376818.appspot.com/o/template%2FpinkMenifest1.png?alt=media&token=ad777a90-92ee-44c1-821e-ef00eed62463",
    "https://firebasestorage.googleapis.com/v0/b/nari-376818.appspot.com/o/template%2FblueSky.png?alt=media&token=98496973-a34e-4225-9581-468effb18ca9",
    "https://firebasestorage.googleapis.com/v0/b/nari-376818.appspot.com/o/template%2FblueMenifest3.png?alt=media&token=30cb3328-0578-4a5d-9984-7366a7b0b945",
  ];

  const idx = Math.floor(Math.random() * banners.length);
  console.log(" index : " + idx);
  return banners[idx];
};


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
  const [accountData, setAccountData] = useState(null);
  const [posts, setPosts] = useState([]);
  const user = getUserData();

  const data = {
    TotalPosts: 6,
    about:
      "I'm happy to share that I have obtained a new certification of Advanced Software Engineering Virtual Program of Walmart Global Tech, it was.. See more...",
    avatar: "https://avatars.githubusercontent.com/u/84271800?v=4",
    contact: {
      phone: "7722452288",
      profileUrl: "localhost:3000/k/kiran2157",
      email: "kirankuyate@gmail.com",
    },
    email: "kirankuyate@gmail.com",
    phone: "7722452288",
    profileUrl: "localhost:3000/k/kiran2157",
    coverImg:
      "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FcoverImage.5455efc1.png&w=3840&q=75",
    handle:
      "SDE aspirants 💫 | final yr | web dev (MERN) | DS | DSA | AI enthusiast | 2x100DaysOfCode .",
    name: "Kiran Kuyate",
    profileViews: 222,
    username: "kiran2157",
  };

  const newData = {
    id: user?.uid,
    TotalPosts: 0,
    about:
      "Add about here",
    avatar: user?.photoURL,
    contact: {
      phone: "1234567890",
      profileUrl: `localhost:3000/k/${user?.displayName.split(' ').join('')}`,
      email: user?.email,
    },
    email: user?.email,
    phone: "1234567890",
    profileUrl: "localhost:3000/k/exampleuser",
    coverImg: getBanner(),
    handle: "new user",
    name: user?.displayName,
    profileViews: 3,
    gender: "",
    username: user?.displayName.split(' ').join(''),
  };

  const fetchAccountData = async () => {
    const db = getFirestore();
    if (user && user.uid) {
      const accountRef = doc(db, "accounts", user.uid);
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
  const fetchPostData = async () => {
    const db = getFirestore();
    const postsRef = collection(db, "posts"); // Use collection() to reference a collection
    // console.log("fetching post 📍📍🔥 ..");
    try {
      const postDataSnapshot = await getDocs(postsRef);
      // console.log(" 📍📍🔥 ..");
      if (!postDataSnapshot.empty) {
        const newPostData = postDataSnapshot.docs.map((doc) => doc.data()).filter((post) => post.uid===user.uid );
        setPosts([...newPostData]);
        // console.log("🔥 ..");
        // console.log("new data :", newPostData);
      }
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };



  const setDummyAccountData = async () => {
    if (user && user.uid) {
      const db = getFirestore();
      const accountRef = doc(db, "accounts", user?.uid);
      let done = await setDoc(accountRef, newData);
      if (done) {
        console.log(" account created sucessfully .✔️");
      }
    } else {
      console.log("auth user id not found till now..");
    }
  };

  useEffect(() => {

    const fetchData = async () => {
      let daf = await fetchAccountData();
      if (daf === undefined) {
        console.log("set  data")
        setDummyAccountData();
        await fetchAccountData();
        if(posts.length<=0){
        await fetchPostData();
        console.log(posts)
        }
      }
    }
    fetchData();

  }, []);

  return (
    <div>
      <div className='max-w-[612px] min-w-[360px] text-black dark:text-white my-4 m-2 rounded-lg '>
        <div className='flex items-center  flex-col  text-sm '>
          <div
            className='rounded w-full overflow-hidden relative 
            text-black dark:text-white dark:bg-[#151829]  bg-[#FFFFFF] '
          >
            <div
              className='absolute z-[0] w-[70%] h-[60%] right-[40%] rounded-full opacity-60 bottom-4'
              style={{
                background: "linear-gradient(90deg, #6A15DA 40%, #960443 100%)",
                filter: "blur(900px)",
              }}
            />
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
                className='w-32 h-32 object-cover items-center absolute bottom-0 transform translate-x-[180%] translate-y-[25%] rounded-full border-4 border-white'

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
              <p className='text-gray-400 text-xs'>{accountData?.handle}</p>
            </div>
          </div>
          <div
            className='w-full mt-2 rounded-md px-4 overflow-hidden text-black dark:text-white dark:bg-[#151829]  bg-[#FFFFFF] relative  '
          >
             <div
              className='absolute z-[0] w-[80%] h-[60%] right-[40%] rounded-full  opacity-40 bottom-4'
              style={{
                background: "linear-gradient(90deg, #6A15DA 40%, #960443 100%)",
                filter: "blur(900px)",
              }}
            />
            <div className='flex flex-col justify-start py-4'>
              <h1 className='font-bold'>About</h1>
              <div className='text-xs rounded p-2 border border-gray-300 dark:border-[#2c2040]'>
                <LinesEllipsis
                  text={accountData?.about}
                  maxLine={showFullText ? 1000 : 3}
                  ellipsis='.. See more...'
                  trimRight
                  basedOn='words'
                  onClick={() => setShowFullText(!showFullText)}
                />
              </div>
            </div>
            <hr className='border-gray-400 dark:border-gray-500 py-2' />
            <div className='flex flex-col '>
              <h1 className='font-bold'>Contact</h1>
              <div className='flex flex-col gap-2 py-2 text-xs px-2'>
                <div className='flex gap-2 justify-start'>
                  <h3 className='font-semibold'>Email</h3>
                  <p>{accountData?.contact?.email}</p>
                </div>

                <div className='flex gap-2 justify-start'>
                  <h3 className='font-semibold'>Profile Url</h3>
                  <p>{accountData?.contact?.profileUrl}</p>
                </div>

                <div className='flex gap-2 justify-start'>
                  <h3 className='font-semibold'>Phone</h3>
                  <p>{accountData?.contact?.phone}</p>
                </div>
              </div>
            </div>
            <hr className='border-gray-400 dark:border-gray-500 py-2' />

            <div className='flex flex-col'>
              <div className='flex gap-2 py-2 justify-between'>
                <h3 className='text-xs'>Profile views</h3>
                <p>{accountData?.profileViews}</p>
              </div>
              <div className='flex gap-2 py-2 justify-between'>
                <h3 className='text-xs'>Total posts</h3>
                <p>{accountData?.TotalPosts}</p>
              </div>
            </div>
          </div>
          <div
            className='w-full mt-2 rounded-md py-2 sm:px-0 px-4 text-black dark:text-white dark:bg-[#151829] relative overflow-hidden bg-[#FFFFFF] '
         
          >
              <div
              className='absolute z-[0] w-[80%] h-[90%] right-[40%] rounded-full  opacity-40 top-4'
              style={{
                background: "linear-gradient(90deg, #6A15DA 20%, #960443 100%)",
                filter: "blur(900px)",
              }}
            />
            <div className="flex flex-col z-[10]">
            <div className='flex flex-col justify-start py-4 z-10 '>
              <h1 className='font-bold px-4'>Posts</h1>
            </div>
            {posts && posts.length > 0 && (
              posts.map((data, index) => <Post key={index} data={...data} />
                    ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
