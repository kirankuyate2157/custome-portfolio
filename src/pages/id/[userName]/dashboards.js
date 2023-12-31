// pages/dashboard.js
import React, { useState, useEffect } from "react";
import EditProject from "@/components/portfolio/EditProjects.js";
import EditAbout from "@/components/portfolio/EditAbout.js";
// import EditSkills from '../components/portfolio/EditSkills';
import EditHome from "@/components/portfolio/EditHome.js";
import Guid from "@/components/portfolio/Guid.js";
import EditArticles from "@/components/portfolio/EditArticles.js";
import EditSocial from "@/components/portfolio/EditSocial.js";
import { addDataToFirebase } from "@/services/useFirebase.js";
import Navbar from "@/components/portfolio/Navbar";
import {
  auth,
  getUserData,
  getCurrentUserId,
  getUserPortfolioData 
} from "@/services/firebaseConfig.js"; // Replace with your Firebase configuration import
// D:\Kways_Project\customize Portfolio\src\services\dataCRUD.js
// Update the import path for getUserPortfolioData
// import { getUserPortfolioData } from  "@/services/dataCRUD.js";

import { DashboardDataProvider } from "@/context/DashboardDataProvider.js";
import EditProfile from "@/components/portfolio/EditProfile";

const Dashboard = () => {
  const [Data, setData] = useState({});
  const [isdata, setIsData] = useState(false);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchData = async () => {
      // Get the user's UID
      // const user = getUserData();
      // if (user)
      // const userId = "IewXRnC69XRTnbgRf41EmKuU9cu2";
      let userId = "";
      if (!userId) {
        const storedUserData = localStorage.getItem("userDataP");
        const user = storedUserData ? JSON.parse(storedUserData) : null;
        if (user) {
          userId = user.uid;
        } else {
          userId = getCurrentUserId();
        }
      }
      const userPortfolioData = await getUserPortfolioData(userId);
      // if (userPortfolioData) console.log("user data dashboard fetched ✅");
      if (userPortfolioData) {
        setIsData(true);
        setData(userPortfolioData);
        // console.log(userPortfolioData);
        // Set the user's data in your component state
      }
    };

    fetchData();
  }, [isdata]);
  const sendData = async () => {
    //  DataUpload(KiranPortfolioData,"kiran2157");
    await addDataToFirebase(KiranPortfolioData)
      .then(() => console.log("DataUpload successful"))
      .catch((error) => {
        console.log("error: " + error.message);
      });
  };

  return (
    <DashboardDataProvider data={Data}>
      <Navbar/>
      <div className='mb-20  w-full min-h-[70vh] '>
        {!isdata && (
          <div className='flex flex-col justify-start items-center w-full my-10'>
            <p>Loading Data ...</p>
            <p className="px-2">In case it not load within 10 sec please refresh..</p>
          </div>
        )}
        {isdata && (
          <>
          <Guid/>
            <EditProfile />
            <div className="px-5 text-sm  text-black  dark:text-white my-4 font-mono flex flex-col items-start w-full relative ">
            <div
                  className='absolute z-[1] w-[90%]  h-[60%]   rounded-full opacity-80 '
                  style={{
                    background:
                      "linear-gradient(90deg, #601d50 60%, #960443 100%)",
                    filter: "blur(900px)",
                  }}
                />
              <p className="pl-2 py-2 border-l-4 border-red-600">Now edit Data as per the Your personal data and that will be appear to yor portfolio at all..💖</p></div>
            <EditSocial />
            <EditHome />
            <EditAbout />
            <EditProject />
            <EditArticles />
          </>
        )}
      </div>
    </DashboardDataProvider>
  );
};

export default Dashboard;
