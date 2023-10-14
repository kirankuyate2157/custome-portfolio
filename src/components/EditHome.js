import React, { useState } from "react";
import Modal from "react-modal";
import { BiAddToQueue } from "react-icons/bi";
import { FiChevronUp, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";


const HomeFormModal = ({ isOpen, closeModal, homeData, handleSave }) => {
    const [formData, setFormData] = useState({ ...homeData });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSaveClick = () => {
      handleSave(formData);
      closeModal();
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="modal fixed inset-0 flex items-center justify-center z-50 "
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white w-full sm:w-96 p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Edit Home Data</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-600">Name</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-gray-600">Profile Image</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="profileImg"
                value={formData.profileImg}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-gray-600">Title</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-gray-600">Description</label>
              <textarea
                className="block w-full h-24 py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-gray-600">Resume Link</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-gray-600">Email</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              onClick={handleSaveClick}
            >
              <span>Save</span>
            </button>
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition"
              onClick={closeModal}
            >
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </Modal>
    );
  };

const HomeDetailsDropdown = ({ homeData, onEdit, onDelete }) => {
  const [close, setClose] = useState(false);

  return (
    <AnimatePresence>
      {homeData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="grid sm:text-sm text-black dark:text-white grid-cols-12 mt-1 rounded p-2 ml-4 overflow-hidden"
        >
          <div className="col-span-8 sm:col-span-12">
            <div className="mb-2">
              <h4 className="font-semibold">Name</h4>
              <p className="text-black dark:text-gray-300">{homeData.name}</p>
            </div>
            <div className='hidden sm:flex flex-col'>
              <h4 className='font-semibold'>Profile Image</h4>
              <a
                href={homeData.profileImg}
                target='_blank'
                rel='noopener noreferrer'
                className='text-indigo-600 hover:underline'
              >
                <img
                  src={homeData.profileImg}
                  alt={homeData.name}
                  className="w-32 h-32 rounded-full"
                />
              </a>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold">Title</h4>
              <p className="text-black dark:text-gray-300">{homeData.title}</p>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold">Description</h4>
              <p className="text-black dark:text-gray-300">{homeData.description}</p>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold">Resume Link</h4>
              <p className="text-indigo-600 hover:underline">{homeData.resumeLink}</p>
            </div>
            <div className="mb-2">
              <h4 className="font-semibold">Email</h4>
              <p className="text-black dark:text-gray-300">{homeData.email}</p>
            </div>
          </div>
          <div className='col-span-1 sm:hidden' />
          <div className='col-span-3 sm:hidden sm:col-span-12 flex flex-col items-center justify-center w-full h-auto'>
            <h4 className='font-semibold'>Profile Image</h4>
            <a
              href={homeData.profileImg}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={homeData.profileImg}
                alt={homeData.name}
                className='w-full max-h-[390px]'
              />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EditHome = ({ homeData, onSave, onCancel, isEditing }) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedHome, setSelectedHome] = useState(null);
  const [close, setClose] = useState(false);

  const handleOpenFormModal = () => {
    setIsFormModalOpen(true);
  };

  const onHomeDataChange = (newHomeData) => {
    // Implement logic to update your home data with the newHomeData
    setHomeData(newHomeData);
    setIsEditingHome(false); // Turn off the edit mode
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
  };

  const handleSaveHomeData = (updatedHomeData) => {
    onHomeDataChange(updatedHomeData);
    handleCloseFormModal();
  };

  const handleEditHome = (homeData) => {
    setSelectedHome(homeData);
    handleOpenFormModal();
  };

  const handleSaveHome = (updatedHomeData) => {
    onSave(updatedHomeData);
    handleCloseFormModal();
  };

  return (
    <div className="w-screen mb-5 font-mono flex flex-col">
      <div className="w-full flex justify-between items-center text-white p-4">
        <h2 className="text-xl sm:text-base px-3 py-1 flex items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold">
          <span class=" cursor-pointer">Data</span>
          <span className="w-[2px] h-[80%] bg-gray-500 mx-1" />
          | Edit Home
          <FiChevronRight />
        </h2>
        <h2
          className="text-4xl mr-10 sm:mr-0 sm:text-2xl p-2  items-center gap-1 rounded-full   text-pink-500  font-semibold"
          onClick={handleOpenFormModal}
        >
          <BiAddToQueue />
        </h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto text-black dark:text-white">
        <ul className="space-y-4">
          <li
            className="bg-transparent border-2 border-gray-600 p-2 rounded-lg"
            onClick={() => {
              setSelectedHome(homeData);
              setClose(!close);
            }}
          >
            <div className="flex items-center justify-between cursor-pointer">
              <strong className="cursor-pointer ml-1 font-extrabold">
                {homeData.name}
              </strong>
              <div className="flex gap-2 ">
                <button onClick={() => handleEditHome(homeData)}>
                  <BsPencilSquare />
                </button>
                <button onClick={() => onDelete(homeData.name)}>
                  <BsTrash />
                </button>
                <button className="text-pink-600 flex text-3xl font-bold hover:text-indigo-800">
                  {close ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </button>
              </div>
            </div>
            {homeData == selectedHome && close && (
              <div>
                <hr className="mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700" />
                <HomeDetailsDropdown homeData={homeData} />
              </div>
            )}
          </li>
        </ul>
      </div>

      <HomeFormModal
        isOpen={isFormModalOpen}
        closeModal={handleCloseFormModal}
        homeData={homeData}
        handleSave={handleSaveHomeData}
      />
    </div>
  );
};

export default EditHome;
