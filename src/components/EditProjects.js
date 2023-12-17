// components/EditProjects.js
import React, { useState, useEffect } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import Modal from "react-modal";
import {
  FiSave,
  FiEdit,
  FiTrash,
  FiChevronUp,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi"; // Updated icon imports
import { BiAddToQueue } from "react-icons/bi";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import {
  useProjectData,
  useData
} from "../context/DashboardDataProvider";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { getCurrentUserId } from "../services/firebaseConfig.js";

// Dropdown component to display project details
const ProjectDetailsDropdown = ({ project }) => {
  const [close, setClose] = useState(false);

  return (
    <AnimatePresence>
      {project && (
        <motion.div initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className='grid sm:text-sm text-black dark:text-white grid-cols-12 mt-1 rounded p-2 ml-4 overflow-hidden'
        >
          <div className='col-span-9 sm:col-span-12'>
            {/* Project Type */}
            <div className='mb-2'>
              <h4 className='font-semibold'>Type</h4>
              <p className='text-black dark:text-gray-300'>{project.type}</p>
            </div>

            {/* Project Summary */}
            <div>
              <h4 className='font-semibold'>Summary</h4>
              <p className='text-black dark:text-gray-300'>
                {project.summary}
              </p>
            </div>

            {/* Preview (Hidden in small screens) */}
            <div className='hidden sm:flex flex-col'>
              <h4 className='font-semibold'>Preview</h4>
              <a
                href={project.img}
                target='_blank'
                rel='noopener noreferrer'
                className='text-indigo-600 hover:underline'
              >
                <LinesEllipsis
                  text={project.img}
                  maxLine={1}
                  ellipsis='....'
                  trimRight
                  basedOn='letters'
                  className='text-indigo-600 hover:underline'
                />
              </a>
            </div>

            {/* Link */}
            <div className='mb-2'>
              <h4 className='font-semibold'>Link</h4>
              <a
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='text-indigo-600 hover:underline'
              >
                {project.link}
              </a>
            </div>

            {/* GitHub Link */}
            <div className='mb-2'>
              <h4 className='font-semibold'>GitHub</h4>
              <a
                href={project.github}
                target='_blank'
                rel='noopener noreferrer'
                className='text-indigo-600 hover:underline'
              >
                {project.github}
              </a>
            </div>
          </div>

          {/* Project Image (Hidden in larger screens) */}
          <div className='col-span-3 sm:hidden sm:col-span-12 flex flex-col items-center justify-center w-full h-auto'>
            <div className='p-1 sm:p-[2px] xs:border border-[0.5px] w-full border-primary rounded '>
              <img
                src={project.img}
                alt={project.title}
                className='w-full h-auto'
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Modal component for editing/add new project
const ProjectFormModal = ({
  isOpen,
  closeModal,
  project,
  onSave,
  editing,
}) => {
  const [formData, setFormData] = useState({ ...project });
  const [title, setTitle] = useState(project.title);

  console.log("add new: ", formData);

  const handleSave = () => {
    console.log(`modal save project: ${JSON.stringify(formData)}`);
    onSave(formData, title);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className='modal fixed inset-0 flex items-center justify-center z-50'
      overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
    >
      <div className='bg-white text-gray-600 w-full max-w-[1080px] mx-10 sm:w-96 p-4 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>
          {editing ? "Edit Project" : "Add New Project"}
        </h2>
        <div className='space-y-4'>
          {/* Project Type */}
          <div>
            <label className='text-gray-600'>Type</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              placeholder='Type'
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            />
          </div>

          {/* Project Title */}
          <div>
            <label className='text-gray-600'>Title</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              placeholder='Title'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Image URL */}
          <div>
            <label className='text-gray-600'>Image URL</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              placeholder='Image URL'
              value={formData.img}
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.value })
              }
            />
          </div>

          {/* Link */}
          <div>
            <label className='text-gray-600'>Link</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              placeholder='Link'
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className='text-gray-600'>GitHub URL</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              placeholder='GitHub URL'
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
            />
          </div>

          {/* Summary */}
          <div>
            <label className='text-gray-600'>Summary</label>
            <textarea
              className='block w-full h-24 py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              placeholder='Summary'
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <div className='flex justify-between'>
            <button
              className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
              onClick={() => {
                handleSave(), closeModal();
              }}
            >
              <span>{editing ? "Save" : "Add"}</span>
            </button>

            <button
              className='flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition'
              onClick={closeModal}
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Main EditProject component
const EditProject = () => {
  const projects = useProjectData();
  const data = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [close, setClose] = useState(false);
  const [portfolio, setPortfolio] = useState({ ...data });
  const [formData, setFormData] = useState([...projects]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectTemp, setProjectTemp] = useState({
    img: "https://example.com/your-image.jpg",
    github: "https://github.com/yourusername/your-repo",
    title: "Your Project Title",
    link: "https://your-deployed-project-link.com",
    type: "Project techStack",
    summary: "A brief summary of your project."
  });

  const updateData = () => {
    setPortfolio({ ...portfolio, Projects: { projectData: [...formData] } });
    console.log("portfolio updated data 🪠🪠 : ", portfolio);
  };

  // ------------------ binary modes --------------------------------
  const openModal = () => {
    setIsModalOpen(true);
    console.log("selected project : ", selectedProject);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setAddModal(true);
  };

  const closeAddModal = () => {
    setAddModal(false);
  };

  //  ---------------- handlers -------------------------
  const handleSave = (updatedProj, title) => {
    console.log("title : ", title, updatedProj);
    const updatedProjects = [...formData];
    const index = updatedProjects.findIndex((project) => project.title === title);

    if (index !== -1) {
      updatedProjects[index] = { ...updatedProj };
      setFormData([...updatedProjects]);
    }
    console.log(`updated Edit : ` + updatedProjects);
    setEditing(false);
    updateData();
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    console.log("selected edit project : ", selectedProject);
    setEditing(true);
    openModal();
  };

  const handleDeleteProject = (title) => {
    const updatedProjects = formData.filter(
      (prj) => prj.title !== title
    );
    setFormData(updatedProjects);
    updateData();
  };

  const addNewProject = (newProj) => {
    setFormData([...formData, newProj]);
    updateData();
    console.log("new project is added : " + newProj);
  };

  // ------------------------- firebase data updating ------------------------------
  const documentId = getCurrentUserId();
  console.log("current Project Id ⭕⭕⭕ user is : ", documentId);
  const db = getFirestore();
  if (documentId) {
    var userPortfolioRef = doc(db, 'User_portfolio_data', documentId);
  } else {
    console.log("current user id not found!")
  }

  useEffect(() => {
    updateData();
    setPortfolio({ ...portfolio, Projects: { projectData: [...formData] } });
    console.log("portfolio updated for Firebase 🌨️🌨️ :", portfolio);

    // Update the document in Firestore
    updateDoc(userPortfolioRef, portfolio)
      .then(() => {
        console.log('Project data updated successfully 🌨️🌨️🌨️.');
      })
      .catch((error) => {
        console.error('Error updating Project data:', error);
      });
  }, [formData, documentId]);

  useEffect(() => {
    getDoc(userPortfolioRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setPortfolioData(snapshot.data());
        } else {
          console.error('Portfolio data not found for document ID:', documentId);
        }
      })
      .catch((error) => {
        console.error('Error loading portfolio data:', error);
      });
  }, [documentId, userPortfolioRef]);

  return (
    <div className='w-screen mb-5 font-mono flex  flex-col '>
      <div className='w-full flex justify-between items-center  text-white p-4'>
        <h2 className='text-xl sm:text-base px-3 py-1 flex  items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold'>
          <span class=' cursor-pointer'>Data</span>
          <span className='w-[2px] h-[80%] bg-gray-500 mx-1' />| Edit Projects
          <FiChevronRight />
        </h2>
        <h2
          className='text-4xl mr-10 sm:mr-0 sm:text-2xl p-2  items-center gap-1 rounded-full   text-yellow-500  font-semibold'
          onClick={openAddModal}
        >
          <BiAddToQueue />
        </h2>
        {addModal && (
          <ProjectFormModal
            key={projectTemp.title}
            isOpen={addModal}
            closeModal={closeAddModal}
            project={projectTemp}
            editing={editing}
            onSave={(data, title) => addNewProject(data, title)}
          />
        )}
      </div>
      <div className='flex-grow p-4 overflow-y-auto text-black  dark:text-white'>
        <ul className='space-y-4'>
          {formData.map((project) => (
            <li
              key={project.title}
              className='bg-transparent border-2 border-gray-600 p-2 rounded-lg'
            >
              <div
                className='flex items-center justify-between cursor-pointer '
                onClick={() => {
                  setSelectedProject(project), setClose(!close);
                }}
              >
                <strong className='cursor-pointer ml-1 font-extrabold'>
                  {project.title}
                </strong>
                <div className='flex gap-2 '>
                  <button onClick={() => handleEdit(project)}>
                    <BsPencilSquare />
                  </button>
                  <button onClick={() => handleDeleteProject(project.title)}>
                    <BsTrash />
                  </button>
                  <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                    {project == selectedProject && close ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
                </div>
              </div>
              {project == selectedProject ? (
                <ProjectFormModal
                  key={selectedProject.title}
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                  project={selectedProject}
                  editing={editing}
                  onSave={(data, title) => handleSave(data, title)}
                />) : ""}
              {project == selectedProject && close && (
                <div>
                  <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />

                  <ProjectDetailsDropdown project={selectedProject} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditProject;


