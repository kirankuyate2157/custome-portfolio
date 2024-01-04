import "@/styles/globals.css";
import { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { HomeDataProvider } from "@/context/DataProvider";
import KiranPortfolioData from "@/assets/portfolioData";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import Notification from "@/components/portfolio/Notification";
import { getUserPortfolioData } from "@/services/dataCRUD.js";
import { getCurrentUserId } from "@/services/firebaseConfig.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
});

export default function App({ Component, pageProps }: AppProps) {
  const [PortfolioData, setPortfolioData] = useState(KiranPortfolioData);
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ",
    type: "warn",
  });
  const router = useRouter();
  const hasIdParameter = router.asPath.startsWith('/id/');
  const secureRoute = router.asPath.startsWith('/k');
  const loginRoute = router.asPath.startsWith('/k/login');

  if (typeof localStorage !== 'undefined') {
    if(!loginRoute && secureRoute){
      const storedUserData = localStorage.getItem("userDataP");
      const user = storedUserData ? JSON.parse(storedUserData) : null;

      if(!user?.uid){
       router.push("/k/login")
      }
    }
  }


  const handleNotificationClose = () => {
    setShowNotification(false);
  };



  const showNotificationMsg = () => {
  if(hasIdParameter)
    setShowNotification(true);
  };
  const showNotificationMsgDelay = () => {
    if(hasIdParameter){
    setTimeout(() => {
      setShowNotification(true);
    }, 2000);}
  };

  const searchUserByUsername = async (username) => {
    const db = getFirestore();
    const usersCollection = collection(db, "Users");

    const q = query(usersCollection, where("profileData.username", "==", username));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      // Assuming there is only one user with a unique username
      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;

      return userId;
    } catch (error) {
      return null;
    }
  };

  const fetchUserPortfolioData = async (userId) => {
    const db = getFirestore();
    const userPortfolioDataRef = doc(db, "User_portfolio_data", userId);

    try {
      const userPortfolioDataSnapshot = await getDoc(userPortfolioDataRef);

      if (userPortfolioDataSnapshot.exists()) {
        const userPortfolioData = userPortfolioDataSnapshot.data();

        // Update the state with the fetched user portfolio data
        setPortfolioData(userPortfolioData);
      }
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { userName } = router.query;

      if (userName) {
        try {
          // Fetch user data based on the userName
          const searchedUserId = await searchUserByUsername(userName);
          if (searchedUserId) {
            // Now fetch the user portfolio data using the user ID
            setNoteMsg({
              message: "Awesome background 🙌🏻 🔥",
              type: "done",
            });
            await fetchUserPortfolioData(searchedUserId);
            showNotificationMsg();
          } else {
            if(userName!=="demo")
               router.push("/");
          }
        } catch (error) {
          setNoteMsg({
            message: " Error fetching user 😕 ",
            type: "warn",
          });
        }
      } else {
        setNoteMsg({
          message: "User Name not found 🥸 ",
          type: "warn",
        });
      }
      showNotificationMsgDelay();
    };

    fetchUserProfile();
  }, [router.query.userName]);

  return (
    <>
      <Head>
        <title>my portfolio</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}
      >
        <HomeDataProvider data={PortfolioData}>
          <AnimatePresence mode='wait'>
            <Component key={router.asPath} {...pageProps} />
          </AnimatePresence>
          <Footer />
        </HomeDataProvider>
        {showNotification && (
          <Notification
            message={noteMsg.message}
            type={noteMsg.type}
            onClose={handleNotificationClose}
          />
        )}
      </main>
    </>
  );
}
