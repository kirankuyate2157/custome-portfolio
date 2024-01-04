import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import EditPhoto from "./EditPhoto";
import Picker from "emoji-picker-react";
import emojiNameMap from 'emoji-name-map';
import { BsCameraVideoFill } from "react-icons/bs";
import { BiSolidChevronDown, BiTime } from "react-icons/bi";
import { GrEmoji } from "react-icons/gr";
import { CiImageOn } from "react-icons/ci";
import { FaCertificate } from "react-icons/fa";
import { MdWork, MdEdit, MdDone } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";

const useOutsideClick = (ref, callback) => {
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback]);
};

const WritePost = () => {
  const [articleText, setArticleText] = useState("");
  const [visibilityText, setVisibilityText] = useState("Anyone");
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showvisPopup, setVisShowPopup] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [fileType, setFileType] = useState("Images");
  const [fileName, setFileName] = useState("undefined");
  const [editingFileName, setEditingFileName] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const router= useRouter();
  const dataPrams=router.query;
  const documentType= dataPrams[0]||"Images";
  const showPopup3= dataPrams.length > 1? dataPrams[1]: "false";
 
  const postData=()=>{
    console.log("article text : ",articleText);
    console.log("file name : ",fileName)
  }


  useEffect(() => {
    if (documentType && showPopup3) {
      setShowPopup2(true);
      setFileType(documentType);
      console.log("Parameters from routes: ", documentType);
    }
  }, [documentType, showPopup3]); // Update the dependency array


  const handleDocumentClick = (type) => {
    router.push(`/k/write-post/${type}/true`); // Use route parameters format
  };

  const handleVideoClick = (event) => {
    setVideoPlaying((prevState) => !prevState);
  };
  const handleFileNameEdit = () => {
    setEditingFileName(fileName);
  };

  const handleFileNameChange = (event) => {
    setEditingFileName(event.target.value);
  };

  const handleFileNameSave = () => {
    setFileName(editingFileName);
    setEditingFileName(null);
  };
  const handleVisibilitySelect = (option) => {
    setVisibilityText(option);
    setShowPopup(false);
  };
  const handleFileSelect = (file) => {
    if (fileType === "Images") {
      setSelectedImage(file);
      setSelectedDocument(null);
      setSelectedVideo(null);
    } else if (fileType === "Videos") {
      setSelectedVideo(file);
      setSelectedImage(null);
      setSelectedDocument(null);
    } else if (fileType === "Documents") {
      setSelectedDocument(file);
      setSelectedImage(null);
      setSelectedVideo(null);
    }
    setFileName(file.name);

    setShowPopup2(false); // Close the modal after selecting the file
  };

  const onEmojiClick = (event, emojiObject) => {
    const imgTagString = emojiObject.target.outerHTML;
// Create a new DOMParser
const parser = new DOMParser();
// Parse the string into a Document
const doc = parser.parseFromString(imgTagString, 'text/html');
// Access the parsed <img> element
const imgElement = doc.body.firstChild;
// Access the alt attribute
const emojiName = imgElement.getAttribute('alt');

console.log(`Alt attribute: ${emojiName}`);
const unicode = emojiNameMap.get(emojiName);

if (unicode) {
  setArticleText((prevText) => prevText + unicode);
} 
setShowPopup(false);
  };

  useOutsideClick(videoRef, () => {
    if (videoPlaying) {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  });

  return (
    <>
      <div className='flex w-full  justify-center max-w-[800px] min-w-[310px] py-2 '>
        <div className='p-3 w-[90%]  border text-black bg-white rounded-xl'>
          <div className='flex gap-1 justify-start items-center'>
            <div className='flex items-center hover:bg-gray-100 rounded-lg p-1 gap-2'>
              <div className='p-1'>
                <img
                  src='https://avatars.githubusercontent.com/u/84271800?v=4'
                  alt='placeholder'
                  className='w-[50px] md:w-[40px] rounded-full' // Adjust the image size for mobile and larger screens
                />
              </div>
              <div
                className='flex flex-col'
                onClick={() => setVisShowPopup(!showvisPopup)}
              >
                <h1 className='bold text-lg md:text-xl lg:text-2xl flex items-center gap-1'>
                  {/* Adjust font sizes for different screen sizes */}
                  Kiran Kuayte
                  <span className='p-1'>
                    <BiSolidChevronDown size={20} />{" "}
                    {/* Adjust the size of the chevron icon */}
                  </span>
                </h1>
                {showvisPopup && (
                  <ul className='absolute bg-white border border-gray-300 z-10 rounded mt-1 py-2 w-32'>
                    <li
                      className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                      onClick={() => handleVisibilitySelect("Everyone")}
                    >
                      Everyone
                    </li>
                    <li
                      className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                      onClick={() => handleVisibilitySelect("Connections")}
                    >
                      Connections
                    </li>
                    <li
                      className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                      onClick={() => handleVisibilitySelect("Private")}
                    >
                      Private
                    </li>
                    <li
                      className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                      onClick={() => handleVisibilitySelect("Group")}
                    >
                      Group
                    </li>
                  </ul>
                )}
                <h5 className='text-xs md:text-sm lg:text-base'>
                  Post to {visibilityText}
                </h5>{" "}
                {/* Adjust font size for different screen sizes */}
              </div>
            </div>
          </div>

          <hr className='mt-2 text-black' />
          <div className='relative w-full h-80  overflow-auto'>
            <div className='flex py-2'>
              <textarea
                className='w-full rounded-xl px-3 pt-2 text-xl resize-none focus:outline-none overflow-auto'
                rows={10}
                placeholder='What do you want to talk about?'
                value={articleText}
                onChange={(e) => {
                  setArticleText(e.target.value);
                }}
              />
            </div>
            {/* Show the EditPhoto modal when 'showPopup2' is true */}
            {showPopup2 && (
              <div className='fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70'>
                <div className='bg-white  rounded-lg'>
                  <EditPhoto
                    onClose={() => setShowPopup2(false)}
                    onFileSelect={handleFileSelect}
                    fileType={fileType}
                  />
                </div>
              </div>
            )}

            {selectedImage && (
              <div className='relative w-full  text-xs hover:bg-gray-100  rounded-xl mx-2 h-auto md:h-56 mt-4 overflow-auto'>
                <div className='mt-1 px-3 gap-2 flex items-center overflow-auto font-semibold  rounded-t-lg text-gray-600'>
                  {editingFileName !== null ? (
                    <>
                      <input
                        type='text'
                        className='flex-1 bg-white border-b rounded-md px-2 focus:outline-none'
                        value={editingFileName}
                        onChange={handleFileNameChange}
                      />
                      <MdDone
                        className='p-1 text-3xl rounded-full hover:bg-slate-200 hover:shadow-full cursor-pointer'
                        onClick={handleFileNameSave}
                      />
                    </>
                  ) : (
                    <>
                      {fileName}

                      <MdEdit
                        className='p-1 text-xl rounded-full hover:bg-slate-200 hover:shadow-full cursor-pointer'
                        onClick={handleFileNameEdit}
                      />
                    </>
                  )}
                </div>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt='Selected Image'
                  className='w-full h-auto rounded-b-lg'
                />
              </div>
            )}

            {selectedVideo && (
              <div
                className={`relative w-full h-auto text-xs mt-4 overflow-hidden ${
                  videoPlaying ? "cursor-pointer" : ""
                }`}
                onClick={handleVideoClick}
                ref={videoRef}
              >
                <div className='mt-1 px-3 gap-2 flex items-center overflow-auto font-semibold rounded-t-lg text-gray-600'>
                  {editingFileName !== null ? (
                    <>
                      <input
                        type='text'
                        className='flex-1 bg-white border-b rounded-md px-2 focus:outline-none'
                        value={editingFileName}
                        onChange={handleFileNameChange}
                      />
                      <MdDone
                        className='p-1 text-2xl rounded-full hover:bg-slate-200 hover:shadow-full cursor-pointer'
                        onClick={handleFileNameSave}
                      />
                    </>
                  ) : (
                    <>
                      {fileName}

                      <MdEdit
                        className='p-1 text-xl rounded-full hover:bg-slate-200 hover:shadow-full cursor-pointer'
                        onClick={handleFileNameEdit}
                      />
                    </>
                  )}
                </div>
                {videoPlaying ? (
                  <video
                    src={URL.createObjectURL(selectedVideo)}
                    className='w-full h-auto rounded-b-lg'
                    controls
                    autoPlay
                    onClick={handleVideoClick} // Pause the video when clicked again
                  ></video>
                ) : (
                  <>
                    <video
                      src={URL.createObjectURL(selectedVideo)}
                      className='w-fit h-auto rounded-b-lg'
                      controls={true}
                      muted
                    ></video>
                    {/* The video thumbnail overlay */}
                    <div className='absolute inset-0 flex justify-center items-center'>
                      <BsCameraVideoFill className='text-6xl text-white' />
                    </div>
                  </>
                )}
              </div>
            )}

            {selectedDocument && (
              <div className='relative w-full text-xs h-auto md:h-20 mt-4 overflow-hidden'>
                <div className='mt-1 px-3 gap-2 flex items-center overflow-auto font-semibold  rounded-t-lg text-gray-600'>
                  {editingFileName !== null ? (
                    <>
                      <input
                        type='text'
                        className='flex-1 bg-white border-b rounded-md px-2 focus:outline-none'
                        value={editingFileName}
                        onChange={handleFileNameChange}
                      />
                      <MdDone
                        className='p-1 text-3xl rounded-full hover:bg-slate-200 hover:shadow-full cursor-pointer'
                        onClick={handleFileNameSave}
                      />
                    </>
                  ) : (
                    <>
                      {fileName}

                      <MdEdit
                        className='p-1 text-xl rounded-full hover:bg-slate-200 hover:shadow-full cursor-pointer'
                        onClick={handleFileNameEdit}
                      />
                    </>
                  )}
                </div>
                <div className='flex justify-center md:justify-start px-3'>
                  <IoDocumentText className='text-3xl  text-gray-600 r' />
                </div>
              </div>
            )}
          </div>
          <div className='flex overflow-x-auto py-2'>
            <button
              className='text-xl md:text-2xl m-1 cursor-pointer hover:bg-gray-100 rounded-full p-2 focus:outline-none'
              onClick={() => setShowPopup(!showPopup)}
            >
              <GrEmoji size={20} />
            </button>
          </div>

          <div className='relative'>
            {showPopup && (
              <div className='fixed bottom-[-10px] left-[40%] transform -translate-x-1/2 z-10 bg-white border border-gray-300 rounded mt-1 w-10 md:w-56'>
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          <div className='flex gap-3 text-xl md:text-3xl text-gray-500'>
            <span
              className='bg-gray-100 rounded-full p-2 md:p-3 hover:bg-gray-200 hover:shadow-md shadow-black'
              onClick={() => {
                handleDocumentClick("Images");
                setShowPopup2(!showPopup2);
                setFileType("Images");
              }}
            >
              <CiImageOn size={20} />
            </span>
            <span
              className='bg-gray-100 rounded-full p-2 md:p-3 hover:shadow-md shadow-black hover:bg-gray-200'
              onClick={() => {
                handleDocumentClick("Videos");
                setShowPopup2(!showPopup2);
                setFileType("Videos");
              }}
            >
              <BsCameraVideoFill size={20} />
            </span>
            <span
              className='bg-gray-100 rounded-full p-2 md:p-3 hover:shadow-md shadow-black hover:bg-gray-200'
              onClick={() => {
                handleDocumentClick("Documents");
                setShowPopup2(!showPopup2);
                setFileType("Documents");
              }}
            >
              <IoDocumentText size={20} />
            </span>
            <span
              className='bg-gray-100 rounded-full p-2 md:p-3 hover:shadow-md shadow-black hover:bg-gray-200'
              onClick={() => {
                handleDocumentClick("Documents");
                setShowPopup2(!showPopup2);
                setFileType("Documents");
              }}
            >
              <FaCertificate size={20} />
            </span>
            <span
              className='bg-gray-100 rounded-full p-2 md:p-3 hover:shadow-md shadow-black hover:bg-gray-200'
              onClick={() => {
                handleDocumentClick("Documents");
                setShowPopup2(!showPopup2);
                setFileType("Documents");
              }}
            >
              <MdWork size={20} />
            </span>
          </div>

          <hr className='mt-2 text-black' />
          <div className='flex justify-end items-center gap-3 my-2'>
            <BiTime className='text-2xl text-gray-400' />
            <button className='px-4 py-1 bg-blue-400 rounded-2xl hover:bg-blue-500 items-center'
            onClick={()=>postData()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WritePost;
