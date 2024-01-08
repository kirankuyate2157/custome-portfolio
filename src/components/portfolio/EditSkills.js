import React, { useState } from "react";
import Modal from "react-modal";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Notification from "./Notification";

const AddSkill = ({ addNewSkill, isOpen, closeModal }) => {
  // State for the new skill being added
  const [newSkill, setNewSkill] = useState({
    name: "",
    x: "",
    y: "",
  });
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ",
    type: "warn",
  });

  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  const showNotificationMsg = () => {
    setShowNotification(true);
  };

  const handleAddSkill = () => {
    if (newSkill.name && newSkill.x && newSkill.y) {
      if (isNaN(parseFloat(newSkill.x)) || isNaN(parseFloat(newSkill.y))) {
        setNoteMsg({ message: "Please fill in all form fields", type: "warn" });
        showNotificationMsg();
        return null; // Invalid input
      }

      // Ensure 'vw' is present at the end of x and y
      const formattedX = `${parseFloat(newSkill.x)}vw`
        .toLowerCase()
        .replace(/\s+/g, " ");
      const formattedY = `${parseFloat(newSkill.y)}vw`
        .toLowerCase()
        .replace(/\s+/g, " ");
      if (formattedX && formattedY) {
        const updateSkill = {
          name: newSkill.name,
          x: formattedX,
          y: formattedY,
        };
        setNewSkill(updateSkill);
        console.log(" value of x, y", formattedX, formattedY);
        addNewSkill(updateSkill);
        closeModal();
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className='modal fixed inset-0 p-2 w-full flex items-center justify-center z-50'
      overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
    >
      <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300 w-full sm:w-96 p-6 px-8 max-w-[530px] mx-10 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Add Skill</h2>
        <p className='text-[0.7rem] text-orange-400'>{`
          please put value in proper formate so it will visible accordingly on
          skill spiral "value vw"`}
        </p>
        <div className='space-y-4'>
          <div>
            <label className='text-gray-600 dark:text-gray-300'>
              Skill Name
            </label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              placeholder='Skill Name'
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill({ ...newSkill, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className='text-gray-600 dark:text-gray-300'>
              X Position
            </label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              placeholder='X Position'
              value={newSkill.x}
              onChange={(e) => setNewSkill({ ...newSkill, x: e.target.value })}
            />
          </div>
          <div>
            <label className='text-gray-600 dark:text-gray-300'>
              Y Position
            </label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              placeholder='Y Position'
              value={newSkill.y}
              onChange={(e) => setNewSkill({ ...newSkill, y: e.target.value })}
            />
          </div>
        </div>
        <div className='flex justify-end mt-4 gap-3 px-2'>
          <button
            onClick={handleAddSkill}
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
  );
};

const EditSkills = ({ skillsData, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(skillsData.name);
  const [formData, setFormData] = useState({ ...skillsData });
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ",
    type: "warn",
  });
  // ------------------binary mode---------------------
  const openModal = () => {
    setIsModalOpen(true);
    // Set the formData to the skill you want to edit
    setFormData({ ...skillsData });
    setName(skillsData.name);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  const showNotificationMsg = () => {
    setShowNotification(true);
  };

  // --------------------  Handlers ---------------------------
  const handleSave = () => {
    if (formData.name && formData.x && formData.y) {
      if (isNaN(parseFloat(formData.x)) || isNaN(parseFloat(formData.y))) {
        setNoteMsg({ message: "Please fill in all form fields", type: "warn" });
        showNotificationMsg();
        return null; // Invalid input
      }

      // Ensure 'vw' is present at the end of x and y
      const formattedX = `${parseFloat(formData.x)}vw`
        .toLowerCase()
        .replace(/\s+/g, " ");
      const formattedY = `${parseFloat(formData.y)}vw`
        .toLowerCase()
        .replace(/\s+/g, " ");
      if (formattedX && formattedY) {
        const update = {
          name: formData.name,
          x: formattedX,
          y: formattedY,
        };
        setFormData(update);
        console.log(" value of x, y", formattedX, formattedY);
        onSave(update, name);
        closeModal();
      }
    }
  };

  const handleDelete = () => {
    // Pass the key (or unique identifier) to the onDelete function
    onDelete(skillsData.name);
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
          className=' m-3 font-extrabold bg-transparent border-2 border-gray-600 p-2 rounded-lg  text-gray-800 dark:text-white shadow-lg  flex items-center justify-between  overflow-hidden'
        >
          {/* <div className=" m-3 font-extrabold bg-transparent border-2 border-gray-600 p-2 rounded-lg  text-white shadow-lg  flex items-center justify-between"> */}
          <div className='w-full grid grid-flow-row grid-cols-12 sm:text-xs '>
            <h3 className='font-semibold col-span-5'>{skillsData.name}</h3>
            <p className=' col-span-3'>{`X: ${skillsData.x}`}</p>
            <p className=' col-span-3'>{`Y: ${skillsData.y}`}</p>
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
          </div>
          {/* </div> */}
        </motion.div>
      </AnimatePresence>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className='modal fixed inset-0  p-2 w-full  flex items-center justify-center z-50'
        overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
      >
        <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300 w-full sm:w-96 p-6 px-8 max-w-[530px] mx-10 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Edit Skill</h2>
          <p className='text-[0.7rem] text-orange-400'>{`
            please put value in proper formate so it will visible accordingly on
            skill spiral "value vw"`}
          </p>
          <div className='space-y-4'>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>
                Skill Name
              </label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Skill Name'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>
                X Position
              </label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='X Position'
                value={formData.x}
                onChange={(e) =>
                  setFormData({ ...formData, x: e.target.value })
                }
              />
            </div>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>
                Y Position
              </label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Y Position'
                value={formData.y}
                onChange={(e) =>
                  setFormData({ ...formData, y: e.target.value })
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

export { EditSkills, AddSkill };
