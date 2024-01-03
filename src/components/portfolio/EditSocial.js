import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { BiAddToQueue, BiEdit } from "react-icons/bi";
import { FiChevronUp, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useSocialLinkData, useData } from "../../context/DashboardDataProvider.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getCurrentUserId } from "../../services/firebaseConfig.js";

const SocialLinksFormModal = ({
  isOpen,
  closeModal,
  initialSocialLinks,
  onSave,
}) => {
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
      className='modal fixed inset-0 mx-4 font-mono   flex items-center justify-center z-50'
      overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
    >
      <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300  w-full max-w-[800px]   sm:w-96   p-4 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Edit Social Links</h2>
        <div className='space-y-4'>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className='text-gray-600 dark:text-gray-300'>{key}</label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                name={key}
                placeholder={`${key} url`}
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

const SocialLinksDropdown = ({ socialLinks }) => {
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
          className='grid sm:text-sm font-mono  text-black dark:text-white grid-cols-12 mt-1 rounded p-2 ml-4 overflow-hidden'
        >
          <div className='col-span-8 sm:col-span-12'>
            {Object.entries(socialLinks).map(([key, value]) => (
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

const EditSocial = () => {
  const initialSocialLinks = useSocialLinkData();
  const data = useData();
  // const documentId = getCurrentUserId();

  const [socialLinks, setSocialLinks] = useState({ ...initialSocialLinks });
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [portfolioData, setPortfolioData] = useState({ ...data });
  const [selectedSocial, setSelectedSocial] = useState(false);

  const documentId = "IewXRnC69XRTnbgRf41EmKuU9cu2";

  // Replace with your document ID
  const db = getFirestore();
  // console.log("social user id : ", documentId);
  if (documentId) {
    var userPortfolioRef = doc(db, "User_portfolio_data", documentId);
  } else {
    console.log(" current user id not found !");
  }

  const updateSocialLinks = (newSocialLinks) => {
    setSocialLinks({ ...newSocialLinks });
    console.log("new link from form : ", newSocialLinks);

    if (portfolioData) {
      console.log("started data updating ....");

      // Update the SocialLinks field within portfolioData
      const updatedData = { ...portfolioData, SocialLinks: newSocialLinks };

      // Update the document in Firestore
      updateDoc(userPortfolioRef, updatedData)
        .then(() => {
          console.log("SocialLinks updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating SocialLinks:", error);
        });
    }
  };

  // useEffect(() => {
  //   getDoc(userPortfolioRef)
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setPortfolioData(snapshot.data());
  //       } else {
  //         console.error(
  //           "Portfolio data not found for document ID:",
  //           documentId
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error loading portfolio data:", error);
  //     });
  // }, [documentId, userPortfolioRef]);

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
          | Edit Social Links
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
            onClick={() => setSelectedSocial(!selectedSocial)}
          >
            <div className='flex items-center justify-between cursor-pointer'>
              <strong className='cursor-pointer ml-1 font-extrabold'>
                Social Links
              </strong>
              <div className='flex gap-3'>
                <button onClick={handleOpenFormModal}>
                  <BiEdit />
                </button>

                <button className='text-pink-600 flex text-3xl font-bold hover:text-indigo-800'>
                  {!selectedSocial ? <FiChevronDown /> : <FiChevronUp />}
                </button>
              </div>
            </div>
            {selectedSocial && (
              <div>
                <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                <SocialLinksDropdown
                  socialLinks={socialLinks}
                  onEdit={() => setIsFormModalOpen(true)}
                />
              </div>
            )}
          </li>
        </ul>
      </div>

      <SocialLinksFormModal
        isOpen={isFormModalOpen}
        closeModal={() => setIsFormModalOpen(false)}
        initialSocialLinks={socialLinks}
        onSave={(newSocialLinks) => {
          updateSocialLinks(newSocialLinks);
          setIsFormModalOpen(false);
        }}
      />
    </div>
  );
};
export default EditSocial;
