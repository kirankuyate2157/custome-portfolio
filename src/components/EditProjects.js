// components/EditProjects.js
import React, { useState } from "react";
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
          className='grid sm:text-sm text-black  dark:text-white grid-cols-12  mt-1 rounded p-2 ml-4  overflow-hidden'
        >
          <div className='col-span-9 sm:col-span-12'>
            <div className='mb-2'>
              <h4 className='font-semibold'>Type</h4>
              <p className='text-black  dark:text-gray-300'>{project.type}</p>
            </div>

            <div>
              <h4 className='font-semibold '>Summary</h4>
              <p className='text-black  dark:text-gray-300'>
                {project.summary}
              </p>
            </div>
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
                  // onClick={() => setShowFullText(!showFullText)}
                />
              </a>
            </div>
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
          <div className='col-span-3 sm:hidden sm:col-span-12 flex flex-col items-center justify-center w-full h-auto'>
            {/* <h4 className='font-semibold'>preview</h4> */}
            {/* <hr className='my-1' /> */}
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

const ProjectFormModal = ({
  isOpen,
  closeModal,
  formData,
  setFormData,
  handleSave,
  editing,
  projectTypes,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className='modal fixed inset-0 flex items-center justify-center z-50'
      overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
    >
      <div className='bg-white w-full sm:w-96 p-4 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>
          {editing ? "Edit Project" : "Add New Project"}
        </h2>
        <div className='space-y-4'>
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
          <div className='flex justify-between'>
            <button
              className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
              onClick={() => {
                handleSave(); closeModal();
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

const EditProject = ({
  projects,
  addProject,
  updateProject,
  deleteProject,
}) => {
  const [editing, setEditing] = useState(false);
  const [close, setClose] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    img: "",
    link: "",
    github: "",
    summary: "",
  });

  const handleEdit = (project) => {
    setEditing(true);
    setFormData({
      type: project.type,
      title: project.title,
      img: project.img,
      link: project.link,
      github: project.github,
      summary: project.summary,
    });
  };

  const handleSave = () => {
    if (editing) {
      // Update project
      updateProject(formData);
    } else {
      // Add new project
      addProject(formData);
    }
    setEditing(false);
    setFormData({
      type: "",
      title: "",
      img: "",
      link: "",
      github: "",
      summary: "",
    });
  };
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  // Function to open the form modal
  const openFormModal = () => {
    setIsFormModalOpen(true);
  };

  // Function to close the form modal
  const closeFormModal = () => {
    setIsFormModalOpen(false);
  };

  const handleDelete = (projectTitle) => {
    // Delete project
    deleteProject(projectTitle);
  };
  const [selectedProject, setSelectedProject] = useState(null);

  const handleTitleClick = (project) => {
    setSelectedProject(project === selectedProject ? null : project);
  };

  return (
    <div className='w-screen h-screen font-mono flex  flex-col '>
      <div className='w-full flex justify-between items-center  text-white p-4'>
        <h2 className='text-xl sm:text-base px-3 py-1 flex  items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold'>
          <span class=' cursor-pointer'>Data</span>
          <span className='w-[2px] h-[80%] bg-gray-500 mx-1' />| Edit Projects
          <FiChevronRight />
        </h2>
        <h2
          className='text-4xl mr-10 sm:mr-0 sm:text-2xl p-2  items-center gap-1 rounded-full   text-pink-500  font-semibold'
          onClick={() => {
            setIsFormModalOpen(!isFormModalOpen);
          }}
        >
          <BiAddToQueue />
        </h2>
      </div>
      <div className='flex-grow p-4 overflow-y-auto text-black  dark:text-white'>
        <ul className='space-y-4'>
          {projects.map((project, index) => (
            <li
              key={index}
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
                  <button onClick={() => handleDelete(project.title)}>
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
      
      <ProjectFormModal
        isOpen={isFormModalOpen}
        closeModal={closeFormModal}
        formData={formData}
        setFormData={setFormData}
        handleSave={handleSave}
        editing={editing}
      />
    </div>
  );
};

export default EditProject;
