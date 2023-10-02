// pages/dashboard.js
import React, { useState } from 'react';
import EditProject from '../components/EditProjects';
import KiranPortfolioData from '../assets/portfolioData.js';
import EditAbout from '../components/EditAbout';
import EditSkills from '../components/EditSkills';
const Dashboard = () => {
  const [projectsData, setProjectsData] = useState(KiranPortfolioData.Projects.projectData);
  const [aboutData, setAboutData] = useState(KiranPortfolioData.About.aboutPageData.aboutData);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [skills, setSkills] = useState([...aboutData.skills]);

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
  const handleSaveSkill = (updatedSkill) => {
    // Implement the logic to save the skill
    // You can update the 'skills' state with the new skill data
    const updatedSkills = skills.map((skill) =>
      skill.name === updatedSkill.name ? updatedSkill : skill
    );
    setSkills(updatedSkills);
  };

  const handleDeleteSkill = (skillName) => {
    // Implement the logic to delete the skill
    // You can remove the skill from the 'skills' state
    const updatedSkills = skills.filter((skill) => skill.name !== skillName);
    setSkills(updatedSkills);
  };
  return (
    <div>
      <EditAbout
        aboutData={aboutData}
        onSave={saveAboutMe}
        onCancel={cancelEditAbout}
        isEditing={isEditingAbout}
      />
       {skills.map((skill, index) => (
        <EditSkills
          key={index}
          skillsData={skill}
          onSave={handleSaveSkill}
          onDelete={handleDeleteSkill}
        />
      ))}
      <EditProject
        projects={projectsData}
        addProject={addProject}
        updateProject={updateProject}
        deleteProject={deleteProject}
      />
    </div>
  );
}

export default Dashboard;
