import { useEffect, useState } from "react";
import Head from "next/head";
import NavbarHome from "@/components/home/NavbarHome";
import StartPost from "@/components/home/StartPost";
import Post from "@/components/home/Post";
import Profile from "@/components/home/Profile";
import { useRouter } from "next/router";
import ProfileInfo from "./ProfileInfo";
import PortfolioLists from "../../components/home/PortfolioLists";
import { AccountDataProvider } from "../../context/AccoundData";
import { getUserData } from "@/services/firebaseConfig.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  docs,
  doc,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import Ai from "../../components/home/Ai";

const Home = () => {
  const [tabs, setTabs] = useState("Home");
  const [posts, setPosts] = useState([]);
  const [accountData, setAccountData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const user = getUserData();
  const handleTabClick = (tab) => {
    setTabs(tab);
  };
  const fetchAccountData = async () => {
    const db = getFirestore();
    if (user && user.uid) {
      const accountRef = doc(db, "accounts", user.uid);
      // console.log("fetching  data ..");
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
    // console.log("fetching post from main 📍📍🔥 ..");
    try {
      const postDataSnapshot = await getDocs(postsRef);

      if (!postDataSnapshot.empty) {
        const newPostData = postDataSnapshot.docs.map((doc) => doc.data());
        newPostData.reverse();
        setPosts([...newPostData]);
        // console.log("new data :", newPostData);
      }
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };
  const updateData = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    const def = async () => {
      await fetchPostData();
      if (!accountData) {
        await fetchAccountData();
      }
    };
    def();
  }, [refresh]);

  return (
    <>
      <Head>
        <title> kways</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AccountDataProvider data={accountData} className='min-h-screen w-full' style={{ fontFamily: "Quicksand" }}>
        <NavbarHome currentTab={(tab) => handleTabClick(tab)} />
        <div className='sm:p-0 px-10  flex flex-row justify-start gap-2 '>
          <div
            className='md:hidden max-w-[612px] min-w-[310px]   overflow-y-auto'
            style={{ height: "100vh" }}
          >
            <Profile />
          </div>
          <div className=' w-full max-w-[612px] min-w-[310px] '>
            <div
              className='flex flex-col  max-w-[612px] min-w-[310px] hide-scrollbar  overflow-y-auto'
              style={{ height: "100vh" }}
            >
              {tabs === "Home" && (
                <>
                  <StartPost />

                  {posts && posts.length > 0 ? (
                    posts.map((data, index) => <Post key={index} data={{ ...data }} onChanges={() => updateData()} />)
                  ) : (
                    <div className="flex w-full flex-col items-center bg-transparent ">
                    <p className='flex self-center'>{`Loading...`}</p>
                    <button className=" p-1 text-sm flex rounded mt-10 text-black dark:text-white dark:bg-[#151829]  bg-[#FFFFFF]" onClick={()=>setRefresh(!refresh)}>refresh</button>
                    </div>
                  )}
                </>
              )}
              {tabs == "GenAI" && <Ai />}
              {tabs == "Portfolio" && <PortfolioLists />}
              {tabs == "Profile" && <ProfileInfo />}
            </div>
          </div>
        </div>
      </AccountDataProvider>
    </>
  );
};

export default Home;
