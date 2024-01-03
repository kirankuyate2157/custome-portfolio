import React, { useState } from "react";
import Modal from "react-modal";
import LinesEllipsis from "react-lines-ellipsis";
import { VscFolderActive } from "react-icons/vsc";
import { TbCloudCheck } from "react-icons/tb";
import { FiEdit2, FiTrash2, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiFolder } from "react-icons/fi";
import { uploadFile } from "@/services/firebaseConfig.js";
import Notification from "./Notification";

const EditArticle = ({ articleData, onSave, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [title, setTitle] = useState(articleData.title);
  const [formData, setFormData] = useState({ ...articleData });
  const [FormType, setFormType] = useState(articleData?.summary || false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ",
    type: "warn",
  });

  const openModal = () => {
    setIsModalOpen(true);
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
      onSave(formData, title);
      closeModal();
    }
  };

  const handleDelete = () => {
    onDelete(formData.title);
    closeModal();
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
      setFormData((prevData) => ({ ...prevData, img: url })); // Update using previous state
      setUploadError(null);
    } catch (error) {
      console.log("Error uploading ", error);
      setUploadError("File upload failed. Please try again.");
    }
  };

  return (
    <div className='font-mono'>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.7 }}
          className='m-3 font-extrabold bg-transparent border-2 border-gray-600 p-2 rounded-lg text-black dark:text-white shadow-lg flex items-center justify-between overflow-hidden'
          onClick={() => {
            setShowDetails(!showDetails);
          }}
        >
          <div className='w-full grid grid-flow-row grid-cols-12 sm:text-xs'>
            <h3 className='font-semibold col-span-9 '>
              <LinesEllipsis
                text={articleData.title}
                maxLine={1}
                ellipsis='...'
                trimRight
                basedOn='letters'
              />
            </h3>
            <p className='sm:hidden col-span-2 sm:col-span-0'>{`${
              articleData.time ? articleData.time : articleData.date
            }`}</p>
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
        <div className='mx-3 mb-3 sm:text-xs bg-transparent  border-b-2 border-x-2 border-gray-600 p-2 px-4 rounded-b-lg shadow-lg overflow-hidden '>
          {articleData.summary && (
            <>
              <h4 className='font-semibold'>Summary</h4>
              <p>{articleData.summary}</p>
            </>
          )}
          <h4 className='font-semibold'>{`${
            articleData.time ? "Time" : "Date"
          }`}</h4>
          <p>{`${articleData.time ? articleData.time : articleData.date}`}</p>
          <h4 className='font-semibold'>Image </h4>
          <a
            href={articleData.img}
            target='_blank'
            rel='noopener noreferrer'
            className='text-indigo-600 hover:underline'
          >
            <LinesEllipsis
              text={articleData.img}
              maxLine={1}
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </a>
          <h4 className='font-semibold'>Link</h4>
          <a
            href={articleData.link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-indigo-600 hover:underline'
          >
            {articleData.link}
          </a>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className='modal fixed inset-0 p-2 w-full flex items-center justify-center z-50'
        overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
      >
        <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300 w-full sm:w-96 p-6 px-8 max-w-[700px] mx-10 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Edit Article</h2>
          <div className='space-y-4'>
            <div>
              <label className='text-gray-600 dark:text-gray-300'>Title</label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Title'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            {FormType && (
              <div>
                <label className='text-gray-600 dark:text-gray-300'>
                  Summary
                </label>
                <textarea
                  className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                  placeholder='Summary'
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                />
              </div>
            )}
            {FormType && (
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
            )}
            {!FormType && (
              <div>
                <label className='text-gray-600 dark:text-gray-300'>Date</label>
                <input
                  type='text'
                  className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                  placeholder='date '
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
            )}

            <div className='relative'>
              <label className='text-gray-600 dark:text-gray-300'>Image</label>
              <div className='flex items-center border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600'>
                <input
                  type='text'
                  className='block w-full py-2 px-3 border rounded-md  border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                  name='profileImg'
                  value={formData.img}
                  onChange={(e) =>
                    setFormData({ ...formData, img: e.target.value })
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
              <label className='text-gray-600 dark:text-gray-300'>Link</label>
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034]  text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-2 '
                placeholder='Link'
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
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

export default EditArticle;
