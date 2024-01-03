import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notification";

const EditStatistics = ({ statisticsData, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [label, setLabel] = useState(statisticsData.label);
  const [formData, setFormData] = useState({ ...statisticsData });
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ",
    type: "warn",
  });

  // --------------binary mode  ------------------

  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  const showNotificationMsg = () => {
    setShowNotification(true);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ----------- handler ---------------------

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
      onSave(formData, label);
      closeModal();
    }
  };

  const handleDelete = () => {
    onDelete(formData.label);
    closeModal();
  };

  return (
    <div className='font-mono'>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.7 }}
          className='m-3 font-extrabold bg-transparent border-2 border-gray-600 p-2 rounded-lg text-gray-800 dark:text-white shadow-lg flex items-center justify-between overflow-hidden'
        >
          <div className='w-full grid grid-flow-row grid-cols-12 sm:text-xs'>
            <h3 className='font-semibold col-span-8'>{formData.label}</h3>
            <p className='col-span-3'>{`Value: ${formData.value}`}</p>
          </div>
          <div className='flex items-center space-x-2'>
            <button
              onClick={openModal}
              className='dark:text-white text-black focus:outline-none'
            >
              <BsPencilSquare />
            </button>
            {/* <button
              onClick={handleDelete}
              className='text-red-600 hover:text-red-800 focus:outline-none'
            >
              <FiTrash2 />
            </button> */}
          </div>
        </motion.div>
      </AnimatePresence>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className='modal fixed inset-0 p-2 w-full flex items-center justify-center z-50'
        overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
      >
        <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300 w-full sm:w-96 p-6 px-8  max-w-[530px] mx-10 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Edit Statistic</h2>
          <p className='text-[0.7rem] text-orange-400'>
            Put Numbers in value field only{" "}
          </p>
          <div className='space-y-4'>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>Label</label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Label'
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
              />
            </div>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>Value</label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Value'
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
              />
            </div>
          </div>
          <div className='flex justify-end mt-4 gap-3 px-2'>
            <button
              onClick={handleSave}
              className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
            >
              <span>Save</span>
            </button>
            <button
              onClick={closeModal}
              className='flex items-center space-x-2 px-4 py-2 bg-gray-300 text-gray-600  rounded-md hover:bg-gray-400 transition'
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
        {showNotification && (
          <Notification
            message={noteMsg.message}
            type={noteMsg.type}
            onClose={() => {
              handleNotificationClose();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default EditStatistics;
