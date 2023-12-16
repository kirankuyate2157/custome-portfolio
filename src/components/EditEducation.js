import React, { useState } from 'react';
import Modal from 'react-modal';
import { FiEdit2, FiTrash2, FiChevronUp, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const EditEducation = ({ educationData, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [type,setType] = useState(educationData.type);
  const [formData, setFormData] = useState({ ...educationData });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleSave = () => {
    onSave(formData,type);
    closeModal();
  };

  const handleDelete = () => {
    onDelete(type);
    console.log(`deleting...  ${type}`)
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
          className="m-3 font-extrabold bg-transparent border-2 border-gray-600 p-2 rounded-lg text-white shadow-lg flex items-center justify-between overflow-hidden"
          onClick={toggleDetails}
        >
          <div className="w-full grid grid-flow-row grid-cols-12 sm:text-xs">
            <h3 className="font-semibold col-span-5 sm:col-span-8">{educationData.type}</h3>
            <p className="sm:hidden col-span-3 sm:col-span-0">{educationData.time}</p>
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
        <div className="mx-3 mb-3 sm:text-xs bg-transparent  border-b-2 border-x-2 border-gray-600 p-2 px-4 rounded-b-lg shadow-lg overflow-hidden">
          <h4 className="font-semibold">Time</h4>
          <p>{educationData.time}</p>
          <h4 className="font-semibold">Place</h4>
          <p>{educationData.place}</p>
          <h4 className="font-semibold">Info</h4>
          <p>{educationData.info}</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal fixed inset-0 p-2 w-full flex items-center justify-center z-50"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white w-full max-w-[530px] p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Edit Education</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600">Type</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
              <label className="text-gray-600">Place</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Place"
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-600">Info</label>
              <textarea
                className="block w-full h-24 py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Info"
                value={formData.info}
                onChange={(e) => setFormData({ ...formData, info: e.target.value })}
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

export default EditEducation;
