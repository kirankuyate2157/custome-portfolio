import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { BiAddToQueue, BiEdit } from "react-icons/bi";
import { FiChevronUp, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { FiUpload, FiFolder } from "react-icons/fi";
import { VscFolderActive } from "react-icons/vsc";
import { TbCloudCheck } from "react-icons/tb";
import { uploadFile } from "@/services/firebaseConfig.js";
import { motion, AnimatePresence } from "framer-motion";
import { useSocialLinkData, useData } from "../../context/DashboardDataProvider.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getCurrentUserId } from "../../services/firebaseConfig.js";
import Notification from "./Notification";
// Function to fetch user data from the "Users" collection

// Modal component for editing profile
const ProfileFormModal = ({ isOpen, closeModal, initialProfile, onSave }) => {
  console.log("init : " + initialProfile);
  const [formData, setFormData] = useState(
    { ...initialProfile } || initialProfile
  );
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [oldUsername, setOldUsername] = useState(
    initialProfile?.username || formData?.username
  );
  const [uploadError, setUploadError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ",
    type: "warn",
  });

  const handleSaveClick = () => {
    if (formData.editLimit > 0 && oldUsername !== formData.username) {
      // If editLimit is greater than 0 and the username is edited
      setFormData((prevData) => ({
        ...prevData,
        editLimit: prevData.editLimit - 1,
      }));
    }
    onSave(formData);
    setNoteMsg({ message: "Profile data is saved 🌨️ ", type: "done" });
    showNotificationMsg();
    closeModal();
  };

  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  const showNotificationMsg = () => {
    setShowNotification(true);
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
      // alert("Uploaded image..", url);
      setFormData((prevData) => ({ ...prevData, portfolioImg: url })); // Update using previous state
      setUploadError(null);
    } catch (error) {
      console.log("Error uploading ", error);
      setUploadError("File upload failed. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Upload img 🌨️: ", imageUrl);
  }, [image, imageUrl]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className='modal fixed inset-0 flex font-mono  items-center justify-center z-50 '
      overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
    >
      <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300 w-full sm:w-96 p-6 px-8 max-w-[800px] mx-10 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-4'>Edit Profile Data</h2>
        <div className='space-y-4'>
          <div>
            <label className='text-gray-600 dark:text-gray-300'>Name</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
              name='name'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          {formData.editLimit && (
            <div>
              <label className='text-gray-600 dark:text-gray-300 flex items-center '>
                User Name
                <span className='text-[0.6rem] pl-2 text-orange-400  '>
                  {`you can only edit username ${formData.editLimit} time`}{" "}
                </span>
              </label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                name='name'
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
          )}
          <div className='relative'>
            <label className='text-gray-600 dark:text-gray-300'>
              Portfolio Image
            </label>
            <div className='flex items-center border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600'>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md  border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                name='profileImg'
                value={formData.portfolioImg}
                onChange={() =>
                  setFormData({ ...formData, portfolioImg: e.target.value })
                }
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
            <label className='text-gray-600 dark:text-gray-300 flex items-center '>
              Privacy
            </label>
            <select
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2'
              value={formData.visibility}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  visibility: e.target.value === "true",
                })
              }
            >
              <option value={true}>Public</option>
              <option value={false}>Private</option>
            </select>
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
          className='grid sm:text-sm text-black dark:text-white grid-cols-12 mt-1 rounded p-2 ml-4 overflow-hidden'
        >
          <div className='col-span-8 sm:col-span-12'>
            <div className='mb-2'>
              <h4 className='font-semibold'>Name</h4>
              <p className='text-black dark:text-gray-300'>{profile.name}</p>
            </div>
            <div className='mb-2'>
              <h4 className='font-semibold'>UserName</h4>
              <p className='text-black dark:text-gray-300'>
                {profile.username}
              </p>
            </div>
            <div className='mb-2'>
              <h4 className='font-semibold'>Email</h4>
              <p className='text-black dark:text-gray-300'>{profile.email}</p>
            </div>
            <div className='mb-2'>
              <h4 className='font-semibold'>portfolio URL</h4>
              <p className='text-black dark:text-gray-300'>
                {profile.profileLink}
              </p>
            </div>
            <div className='hidden sm:flex flex-col'>
              <h4 className='font-semibold'>portfolio Image</h4>
              <a
                href={profile.portfolioImg}
                target='_blank'
                rel='noopener noreferrer'
                className='text-indigo-600 hover:underline'
              >
                <img
                  src={profile.portfolioImg}
                  alt={profile.name}
                  className='w-32 h-32  p-[2px] border border-primary rounded '
                />
              </a>
            </div>
            <div className='mb-2'>
              <h4 className='font-semibold'>portfolio Status</h4>
              <p className='text-black dark:text-gray-300'>
                {profile.visibility ? "Public" : "Private"}
              </p>
            </div>
            <div className='mb-2'>
              <h4 className='font-semibold'>views</h4>
              <p className='text-black dark:text-gray-300'>{profile.views}</p>
            </div>
            <div className='mb-2'>
              <h4 className='font-semibold'>Likes</h4>
              <p className='text-indigo-600 hover:underline'>{profile.likes}</p>
            </div>
            <div className='mb-2'>
              <h4 className='font-semibold'>
                edit Limit
                <span className='text-[0.5rem] pl-1 text-orange-600 items-center'>
                  (want to increase limit ? "Say hello 👋🏻" in footer)
                </span>
              </h4>
              <p className='text-indigo-600 hover:underline'>
                {profile.editLimit}
              </p>
            </div>
          </div>
          <div className='col-span-1 sm:hidden' />
          <div className='col-span-3 sm:hidden sm:col-span-12 flex flex-col items-center justify-center w-full h-auto p-1 sm:p-[2px]   max-h-[400px] '>
            <a
              href={profile.portfolioImg}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                src={profile.portfolioImg}
                alt={profile.name}
                className='w-full max-h-[390px] p-[2px]  border border-primary rounded  '
              />
            </a>
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
  if (userId) {
    var userRef = doc(db, "Users", userId);
  }

  const saveProfile = (newProfile) => {
    setProfile({ ...newProfile });
  };

  useEffect(() => {
    if (profile?.username && userId) {
      const updatedData = { profileData: { ...profile } };
      updateDoc(userRef, updatedData);
    }
  }, [profile]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const userRef = doc(db, "Users", userId);
        const userData = await findUser(userRef);
        if (userData) {
          setProfile({ ...userData.profileData });
        }
      }
    };

    fetchData();
  }, [userId]);

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
      </div>
      <div className='flex-grow p-4 overflow-y-auto text-black dark:text-white'>
        <ul className='space-y-4'>
          <li
            className='bg-transparent border-2 border-gray-600 p-2 rounded-lg'
            onClick={() => setSelectedProfile(!selectedProfile)}
          >
            <div className='flex items-center justify-between cursor-pointer'>
              <strong className='cursor-pointer ml-1 font-extrabold'>
                Profile Data
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
          saveProfile(newProfile);
        }}
      />
    </div>
  );
};

export default EditProfile;
