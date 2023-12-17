import React, { useState } from 'react';
import Modal from 'react-modal';
import LinesEllipsis from "react-lines-ellipsis";
import { FiEdit2, FiTrash2, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const EditArticle = ({ articleData, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [title, setTitle] = useState(articleData.title)
  const [formData, setFormData] = useState({ ...articleData });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    onSave(formData,title);
    closeModal();
  };

  const handleDelete = () => {
    onDelete(formData.title);
    closeModal();
  };

  return (
    <div className="font-mono">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.7 }}
          className="m-3 font-extrabold bg-transparent border-2 border-gray-600 p-2 rounded-lg text-black dark:text-white shadow-lg flex items-center justify-between overflow-hidden"
          onClick={()=>{setShowDetails(!showDetails)}}
        >
          <div className="w-full grid grid-flow-row grid-cols-12 sm:text-xs">
            <h3 className="font-semibold col-span-9 "><LinesEllipsis
                  text={articleData.title}
                  maxLine={1}
                  ellipsis='...'
                  trimRight
                  basedOn='letters'
                /></h3>
            <p className="sm:hidden col-span-2 sm:col-span-0">{`${articleData.time?articleData.time:articleData.date}`}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={openModal}
              className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
            >
              <FiEdit2 />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-800 focus:outline-none"
            >
              <FiTrash2 />
            </button>
            <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
              {showDetails ? (
                <FiChevronUp />
              ) : (
                <FiChevronDown />
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
      {showDetails && (
        <div className="mx-3 mb-3 sm:text-xs bg-transparent  border-b-2 border-x-2 border-gray-600 p-2 px-4 rounded-b-lg shadow-lg overflow-hidden ">
          {articleData.summary && <><h4 className="font-semibold">Summary</h4><p>{articleData.summary}</p></>}
          <h4 className="font-semibold">Time</h4>
          <p>{`${articleData.time?articleData.time:articleData.date}`}</p>
          <h4 className="font-semibold">Image </h4>
          <a
                href={articleData.img}
                target='_blank'
                rel='noopener noreferrer'
                className='text-indigo-600 hover:underline'
              >
                <LinesEllipsis
                  text={articleData.img}
                  maxLine={1}
                  ellipsis='...'
                  trimRight
                  basedOn='letters'
                />
              </a>
          <h4 className="font-semibold">Link</h4>
          <a
            href={articleData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            {articleData.link}
          </a>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal fixed inset-0 p-2 w-full flex items-center justify-center z-50"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white w-full max-w-[530px] p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Edit Article</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600">Title</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-600">Summary</label>
              <textarea
                className="block w-full h-24 py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-600">Time</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-600">Link</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              <span>Save</span>
            </button>
            <button
              onClick={closeModal}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition"
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditArticle;
