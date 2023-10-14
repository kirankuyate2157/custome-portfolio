import React, { useState } from "react";
import Modal from "react-modal";
import { BiAddToQueue } from "react-icons/bi";
import { FiChevronUp, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const SocialLinksFormModal = ({ isOpen, closeModal, initialSocialLinks, onSave }) => {
  const [formData, setFormData] = useState({ ...initialSocialLinks });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = () => {
    onSave(formData);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white w-full sm:w-96 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Edit Social Links</h2>
        <div className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="text-gray-600">{key}</label>
              <input
                type="text"
                className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name={key}
                value={value}
                onChange={handleChange}
              />
            </div>
          ))}
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

const SocialLinksDropdown = ({ socialLinks, onEdit, onDelete }) => {
  const [close, setClose] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);

  return (
    <AnimatePresence>
      {socialLinks && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="grid sm:text-sm text-black dark:text-white grid-cols-12 mt-1 rounded p-2 ml-4 overflow-hidden"
        >
          <div className="col-span-8 sm:col-span-12">
            {Object.entries(socialLinks).map(([key, value]) => (
              <div key={key} className="mb-2">
                <h4 className="font-semibold">{key}</h4>
                <p className="text-black dark:text-gray-300">
                  <a href={value} target="_blank" rel="noopener noreferrer">
                    {value}
                  </a>
                </p>
              </div>
            ))}
          </div>
          <div className="col-span-4 sm:hidden">
            <div className="mb-2">
              <h4 className="font-semibold">Actions</h4>
              <div className="flex gap-2">
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EditSocial = ({ socialLinks, onSave }) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);

  const handleOpenFormModal = () => {
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
  };

  const handleSaveSocialData = (updatedSocialLinks) => {
    onSave(updatedSocialLinks);
    handleCloseFormModal();
  };

  return (
    <div className="w-screen mb-5 font-mono flex flex-col">
      <div className="w-full flex justify-between items-center text-white p-4">
        <h2 className="text-xl sm:text-base px-3 py-1 flex items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold">
          <span class="cursor-pointer">Social Links</span>
          <span className="w-[2px] h-[80%] bg-gray-500 mx-1" />
          | Edit Social Links
          <FiChevronRight />
        </h2>
        <h2
          className="text-4xl mr-10 sm:mr-0 sm:text-2xl p-2 items-center gap-1 rounded-full text-pink-500 font-semibold"
          onClick={handleOpenFormModal}
        >
          <BiAddToQueue />
        </h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto text-black dark:text-white">
        <ul className="space-y-4">
          <li
            className="bg-transparent border-2 border-gray-600 p-2 rounded-lg"
            onClick={() => setSelectedSocial(socialLinks)}
          >
            <div className="flex items-center justify-between cursor-pointer">
              <strong className="cursor-pointer ml-1 font-extrabold">Social Links</strong>
              <div className="flex gap-2">
                <button onClick={handleOpenFormModal}>
                  <BsPencilSquare />
                </button>
                <button onClick={() => handleSaveSocialData(socialLinks)}>
                  Save
                </button>
                <button onClick={() => handleCloseFormModal()}>
                  Cancel
                </button>
                <button className="text-pink-600 flex text-3xl font-bold hover:text-indigo-800">
                  <FiChevronDown />
                </button>
              </div>
            </div>
            {socialLinks === selectedSocial && (
              <div>
                <hr className="mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700" />
                <SocialLinksDropdown
                  socialLinks={socialLinks}
                  onEdit={handleOpenFormModal}
                  onDelete={() => handleSaveSocialData({})}
                />
              </div>
            )}
          </li>
        </ul>
      </div>

      <SocialLinksFormModal
        isOpen={isFormModalOpen}
        closeModal={handleCloseFormModal}
        initialSocialLinks={socialLinks}
        onSave={handleSaveSocialData}
      />
    </div>
  );
};

export default EditSocial;
