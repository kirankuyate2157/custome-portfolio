// components/EditProjects.js
import React, { useState } from "react";
import { FiSave, FiEdit, FiTrash } from "react-icons/fi"; // Updated icon imports
import classNames from "classnames";

const EditProject = ({
  projects,
  addProject,
  updateProject,
  deleteProject,
}) => {
  const [editing, setEditing] = useState(false);
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

  const handleDelete = (projectTitle) => {
    // Delete project
    deleteProject(projectTitle);
  };
  return (
    <div className='max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold mb-4'>Edit Projects</h2>
      <ul>
        {projects.map((project, index) => (
          <li
            key={index}
            className='mb-4 border-b pb-4 flex items-center justify-between'
          >
            <div>
              <strong className='text-lg font-semibold'>{project.title}</strong>
              <p className='text-gray-600'>{project.summary}</p>
            </div>
            <div className='space-x-2'>
              <button
                onClick={() => handleEdit(project)}
                className='text-indigo-500 hover:text-indigo-700 transition'
              >
                <FiTrash className='inline-block text-xl' /> Edit
              </button>
              <button
                onClick={() => handleDelete(project.title)}
                className='text-red-500 hover:text-red-700 transition'
              >
                <FiTrash className='inline-block text-xl' /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className='text-xl font-semibold mt-6 mb-4'>
        {editing ? "Edit Project" : "Add New Project"}
      </h3>
      <div className='space-y-4'>
        <div className='relative'>
          <label className='text-gray-600'>Type</label>
          <select
            className='block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value=''>Select Type</option>
            <option value='MERN Project'>MERN Project</option>
            <option value='Python Project'>Python Project</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div>
          <label className='text-gray-600'>Title</label>
          <input
            type='text'
            className='block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
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
            className='block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder='Image URL'
            value={formData.img}
            onChange={(e) => setFormData({ ...formData, img: e.target.value })}
          />
        </div>
        <div>
          <label className='text-gray-600'>Link</label>
          <input
            type='text'
            className='block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder='Link'
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
        </div>
        <div>
          <label className='text-gray-600'>GitHub URL</label>
          <input
            type='text'
            className='block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
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
            className='block w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            placeholder='Summary'
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
          />
        </div>
        <button
          className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
          onClick={handleSave}
        >
          <FiSave /> <span>{editing ? "Save" : "Add"}</span>
        </button>
      </div>
    </div>
  );
};

export default EditProject;
