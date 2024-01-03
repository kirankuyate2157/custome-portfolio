// AddArticle.jsx

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { VscFolderActive } from "react-icons/vsc";
import { TbCloudCheck } from "react-icons/tb";
import { FiUpload, FiFolder } from "react-icons/fi";
import { uploadFile } from "@/services/firebaseConfig.js";
import Notification from "./Notification";

const AddArticle = ({ isOpen, articleData, onSave, closeModal }) => {
  const [isAllArticles, setIsAllArticles] = useState(
    articleData.title === "Article Name..." || articleData?.summary || false
  );
  const [formData, setFormData] = useState({ ...articleData });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
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

  const handleSave = () => {
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
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
      setFormData((prevData) => ({ ...prevData, img: url }));
      setUploadError(null);
    } catch (error) {
      console.log("Error uploading ", error);
      setUploadError("File upload failed. Please try again.");
    }
  };

  return (
    <div className='font-mono'>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className='modal fixed inset-0 p-2 w-full flex items-center justify-center z-50'
        overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
      >
        <div className=' bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300 w-full sm:w-96 p-6 px-8 max-w-[700px] mx-10 rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold mb-4'>Add Article</h2>
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
            {isAllArticles && (
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
            {isAllArticles && (
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
            {!isAllArticles && (
              <div>
                <label className='text-gray-600 dark:text-gray-300'>
                  Date{" "}
                </label>
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

export default AddArticle;
