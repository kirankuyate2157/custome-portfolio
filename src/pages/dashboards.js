// pages/dashboard.js
import React from "react";
import EditProject from "../components/EditProjects";
import KiranPortfolioData from "../assets/portfolioData.js";

const dashboard = () => {
  // Sample projects data (you should load this from your data source)
  const projectsData = KiranPortfolioData.Projects.projectData;

  // Function to add a new project
  const addProject = (project) => {
    // Implement the logic to add a new project to your data structure
    KiranPortfolioData.Projects.projectData.push(project);
  };

  // Function to update an existing project
  const updateProject = (updatedProject) => {
    // Implement the logic to update a project in your data structure
    const index = projectsData.findIndex(
      (project) => project.title === updatedProject.title
    );
    if (index !== -1) {
      projectsData[index] = updatedProject;
    }
  };

  // Function to delete a project
  const deleteProject = (projectTitle) => {
    // Implement the logic to delete a project from your data structure
    const index = projectsData.findIndex(
      (project) => project.title === projectTitle
    );
    if (index !== -1) {
      projectsData.splice(index, 1);
    }
  };

  return (
    <div>
      <EditProject
        projects={projectsData}
        addProject={addProject}
        updateProject={updateProject}
        deleteProject={deleteProject}
      />
    </div>
  );
};

export default dashboard;
