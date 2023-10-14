// pages/dashboard.js
import React, { useState } from 'react';
import EditProject from '../components/EditProjects';
import KiranPortfolioData from '../assets/portfolioData.js';
import EditAbout from '../components/EditAbout';
// import EditSkills from '../components/EditSkills';
import EditHome from '../components/EditHome';
import EditArticles from '../components/EditArticles';
import EditSocial from "../components/EditSocial";


const Dashboard = () => {
  const [projectsData, setProjectsData] = useState(KiranPortfolioData.Projects.projectData);
  const [aboutData, setAboutData] = useState(KiranPortfolioData.About.aboutPageData.aboutData);
  const [homeData, setHomeData] = useState(KiranPortfolioData.Home.homeData);
  const [socialLinks, setSocialLinks] = useState(KiranPortfolioData.SocialLinks);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [skills, setSkills] = useState([...aboutData.skills]);
  const [isEditingHome, setIsEditingHome] = useState(false);



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
  
  return (
    <div className='mb-20'>

<button onClick={handleOpenEditModal}>Edit Social Links</button>

{/* Render the EditSocial component */}
<EditSocial socialLinks={socialLinks} onSave={handleSaveSocialLinks} />
      <EditHome homeData={homeData}
        onSave={handleSaveHome}
        onCancel={handleCancelHome}
        isEditing={isEditingHome}   />

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
      <EditArticles/>

      
    </div>
  );
}

export default Dashboard;
