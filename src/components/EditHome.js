import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { BiAddToQueue } from "react-icons/bi";
import { VscFolderActive } from "react-icons/vsc";
import { TbCloudCheck } from "react-icons/tb";
import { FiChevronUp, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useHomeData, useData } from "../context/DashboardDataProvider.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getCurrentUserId } from "../services/firebaseConfig.js";
import { FiUpload, FiFolder } from "react-icons/fi";
import { uploadFile } from "@/services/firebaseConfig.js";
import Notification from "./Notification";
const HomeFormModal = ({ isOpen, closeModal, homeData, onSave }) => {
  const [formData, setFormData] = useState({ ...homeData });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ",
    type: "warn",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("updated data  home : ", formData);
  };

  const handleSaveClick = () => {
    onSave(formData);
    setNoteMsg({ message: "Home data is saved 🌨️ ", type: "done" });
    showNotificationMsg();
    closeModal();
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  const showNotificationMsg = () => {
    setShowNotification(true);
  };

  const handleResumeChange = (e) => {
    if (e.target.files[0]) {
      // console.log("updating..resume  data ")
      setResume(e.target.files[0]);
    }
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      // console.log("updating..img data ")
      setImage(e.target.files[0]);
    }
  };

  const handleImgUpload = async () => {
    if (!image) {
      setNoteMsg({ message: "Image is not selected 🫠", type: "warn" });
      showNotificationMsg();

      return;
    }

    const path = "test";
    const imageName = image.name;

    try {
      const url = await uploadFile(image, path, imageName);
      setImageUrl(url);
      alert("Uploaded image..", url);
      setFormData((prevData) => ({ ...prevData, profileImg: url })); // Update using previous state
      setUploadError(null);
    } catch (error) {
      console.log("Error uploading ", error);
      setUploadError("File upload failed. Please try again.");
    }
  };

  const handleResumeUpload = async () => {
    if (!resume) {
      setNoteMsg({ message: "Resume is not selected 🫠", type: "warn" });
      showNotificationMsg();
      return;
    }

    const path = "resumeT";
    const resumeName = resume.name;

    try {
      const url = await uploadFile(image, path, resumeName);
      setResumeUrl(url);
      setFormData((prevData) => ({ ...prevData, resumeLink: url })); // Update using previous state
      setUploadError(null);
    } catch (error) {
      // console.log("Error uploading ", error);
      setUploadError("File upload failed. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Upload img 🌨️: ", imageUrl);
    console.log("upload resume 🌨️ : ", resumeUrl);
  }, [image, resume, imageUrl, resumeUrl]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className='modal fixed inset-0 flex font-mono  items-center justify-center z-50 '
      overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
    >
      <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300 w-full sm:w-96 p-6 px-8 max-w-[800px] mx-10 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Edit Home Data</h2>
        <div className='space-y-4'>
          <div>
            <label className='text-gray-600 dark:text-gray-300'>Name</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className='relative'>
            <label className='text-gray-600 dark:text-gray-300'>
              Profile Image
            </label>
            <div className='flex items-center border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600'>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md  border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                name='profileImg'
                value={formData.profileImg}
                onChange={handleChange}
              />
              <div className='flex-shrink-0 flex items-center px-1 gap-2 space-x-2'>
                <label
                  htmlFor='fileInput'
                  className='cursor-pointer text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-900 rounded p-1'
                  onClick={handleImgUpload}
                >
                  {imageUrl ? <TbCloudCheck /> : <FiUpload />}
                </label>

                <label htmlFor='fileInput1' className=' cursor-pointer'>
                  <div className='text-green-500 hover:bg-green-200 dark:hover:bg-green-900 rounded p-1'>
                    {image ? <VscFolderActive /> : <FiFolder />}
                  </div>
                  <input
                    id='fileInput1'
                    type='file'
                    className='hidden'
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className='text-gray-600 dark:text-gray-300'>Title</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              name='title'
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='text-gray-600 dark:text-gray-300'>
              Description
            </label>
            <textarea
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              name='description'
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className='relative'>
            <label className='text-gray-600 dark:text-gray-300'>
              Resume Link
            </label>
            <div className='flex items-center border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600'>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                name='resumeLink'
                value={formData.resumeLink}
                onChange={handleChange}
              />
              <div className='flex-shrink-0 flex items-center px-1 gap-2 space-x-2'>
                <label
                  htmlFor='fileInput2'
                  className='cursor-pointer text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-900  rounded p-1 '
                  onClick={handleResumeUpload}
                >
                  {resumeUrl ? <TbCloudCheck /> : <FiUpload />}
                </label>

                <label
                  htmlFor='fileInput4'
                  className='cursor-pointer text-green-500 hover:bg-green-200 dark:hover:bg-green-900 rounded p-1 relative'
                >
                  <div className=''>
                    {resume ? <VscFolderActive /> : <FiFolder />}
                  </div>
                  <input
                    id='fileInput4'
                    type='file'
                    className='hidden'
                    onChange={handleResumeChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className='text-gray-600 dark:text-gray-300'>Email</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex justify-end mt-4 gap-3 px-2'>
          <button
            className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
            onClick={handleSaveClick}
          >
            <span>Save</span>
          </button>
          <button
            className='flex items-center space-x-2 px-4 py-2 bg-gray-300 text-gray-600  rounded-md hover:bg-gray-400 transition'
            onClick={closeModal}
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
          className='grid sm:text-sm text-black dark:text-white grid-cols-12 mt-1 rounded p-2 ml-4 overflow-hidden'
        >
          <div className='col-span-8 sm:col-span-12'>
            <div className='mb-2'>
              <h4 className='font-semibold'>Name</h4>
              <p className='text-black dark:text-gray-300'>{homeData.name}</p>
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
                  className='w-32 h-32 rounded-full'
                />
              </a>
            </div>
            <div className='mb-2'>
              <h4 className='font-semibold'>Title</h4>
              <p className='text-black dark:text-gray-300'>{homeData.title}</p>
            </div>
            <div className='mb-2'>
              <h4 className='font-semibold'>Description</h4>
              <p className='text-black dark:text-gray-300'>
                {homeData.description}
              </p>
            </div>
            <div className='mb-2'>
              <h4 className='font-semibold'>Resume Link</h4>
              <p className='text-indigo-600 hover:underline'>
                {homeData.resumeLink}
              </p>
            </div>
            <div className='mb-2'>
              <h4 className='font-semibold'>Email</h4>
              <p className='text-black dark:text-gray-300'>{homeData.email}</p>
            </div>
          </div>
          <div className='col-span-1 sm:hidden' />
          <div className='col-span-3 sm:hidden sm:col-span-12 flex flex-col items-center justify-center w-full h-auto'>
            {/* <h4 className='font-semibold'>Profile Image</h4> */}
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

const EditHome = () => {
  var HData = useHomeData();
  const data = useData();
  const documentId = getCurrentUserId();
  // console.log("current h id : ", documentId)
  // console.log("Hdata : ", HData);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [homeData, setHomeData] = useState({ ...HData });
  const [portfolioData, setPortfolioData] = useState({ ...data });
  const [close, setClose] = useState(false);

  // const documentId = 'IewXRnC69XRTnbgRf41EmKuU9cu2';

  // console.log("cuurent user is : ", documentId);
  const db = getFirestore();
  if (documentId) {
    var userPortfolioRef = doc(db, "User_portfolio_data", documentId);
  } else {
    console.log(" current user id not found !");
  }

  const updateHomeData = (newHomeData) => {
    setHomeData({ ...newHomeData });
    setPortfolioData({ ...portfolioData, Home: { homeData: newHomeData } });
    // console.log("portfolio updated data :", portfolioData);
    // console.log("new link from form : ", newHomeData);

    if (portfolioData) {
      console.log("started home data updating ....");

      // Update the HomeData field within portfolioData
      const updatedData = { ...portfolioData, Home: { homeData: newHomeData } };

      // Update the document in Firestore
      updateDoc(userPortfolioRef, updatedData)
        .then(() => {
          console.log("Home data updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating Home data :", error);
        });
    }
  };

  const handleOpenFormModal = () => {
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
  };

  const handleEditHome = (homeData) => {
    handleOpenFormModal();
  };

  return (
    <div className='w-screen mb-5 font-mono flex flex-col'>
      <div className='w-full flex justify-between items-center text-white p-4'>
        <h2 className='text-xl sm:text-base px-3 py-1 flex items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold'>
          <span className='cursor-pointer'>Data</span>
          <span className='w-[2px] h-[80%] bg-gray-500 mx-1' />
          | Edit Home
          <FiChevronRight />
        </h2>
        <h2
          className='text-3xl mr-10 sm:mr-0 sm:text-2xl p-2 items-center gap-1 rounded-full text-pink-500 font-semibold'
          onClick={handleOpenFormModal}
        >
          <BiAddToQueue />
        </h2>
      </div>
      <div className='flex-grow p-4 overflow-y-auto text-black dark:text-white'>
        <ul className='space-y-4'>
          <li
            className='bg-transparent border-2 border-gray-600 p-2 rounded-lg'
            onClick={() => {
              setClose(!close);
            }}
          >
            <div className='flex items-center justify-between cursor-pointer'>
              <strong className='cursor-pointer ml-1 font-extrabold'>
                {homeData.name}
              </strong>
              <div className='flex gap-2'>
                <button onClick={() => handleEditHome(homeData)}>
                  <BsPencilSquare />
                </button>
                <button onClick={() => handleDeleteHome(homeData.name)}>
                  <BsTrash />
                </button>
                <button className='text-pink-600 flex text-3xl font-bold hover:text-indigo-800'>
                  {close ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
            </div>
            {homeData && close && (
              <div>
                <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
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
        onSave={(newHomeData) => {
          updateHomeData(newHomeData);
          setIsFormModalOpen(false);
        }}
      />
    </div>
  );
};

export default EditHome;
