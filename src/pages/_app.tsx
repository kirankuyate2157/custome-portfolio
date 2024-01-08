import "@/styles/globals.css";
import { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
// import { Montserrat } from "next/font/google";
// import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import { HomeDataProvider } from "@/context/DataProvider";
import KiranPortfolioData from "@/assets/portfolioData";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import Notification from "@/components/portfolio/Notification";
// import { getUserPortfolioData } from "@/services/dataCRUD.js";
// import { getCurrentUserId } from "@/services/firebaseConfig.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";


interface SocialLinks {
  Twitter: string;
  LinkedIn: string;
  GitHub: string;
}

interface HomeData {
  name: string;
  profileImg: string;
  title: string;
  description: string;
  resumeLink: string;
  email: string;
}

interface AboutData {
  title: string;
  profileImg: string;
  bio: string[];
  skills: { name: string; x: string; y: string }[];
  statistics: { label: string; value: number }[];
}

interface ExperienceData {
  position: string;
  company: string;
  companyLink: string;
  time: string;
  address: string;
  work: string;
}

interface EducationData {
  type: string;
  time: string;
  place: string;
  info: string;
}

interface ProjectData {
  type: string;
  title: string;
  img: string;
  link: string;
  github: string;
  summary: string;
}

interface ArticleData {
  title: string;
  summary: string;
  time: string;
  img: string;
  link: string;
}
interface allArticleData {
  title: string;
  date: string;
  img: string;
  link: string;
}

interface PortfolioDataType {
  SocialLinks: SocialLinks;
  Home: { homeData: HomeData };
  About: { aboutPageData: { aboutData: AboutData; experienceData: ExperienceData[]; educationData: EducationData[] } };
  Projects: { projectData: ProjectData[] };
  Articles: { articlesData: ArticleData[]; allArticlesData: allArticleData[] };
}

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   variable: "--font-mont",
// });

export default function App({ Component, pageProps }: AppProps) {
  const [PortfolioData, setPortfolioData] = useState<PortfolioDataType>(KiranPortfolioData);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [noteMsg, setNoteMsg] = useState<{ message: string; type: string }>({
    message: "some action done 😕 ",
    type: "warn",
  });
  const router = useRouter();
  const hasIdParameter = router.asPath.startsWith('/id/');
  const secureRoute = router.asPath.startsWith('/k');
  const loginRoute = router.asPath.startsWith('/k/login');

  if (typeof localStorage !== 'undefined') {
    if (!loginRoute && secureRoute) {
      const storedUserData = localStorage.getItem("userDataP");
      const user = storedUserData ? JSON.parse(storedUserData) : null;
      const userId = user?.uid ?? null;
      if (!userId) {
        router.push("/k/login")
      }
    }
  }


  const handleNotificationClose = () => {
    setShowNotification(false);
  };



  const showNotificationMsg = () => {
    if (hasIdParameter)
      setShowNotification(true);
  };
  const showNotificationMsgDelay = () => {
    if (hasIdParameter) {
      setTimeout(() => {
        setShowNotification(true);
      }, 2000);
    }
  };
  const searchUserByUsername = async (username: string): Promise<string | void> => {
    const db = getFirestore();
    const usersCollection = collection(db, "Users");

    const q = query(usersCollection, where("profileData.username", "==", username));

    try {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return; // No user found with the given username
      }

      // Assuming there is only one user with a unique username
      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;
      return userId;

    } catch (error) {
      console.error(error);
      return ""; // Return an empty string in case of an error
    }
  };

  const fetchUserPortfolioData = async (userId: string): Promise<void> => {
    const db = getFirestore();
    const userPortfolioDataRef = doc(db, "User_portfolio_data", userId);

    try {
      const userPortfolioDataSnapshot = await getDoc(userPortfolioDataRef);

      if (userPortfolioDataSnapshot.exists()) {
        const userPortfolioData = userPortfolioDataSnapshot.data();
        const mappedPortfolioData: PortfolioDataType = {
          SocialLinks: userPortfolioData.SocialLinks,
          Home: userPortfolioData.Home,
          About: userPortfolioData.About,
          Projects: userPortfolioData.Projects,
          Articles: userPortfolioData.Articles,
        };
        // Set the mapped data as the state
        setPortfolioData(mappedPortfolioData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { userName } = router.query;
  
      if (userName) {
        const username = Array.isArray(userName) ? userName[0] : userName;
        try {
          // Fetch user data based on the userName
          const searchedUserId = await searchUserByUsername(username);
  
          if (typeof searchedUserId === 'string') {
            // Now fetch the user portfolio data using the user ID
            setNoteMsg({
              message: "Awesome background 🙌🏻 🔥",
              type: "done",
            });
            await fetchUserPortfolioData(searchedUserId);
            showNotificationMsg();
          } else {
            if (userName !== "demo") {
              router.push("/");
            }
          }
        } catch (error) {
          setNoteMsg({
            message: "Error fetching user 😕 ",
            type: "warn",
          });
        }
      } else {
        setNoteMsg({
          message: "User Name not found 🥸 ",
          type: "warn",
        });
      }
    };
  
    fetchUserProfile();
  }, [router.query]);
  


  return (
    <>
      <Head>
        <title>my portfolio</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main
        className={`font-mont bg-light dark:bg-dark w-full min-h-screen`}
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
