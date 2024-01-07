import { useEffect, useState } from "react";
import Head from "next/head";
import NavbarHome from "@/components/home/NavbarHome";
import StartPost from "@/components/home/StartPost";
import Post from "@/components/home/Post";
import Profile from "@/components/home/Profile";
import { useRouter } from "next/router";
import ProfileInfo from "./ProfileInfo";
import PortfolioLists from '../../components/home/PortfolioLists';
import { getUserData } from "@/services/firebaseConfig.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  docs,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

const Home = () => {
  const [tabs,setTabs]=useState("Home");
  const [posts, setPosts] = useState([]);
  const [refresh,setRefresh] = useState(false);

  const handleTabClick=(tab)=>{
      setTabs(tab);
  }
  const fetchPostData = async () => {
    const db = getFirestore();
    const postsRef = collection(db, "posts"); // Use collection() to reference a collection
    console.log("fetching post from main 📍📍🔥 ..");
    try {
      const postDataSnapshot = await getDocs(postsRef);
  
      if (!postDataSnapshot.empty) {
        const newPostData = postDataSnapshot.docs.map((doc) => doc.data());
        setPosts([ ...newPostData]);
        console.log("new data :",newPostData);
      }
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };
  
  useEffect(()=>{
fetchPostData();
console.log("posts data :",posts)
  },[refresh])
  
  return (
    <>
      <Head>
        <title> portfolio | kiran.dev</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='min-h-screen w-full' style={{ fontFamily: "Quicksand" }}>
        <NavbarHome currentTab={(tab)=>handleTabClick(tab)} />
        <div className='sm:p-0 px-10  flex flex-row justify-start gap-2 '>
          <button onClick={()=>setRefresh(!refresh)}>refresh</button> 
          <div
            className='md:hidden max-w-[612px] min-w-[310px]   overflow-y-auto'
            style={{ height: "100vh" }}
          >
            <Profile />
          </div>
          <div className=' w-full max-w-[612px] min-w-[310px] '>
          <div
            className='flex flex-col max-w-[612px] min-w-[310px] hide-scrollbar  overflow-y-auto'
            style={{ height: "100vh" }}
          >
            {tabs=="Home"&&(
              <>
              <StartPost/>
              <Post/>
              <Post/>
              <Post/>
              </>
            )}
           {tabs=="Portfolio"&&( <PortfolioLists/>)}
           {tabs=="Profile"&&( <ProfileInfo/>)}
           
          </div>
        </div>
        </div>
      </main>
    </>
  );
};

export default Home;
