import React, { useState } from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoDocumentText } from "react-icons/io5";

const EditPhoto = ({ onClose, onFileSelect, fileType }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [initialPreview, setInitialPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleDone = () => {
    onFileSelect(selectedFile);
    onClose();
  };

  return (
    <div className='py-2 w-80 border rounded-xl'>
      <h1 className='px-3'>Select {fileType}</h1>
      <hr className='mt-2 text-black' />
      <label
        className={`flex text-blue-500 font-bold justify-center items-center ${
          selectedFile ? "" : "py-10"
        } hover:bg-gray-200 cursor-pointer bg-slate-100`}
      >
        <input
          type='file'
          accept={`${
            fileType === "Images"
              ? "image"
              : fileType === "Videos"
              ? "video"
              : "application/pdf"
          }/*`}
          className='hidden'
          onChange={handleFileChange}
        />
        {selectedFile ? (
          <div className='relative w-full h-56 overflow-hidden'>
            {fileType === "Images" ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt='Selected File'
                className='w-full h-full object-contain'
              />
            ) : (
              <div className='flex items-center justify-center h-full'>
                {fileType === "Videos" ? (
                  <>
                    <video
                      src={URL.createObjectURL(selectedFile)}
                      className='w-full h-full object-cover'
                      controls
                      autoPlay
                      muted
                    ></video>
                    <div className='absolute inset-0 flex justify-center items-center'>
                      <BsCameraVideoFill className='text-6xl text-white' />
                    </div>
                  </>
                ) : fileType === "Documents" ? (
                  <IoDocumentText className='text-6xl text-gray-600' />
                ) : null}
              </div>
            )}
          </div>
        ) : (
          `Select ${fileType.toLowerCase()} to share`
        )}
      </label>
      {selectedFile && (
        <div className='mt-2 px-3 font-semibold text-gray-600'>
          {selectedFile.name}
        </div>
      )}
      <hr className='mb-2 text-black' />
      <div className='flex justify-end items-center gap-3 m-2'>
        <button
          className='px-4 py-1 bg-blue-400 rounded-2xl hover:bg-blue-500 items-center'
          onClick={onClose}
        >
          Back
        </button>
        <button
          className={`px-4 py-1 rounded-2xl items-center ${
            selectedFile
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-gray-200 hover:shadow-xl pointer-events-none"
          }`}
          onClick={handleDone}
          disabled={!selectedFile}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default EditPhoto;
