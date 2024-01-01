import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { BiAddToQueue, BiEdit } from "react-icons/bi";
import { FiChevronUp, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useSocialLinkData, useData } from "../context/DashboardDataProvider";
import { db, getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getCurrentUserId } from "../services/firebaseConfig.js";

// Function to fetch user data from the "Users" collection

// Modal component for editing profile
const ProfileFormModal = ({ isOpen, closeModal, initialProfile, onSave }) => {
  const [formData, setFormData] = useState({ ...initialProfile });

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
      className='modal fixed inset-0 mx-4 font-mono flex items-center justify-center z-50'
      overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
    >
      <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300  w-full max-w-[800px]   sm:w-96   p-4 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Edit Profile</h2>
        <div className='space-y-4'>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className='text-gray-600 dark:text-gray-300'>{key}</label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                name={key}
                placeholder={`${key} value`}
                value={value}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div className='flex justify-end mt-4 gap-3 px-2'>
          <button
            className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
            onClick={handleSaveClick}
          >
            <span>Save</span>
          </button>
          <button
            className='flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition'
            onClick={closeModal}
          >
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

const ProfileDropdown = ({ profile }) => {
  const [close, setClose] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <AnimatePresence>
      {profile && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className='grid sm:text-sm font-mono  text-black dark:text-white grid-cols-12 mt-1 rounded p-2 ml-4 overflow-hidden'
        >
          <div className='col-span-8 sm:col-span-12'>
            {Object.entries(profile).map(([key, value]) => (
              <div key={key} className='mb-2'>
                <h4 className='font-semibold'>{key}</h4>
                <p className='text-black dark:text-gray-300'>
                  <a href={value} target='_blank' rel='noopener noreferrer'>
                    {value}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EditProfile = () => {
  const userId = getCurrentUserId();
  const db = getFirestore();

  const [profile, setProfile] = useState();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(false);

  const findUser = async (userRef) => {
    const userSnapshot = await getDoc(userRef);
    return userSnapshot.data();
  };

  const updateProfile = async (newProfile) => {
    try {
      await updateDoc(userRef, newProfile);
      setProfile(newProfile);
      console.log("Profile updated successfully.", profile);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userRef = doc(db, "Users", userId);
        const userData = await findUser(userRef);
        if (userData) {
          console.log(profile);
          setProfile(userData);
        } else {
          setProfile(null);
          console.error("User data not found for user ID:", userId);
        }
      }
    };

    fetchData();
  }, [userId, selectedProfile]);

  const handleOpenFormModal = () => {
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
  };

  return (
    <div className='w-screen mb-5 font-mono flex flex-col'>
      <div className='w-full flex justify-between items-center text-white p-4'>
        <h2 className='text-xl sm:text-base px-3 py-1 flex items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold'>
          <span className='cursor-pointer'>Data</span>
          <span className='w-[2px] h-[80%] bg-gray-500 mx-1' />
          | Edit Profile
          <FiChevronRight />
        </h2>
        <h2 className='text-3xl mr-10 sm:mr-0 sm:text-2xl p-2 items-center gap-1 rounded-full text-pink-500 font-semibold'>
          <BiAddToQueue onClick={() => setIsFormModalOpen(true)} />
        </h2>
      </div>
      <div className='flex-grow p-4 overflow-y-auto text-black dark:text-white'>
        <ul className='space-y-4'>
          <li
            className='bg-transparent border-2 border-gray-600 p-2 rounded-lg'
            onClick={() => setSelectedProfile(!selectedProfile)}
          >
            <div className='flex items-center justify-between cursor-pointer'>
              <strong className='cursor-pointer ml-1 font-extrabold'>
                User Data
              </strong>
              <div className='flex gap-3'>
                <button onClick={handleOpenFormModal}>
                  <BiEdit />
                </button>
              </div>
            </div>
            {selectedProfile && (
              <div>
                <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                <ProfileDropdown
                  profile={profile}
                  onEdit={() => setIsFormModalOpen(true)}
                />
              </div>
            )}
          </li>
        </ul>
      </div>

      <ProfileFormModal
        isOpen={isFormModalOpen}
        closeModal={handleCloseFormModal}
        initialProfile={profile}
        onSave={(newProfile) => {
          updateProfile(newProfile);
          setIsFormModalOpen(false);
        }}
      />
    </div>
  );
};

export default EditProfile;
