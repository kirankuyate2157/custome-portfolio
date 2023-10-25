// pages/dashboard.js
import React, { useState, useEffect } from 'react';
import EditProject from '../../components/EditProjects';
import KiranPortfolioData from '../../assets/portfolioData.js';
import EditAbout from '../../components/EditAbout';
// import EditSkills from '../components/EditSkills';
import EditHome from '../../components/EditHome';
import EditArticles from '../../components/EditArticles';
import EditSocial from "../../components/EditSocial";
import { addDataToFirebase } from "../../services/useFirebase.js";
import { auth, getUserData, getCurrentUserId } from '../../services/firebaseConfig'; // Replace with your Firebase configuration import
import { useRouter } from 'next/router';
import { getUserPortfolioData } from '../../services/dataCRUD.js';

const Dashboard = () => {
  const [projectsData, setProjectsData] = useState({});
  const [aboutData, setAboutData] = useState({});
  const [homeData, setHomeData] = useState({});
  const [socialLinks, setSocialLinks] = useState({});
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [skills, setSkills] = useState([]);
  const [isEditingHome, setIsEditingHome] = useState(false);
  const [isdata, setIsData] = useState(false);


  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchData = async () => {
      // Get the user's UID
      // const user = getUserData();
      // if (user) 
      const userId = 'UR93ipCQCcdF7kLF56iloz9ROyp2';
      const userPortfolioData = await getUserPortfolioData(userId);
      console.log("user data ", userPortfolioData);
      if (userPortfolioData) {
        setIsData(true);
        console.log(userPortfolioData);
        // Set the user's data in your component state
        setProjectsData(userPortfolioData.Projects.projectData);
        setAboutData(userPortfolioData.About.aboutPageData.aboutData);
        setHomeData(userPortfolioData.Home.homeData);
        setSocialLinks(userPortfolioData.SocialLinks);
        setSkills([...userPortfolioData.About.aboutPageData.aboutData.skills]);
      }
    };

    fetchData();
  }, []);

  // Function to open the edit modal
  const handleOpenEditModal = () => {
    setIsEditSocialModalOpen(true);
  };

  // Function to close the edit modal
  const handleCloseEditModal = () => {
    setIsEditSocialModalOpen(false);
  };

  // Function to save social links
  const handleSaveSocialLinks = (updatedSocialLinks) => {
    setSocialLinks(updatedSocialLinks);
    handleCloseEditModal();
  };

  // Function to save changes to home data
  const handleSaveHome = (newHomeData) => {
    // Implement logic to update your home data if needed
    setHomeData(newHomeData);
    setIsEditingHome(false); // Turn off the edit mode
  }

  // Function to cancel editing home data
  const handleCancelHome = () => {
    setIsEditingHome(false); // Turn off the edit mode
  }


  // Function to add a new project
  const addProject = (project) => {
    // Implement the logic to add a new project to your data structure
    setProjectsData([...projectsData, project]);
  }

  // Function to update an existing project
  const updateProject = (updatedProject) => {
    // Implement the logic to update a project in your data structure
    const updatedProjects = projectsData.map((project) =>
      project.title === updatedProject.title ? updatedProject : project
    );
    setProjectsData(updatedProjects);
  }

  // Function to delete a project
  const deleteProject = (projectTitle) => {
    // Implement the logic to delete a project from your data structure
    const updatedProjects = projectsData.filter((project) =>
      project.title !== projectTitle
    );
    setProjectsData(updatedProjects);
  }

  // Function to save changes or add new About Me data
  const saveAboutMe = (newData) => {
    // Implement logic to update data source if needed
    setAboutData(newData);
    setIsEditingAbout(false);
  }
  // Function to cancel editing or adding about data
  const cancelEditAbout = () => {
    setIsEditingAbout(false);
  }

  const sendData = async () => {
    //  DataUpload(KiranPortfolioData,"kiran2157");
    await addDataToFirebase(KiranPortfolioData).then(() =>
      console.log("DataUpload successful")
    ).catch((error) => {
      console.log("error: " + error.message)
    });
  }

  return (
    <div className='mb-20 ' >
      {!isdata && (<div className='flex justify-center my-10'>
        Loading Data ...
      </div>)}
      {/* Render the EditSocial component */}
      {isdata && (<>
        <EditSocial socialLinks={socialLinks} onSave={handleSaveSocialLinks} />
        <EditHome homeData={homeData}
          onSave={handleSaveHome}
          onCancel={handleCancelHome}
          isEditing={isEditingHome} />

        <EditAbout
          aboutData={aboutData}
          onSave={saveAboutMe}
          onCancel={cancelEditAbout}
          isEditing={isEditingAbout}
        />

        <EditProject
          projects={projectsData}
          addProject={addProject}
          updateProject={updateProject}
          deleteProject={deleteProject}
        />
        <EditArticles />
      </>)}


    </div>
  );
}

export default Dashboard;
