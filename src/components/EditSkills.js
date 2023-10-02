import React, { useState } from 'react';
import Modal from 'react-modal';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const EditSkills = ({ skillsData, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ ...skillsData });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    onSave(formData);
    closeModal();
  };

  const handleDelete = () => {
    onDelete(formData.name);
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
          className=" m-3 font-extrabold bg-transparent border-2 border-gray-600 p-2 rounded-lg  text-white shadow-lg  flex items-center justify-between  overflow-hidden"
        >
      {/* <div className=" m-3 font-extrabold bg-transparent border-2 border-gray-600 p-2 rounded-lg  text-white shadow-lg  flex items-center justify-between"> */}
        <div className="w-full grid grid-flow-row grid-cols-12 sm:text-xs ">
          <h3 className="font-semibold col-span-5">{skillsData.name}</h3>
          <p className=" col-span-3">{`X: ${skillsData.x}`}</p>
          <p className=" col-span-3">{`Y: ${skillsData.y}`}</p>
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
        </div>
      {/* </div> */}
      </motion.div>
    </AnimatePresence>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal fixed inset-0  p-2 w-full  flex items-center justify-center z-50"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white w-full max-w-[530px] p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Edit Skill</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600">Skill Name</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Skill Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-600">X Position</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="X Position"
                value={formData.x}
                onChange={(e) => setFormData({ ...formData, x: e.target.value })}
              />
            </div>
            <div>
              <label className="text-gray-600">Y Position</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Y Position"
                value={formData.y}
                onChange={(e) => setFormData({ ...formData, y: e.target.value })}
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

export default EditSkills;
