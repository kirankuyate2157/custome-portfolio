import React, { useState } from "react";
import Modal from "react-modal";
import {
  FiEdit2,
  FiTrash2,
  FiChevronUp,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notification";

const AddEducation = ({ onSave, isModalOpen, closeModal }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ",
    type: "warn",
  });
  const [formData, setFormData] = useState({
    place: "XYZ College or University",
    info: "Currently pursuing or Completed a Bachelor's degree in Computer Science form XYZ college or University, And Marks or CGPA ...more",
    time: "Dec 2020 - Present",
    type: "B.Tech Computer Science",
  });

  // --------------Binary Mode ----------------
  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  const showNotificationMsg = () => {
    setShowNotification(true);
  };
  // --------------handlers -----------------
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
      onSave(formData);
      closeModal();
    }
  };

  return (
    <div className='font-mono'>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className='modal fixed inset-0 p-2 w-full flex items-center justify-center z-50'
        overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
      >
        <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300 w-full sm:w-96 p-6 px-8 max-w-[700px] mx-10 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Edit Education</h2>
          <div className='space-y-4'>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>Course</label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Type like B.Tech computer Science'
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
            </div>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>
                Time Duration
              </label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Time like.. Dec 2020 - Present '
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>Place</label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Place i.e College or University'
                value={formData.place}
                onChange={(e) =>
                  setFormData({ ...formData, place: e.target.value })
                }
              />
            </div>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>Info</label>
              <textarea
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Info i.e. Academic course,obtained Marks and more..'
                value={formData.info}
                onChange={(e) =>
                  setFormData({ ...formData, info: e.target.value })
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
            onClose={handleNotificationClose}
          />
        )}
      </Modal>
    </div>
  );
};

const EditEducation = ({ educationData, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [type, setType] = useState(educationData.type);
  const [formData, setFormData] = useState({ ...educationData });
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

  const toggleDetails = () => {
    setShowDetails(!showDetails);
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
      onSave(formData, type);
      closeModal();
    }
  };
  const handleDelete = () => {
    onDelete(type);
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
          onClick={toggleDetails}
        >
          <div className='w-full grid grid-flow-row grid-cols-12 sm:text-xs'>
            <h3 className='font-semibold col-span-5 sm:col-span-8'>
              {educationData.type}
            </h3>
            <p className='sm:hidden col-span-3 sm:col-span-0'>
              {educationData.time}
            </p>
          </div>
          <div className='flex items-center space-x-2'>
            <button
              onClick={openModal}
              className='text-indigo-600 hover:text-indigo-800 focus:outline-none'
            >
              <FiEdit2 />
            </button>
            <button
              onClick={handleDelete}
              className='text-red-600 hover:text-red-800 focus:outline-none'
            >
              <FiTrash2 />
            </button>
            <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
              {showDetails ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
      {showDetails && (
        <div className='mx-3 mb-3 sm:text-xs bg-transparent  border-b-2 border-x-2 border-gray-600 p-2 px-4 rounded-b-lg shadow-lg overflow-hidden'>
          <h4 className='font-semibold'>Time</h4>
          <p>{educationData.time}</p>
          <h4 className='font-semibold'>Place</h4>
          <p>{educationData.place}</p>
          <h4 className='font-semibold'>Info</h4>
          <p>{educationData.info}</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className='modal fixed inset-0 p-2 w-full flex items-center justify-center z-50'
        overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
      >
        <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300 w-full sm:w-96 p-6 px-8 max-w-[700px] mx-10 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Edit Education</h2>
          <div className='space-y-4'>
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
            <div>
              <label className='text-gray-600 dark:text-gray-300'>Time</label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Time'
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />
            </div>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>Place</label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Place'
                value={formData.place}
                onChange={(e) =>
                  setFormData({ ...formData, place: e.target.value })
                }
              />
            </div>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>Info</label>
              <textarea
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Info'
                value={formData.info}
                onChange={(e) =>
                  setFormData({ ...formData, info: e.target.value })
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
      </Modal>
      {showNotification && (
        <Notification
          message={noteMsg.message}
          type={noteMsg.type}
          onClose={() => {
            handleNotificationClose();
          }}
        />
      )}
    </div>
  );
};

export { EditEducation, AddEducation };
