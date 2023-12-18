// pages/dashboard.js
import React, { useState, useEffect } from "react";
import EditProject from "@/components/EditProjects.js";
import EditAbout from "@/components/EditAbout.js";
// import EditSkills from '../components/EditSkills';
import EditHome from "@/components/EditHome.js";
import EditArticles from "@/components/EditArticles.js";
import EditSocial from "@/components/EditSocial.js";
import { addDataToFirebase } from "@/services/useFirebase.js";
import {
  auth,
  getUserData,
  getCurrentUserId,
} from "@/services/firebaseConfig.js"; // Replace with your Firebase configuration import
import { useRouter } from "next/router";
import { getUserPortfolioData } from "@/services/dataCRUD.js";
import { DashboardDataProvider } from "@/context/DashboardDataProvider.js";

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
  }, []);
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
      <div className='mb-20 '>
        {!isdata && (
          <div className='flex justify-center my-10'>Loading Data ...</div>
        )}
        {isdata && (
          <>
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
