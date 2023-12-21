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
import { VscFolderActive } from "react-icons/vsc";
import { TbCloudCheck } from "react-icons/tb";

import { useProjectData, useData } from "../context/DashboardDataProvider";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getCurrentUserId } from "../services/firebaseConfig.js";
import { FiUpload, FiFolder } from "react-icons/fi";
import { uploadFile } from "@/services/firebaseConfig.js";
import Notification from "./Notification";

// Dropdown component to display project details

const ProjectDetailsDropdown = ({ project }) => {
  const [close, setClose] = useState(false);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className='grid sm:text-sm text-black dark:text-white grid-cols-12 mt-1  rounded p-2 ml-4 overflow-hidden'
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
              <p className='text-black dark:text-gray-300'>{project.summary}</p>
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
const ProjectFormModal = ({ isOpen, closeModal, project, onSave, editing }) => {
  const [formData, setFormData] = useState({ ...project });
  const [title, setTitle] = useState(project.title);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ",
    type: "warn",
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      // console.log("updating..img data ")
      setImage(e.target.files[0]);
    }
  };
  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  const showNotificationMsg = () => {
    setShowNotification(true);
  };

  const handleSave = () => {
    // Check if any form field is empty
    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => !value || value.trim() === ""
    );

    // Show warning notification if any field is empty
    if (isAnyFieldEmpty) {
      setNoteMsg({ message: "Please fill in all form fields", type: "warn" });
      showNotificationMsg();
    } else {
      onSave(formData, title);
      closeModal();
    }
  };

  const handleImgUpload = async () => {
    if (!image) {
      setNoteMsg({ message: "Image is not selected 🫠", type: "warn" });
      showNotificationMsg();

      return;
    }

    const path = "test";
    const imageName = image.name;

    try {
      const url = await uploadFile(image, path, imageName);
      setImageUrl(url);
      setFormData((prevData) => ({ ...prevData, img: url })); // Update using previous state
      setUploadError(null);
    } catch (error) {
      console.log("Error uploading ", error);
      setUploadError("File upload failed. Please try again.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className='modal fixed inset-0 flex my-2 items-center justify-center z-50'
      overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
    >
      <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300 w-full sm:w-96 p-4 px-8 max-w-[800px] mx-10 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>
          {editing ? "Edit Project" : "Add New Project"}
        </h2>
        <div className='space-y-4'>
          {/* Project Type */}
          <div>
            <label className='text-gray-600 dark:text-gray-300'>Type</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              placeholder='Type'
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            />
          </div>

          {/* Project Title */}
          <div>
            <label className='text-gray-600 dark:text-gray-300'>Title</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              placeholder='Title'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Image URL */}

          <div className='relative'>
            <label className='text-gray-600 dark:text-gray-300'>
              Image Url
            </label>
            <div className='flex items-center border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600'>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Image URL'
                value={formData.img}
                onChange={(e) =>
                  setFormData({ ...formData, img: e.target.value })
                }
              />
              <div className='flex-shrink-0 flex items-center px-1 gap-2 space-x-2'>
                <label
                  htmlFor='fileInput'
                  className='cursor-pointer text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-900 rounded p-1'
                  onClick={handleImgUpload}
                >
                  {imageUrl ? <TbCloudCheck /> : <FiUpload />}
                </label>

                <label htmlFor='fileInput1' className=' cursor-pointer'>
                  <div className='text-green-500 hover:bg-green-200 dark:hover:bg-green-900 rounded p-1'>
                    {image ? <VscFolderActive /> : <FiFolder />}
                  </div>
                  <input
                    id='fileInput1'
                    type='file'
                    className='hidden'
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Link */}
          <div>
            <label className='text-gray-600 dark:text-gray-300'>Link</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              placeholder='Link'
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className='text-gray-600 dark:text-gray-300'>
              GitHub URL
            </label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              placeholder='GitHub URL'
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
            />
          </div>

          {/* Summary */}
          <div>
            <label className='text-gray-600 dark:text-gray-300'>Summary</label>
            <textarea
              className='block w-full h-20 py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              placeholder='Summary'
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
            />
          </div>

          {/* Buttons */}
          <div className='flex justify-end mt-4 gap-3 px-2'>
            <button
              className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
              onClick={() => {
                handleSave();
              }}
            >
              <span>{editing ? "Save" : "Add"}</span>
            </button>

            <button
              className='flex items-center space-x-2 px-4 py-2 bg-gray-300 text-gray-600  rounded-md hover:bg-gray-400 transition'
              onClick={closeModal}
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
      {showNotification && (
        <Notification
          message={noteMsg.message}
          type={noteMsg.type}
          onClose={handleNotificationClose}
        />
      )}
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
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ",
    type: "warn",
  });
  const [projectTemp, setProjectTemp] = useState({
    img: "https://example.com/your-image.jpg",
    github: "https://github.com/yourusername/your-repo",
    title: "Your Project Title",
    link: "https://your-deployed-project-link.com",
    type: "Project techStack",
    summary: "A brief summary of your project.",
  });

  const updateData = () => {
    setPortfolio({ ...portfolio, Projects: { projectData: [...formData] } });
    // console.log("portfolio updated data 🪠🪠 : ", portfolio);
  };

  // ------------------ binary modes --------------------------------
  const openModal = () => {
    setIsModalOpen(true);
    // console.log("selected project : ", selectedProject);
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

  const notifySave = () => {
    setNoteMsg({ message: "Project data is saved 📝 ", type: "done" });
    setShowNotification(true);
  };
  const notifyDelete = () => {
    setNoteMsg({ message: "Project data is deleted 🗑️🧹 ", type: "dengues" });
    setShowNotification(true);
  };

  //  ---------------- handlers -------------------------
  const handleSave = (updatedProj, title) => {
    // console.log("title : ", title, updatedProj);
    const updatedProjects = [...formData];
    const index = updatedProjects.findIndex(
      (project) => project.title === title
    );

    if (index !== -1) {
      updatedProjects[index] = { ...updatedProj };
      setFormData([...updatedProjects]);
    }
    // console.log(`updated Edit : ` + updatedProjects);
    setEditing(false);
    updateData();
    notifySave();
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    // console.log("selected edit project : ", selectedProject);
    setEditing(true);
    openModal();
  };

  const handleDeleteProject = (title) => {
    const updatedProjects = formData.filter((prj) => prj.title !== title);
    setFormData(updatedProjects);
    updateData();
    notifyDelete();
  };

  const addNewProject = (newProj) => {
    setFormData([...formData, newProj]);
    updateData();
    notifySave();
    // console.log("new project is added : " + newProj);
  };

  // ------------------------- firebase data updating ------------------------------
  const documentId = getCurrentUserId();
  // console.log("current Project Id ⭕⭕⭕ user is : ", documentId);
  const db = getFirestore();
  if (documentId) {
    var userPortfolioRef = doc(db, "User_portfolio_data", documentId);
  } else {
    console.log("current user id not found!");
  }

  useEffect(() => {
    updateData();
    setPortfolio({ ...portfolio, Projects: { projectData: [...formData] } });
    // console.log("portfolio updated for Firebase 🌨️🌨️ :", portfolio);

    // Update the document in Firestore
    updateDoc(userPortfolioRef, portfolio)
      .then(() => {
        console.log("Project data updated successfully 🌨️🌨️🌨️.");
      })
      .catch((error) => {
        console.error("Error updating Project data:", error);
      });
  }, [formData, documentId]);

  // useEffect(() => {
  //   getDoc(userPortfolioRef)
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setPortfolioData(snapshot.data());
  //       } else {
  //         console.error('Portfolio data not found for document ID:', documentId);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error loading portfolio data:', error);
  //     });
  // }, [documentId, userPortfolioRef]);

  return (
    <div className='w-screen mb-5 font-mono flex  flex-col '>
      <div className='w-full flex justify-between items-center  text-white p-4'>
        <h2 className='text-xl sm:text-base px-3 py-1 flex  items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold'>
          <span class=' cursor-pointer'>Data</span>
          <span className='w-[2px] h-[80%] bg-gray-500 mx-1' />| Edit Projects
          <FiChevronRight />
        </h2>
        <h2
          className='text-4xl mr-10 sm:mr-0 sm:text-2xl p-2  items-center gap-1 rounded-full   text-pink-500 font-semibold'
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
              className='bg-transparent border-2 border-gray-600 p-2  rounded-lg'
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
                />
              ) : (
                ""
              )}
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
      {showNotification && (
        <Notification
          message={noteMsg.message}
          type={noteMsg.type}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default EditProject;
