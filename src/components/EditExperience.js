import React, { useState } from 'react';
import Modal from 'react-modal';
import { FiEdit2, FiTrash2, FiChevronUp, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const EditExperience = ({ experienceData, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [formData, setFormData] = useState({ ...experienceData });

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
    onSave(formData);
    closeModal();
  };

  const handleDelete = () => {
    onDelete(formData.position);
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
            <h3 className="font-semibold col-span-5 sm:col-span-8">{experienceData.position}</h3>
            <p className="sm:hidden col-span-3 sm:col-span-0">{experienceData.time}</p>
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
                    { showDetails  ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
          </div>
        </motion.div>
      </AnimatePresence>
      {showDetails && (
        <div className="mx-3 mb-3 sm:text-xs bg-transparent  border-b-2 border-x-2 border-gray-600 p-2 px-4 rounded-b-lg shadow-lg   overflow-hidden ">
          <h4 className="font-semibold">Company</h4>
          <p>{experienceData.company}</p>
          <h4 className="font-semibold">Company Link</h4>
          <a
            href={experienceData.companyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            {experienceData.companyLink}
          </a>
          <h4 className="font-semibold">Address</h4>
          <p>{experienceData.address}</p>
          <h4 className="font-semibold">Work</h4>
          <p>{experienceData.work}</p>
        </div>
      )}

      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal fixed inset-0 p-2 w-full flex items-center justify-center z-50"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white w-full max-w-[530px] p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Edit Experience</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600">Position</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-600">Company</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-600">Company Link</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Company Link"
                value={formData.companyLink}
                onChange={(e) => setFormData({ ...formData, companyLink: e.target.value })}
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
              <label className="text-gray-600">Address</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-600">Work</label>
              <textarea
                className="block w-full h-24 py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Work"
                value={formData.work}
                onChange={(e) => setFormData({ ...formData, work: e.target.value })}
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

export default EditExperience;
