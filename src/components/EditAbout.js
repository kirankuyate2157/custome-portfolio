import React, { useEffect, useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import Modal from "react-modal";
import { VscFolderActive } from "react-icons/vsc";
import { TbCloudCheck } from "react-icons/tb"
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { FiChevronUp, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BiAddToQueue } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { EditSkills, AddSkill } from "./EditSkills";
import EditStatistics from "./EditStatistics";
import EditExperience from "./EditExperience";
import EditEducation from "./EditEducation";
import { useAboutData, useData } from "../context/DashboardDataProvider";
import { getCurrentUserId } from "./../services/firebaseConfig.js";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { FiUpload, FiFolder } from 'react-icons/fi';
import { uploadFile } from '@/services/firebaseConfig.js';
import Notification from "./Notification"
const AboutDetailsDropdown = ({ aboutData }) => {
  const [close, setClose] = useState(false);

  return (
    <AnimatePresence>
      {aboutData && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className='grid sm:text-sm text-black dark:text-white grid-cols-12 mt-1 rounded p-2 ml-4  overflow-hidden'
        >
          <div className='col-span-8 sm:col-span-12'>
            <div className='mb-2'>
              <h4 className='font-semibold'>Title</h4>
              <p className='text-black dark:text-gray-300'>{aboutData.title}</p>
            </div>
            <div className='hidden sm:flex flex-col'>
              <h4 className='font-semibold'>Preview</h4>
              <a
                href={aboutData.profileImg}
                target='_blank'
                rel='noopener noreferrer'
                className='text-indigo-600 hover:underline'
              >
                <LinesEllipsis
                  text={aboutData.profileImg}
                  maxLine={1}
                  ellipsis='....'
                  trimRight
                  basedOn='letters'
                  className='text-indigo-600 hover:underline'
                // onClick={() => setShowFullText(!showFullText)}
                />
              </a>
            </div>
            {/* <div>
              <h4 className="font-semibold ">Profile Image</h4>
              <img
                src={aboutData.profileImg}
                alt="Profile"
                className="w-32 h-32 rounded-full"
              />
            </div> */}

            <div className='mb-2'>
              <h4 className='font-semibold'>Bio</h4>
              {aboutData.bio.map((paragraph, index) => (
                <p key={index} className='text-black dark:text-gray-300'>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className='col-span-1 sm:hidden' />
          <div className='col-span-3 sm:hidden sm:col-span-12 flex flex-col items-center justify-center w-full h-auto'>
            {/* <h4 className='font-semibold'>preview</h4> */}
            {/* <hr className='my-1' /> */}
            <div className='p-1 sm:p-[2px] xs:border border-[0.5px]  max-h-[400px] border-primary rounded '>
              <img
                src={aboutData.profileImg}
                alt={aboutData.title}
                className='w-full max-h-[390px]'
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AboutFormModal = ({ isOpen, closeModal, aboutData, onSave }) => {
  const [formData, setFormData] = useState({ ...aboutData });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [noteMsg, setNoteMsg] = useState({
    message: "some action done 😕 ", type: "warn"
  });
  const handleSaveClick = () => {
    onSave(formData);
    setNoteMsg({ message: "About data is saved 🌨️ ", type: "done" });
    showNotificationMsg();
    closeModal();
  };
  const handleNotificationClose = () => {
    setShowNotification(false);
  };
  const showNotificationMsg = () => {
    setShowNotification(true);
  }
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

    const path = 'test';
    const imageName = image.name;

    try {
      const url = await uploadFile(image, path, imageName);
      setImageUrl(url);
      alert("Uploaded image..", url);
      setFormData((prevData) => ({ ...prevData, profileImg: url })); // Update using previous state
      setUploadError(null);
    } catch (error) {
      console.log("Error uploading ", error);
      setUploadError('File upload failed. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className='modal fixed inset-0 font-mono flex items-center justify-center z-50'
      overlayClassName='modal-overlay fixed inset-0 bg-black bg-opacity-50'
    >
      <div className=" bg-white dark:bg-[#1b1f30] text-black dark:text-gray-300 w-full sm:w-96 p-6 px-8 max-w-[800px] mx-10 rounded-lg shadow-lg">
        <h2 className='text-2xl font-semibold mb-4'>Edit About</h2>
        <div className='space-y-4'>
          <div>
            <label className='text-gray-600 dark:text-gray-300 '>Title</label>
            <input
              type='text'
              className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034] text-gray-900 dark:text-gray-400 focus:outline-none focus:border-2 '
              placeholder='Title'
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="relative">
            <label className="text-gray-600 dark:text-gray-300">Profile Image</label>
            <div className="flex items-center border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034] text-gray-900 dark:text-gray-400">
              <input
                type='text'
                className='block w-full py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034] text-gray-900 dark:text-gray-400 focus:outline-none focus:border-2 '
                placeholder='Profile Image URL'
                value={formData.profileImg}
                onChange={(e) =>
                  setFormData({ ...formData, profileImg: e.target.value })
                }
              />
              <div className="flex-shrink-0 flex items-center px-1 gap-2 space-x-2">
                <label htmlFor="fileInput" className="cursor-pointer text-blue-500 hover:bg-blue-200 dark:hover:bg-blue-900 rounded p-1" onClick={handleImgUpload}>
                  {imageUrl ? <TbCloudCheck /> : <FiUpload />}
                </label>

                <label htmlFor="fileInput1" className=" cursor-pointer">
                  <div className="text-green-500 hover:bg-green-200 dark:hover:bg-green-900 rounded p-1">
                    {image ? <VscFolderActive /> : <FiFolder />}
                  </div>
                  <input
                    id="fileInput1"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div>
            <label className='text-gray-600 dark:text-gray-300 '>Bio</label>
            <textarea
              className='block w-full h-20 py-2 px-3 border rounded-md border-gray-300 dark:border-[#8f0c4344]  bg-gray-100 dark:bg-[#1b2034] text-gray-900 dark:text-gray-400 focus:outline-none focus:border-2 '
              placeholder='Bio'
              value={formData.bio.join("\n")}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value.split("\n") })
              }
            />
          </div>
          {/* Add more fields as needed */}
        </div>
        <div className="flex justify-end mt-4 gap-3 px-2">
          <button
            className='flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition'
            onClick={() => {
              handleSaveClick();
              closeModal();
            }}
          >
            <span>Save</span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-gray-300 text-gray-600  rounded-md hover:bg-gray-400 transition"
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

const EditAbout = () => {
  const about = useAboutData();
  const data = useData();
  const documentId = getCurrentUserId();
  // console.log("about data dash .. : ", about);
  const [allAboutData, setAllAboutData] = useState({ ...about });
  const [aboutData, setAboutData] = useState({ ...about.aboutData });
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedAbout, setSelectedAbout] = useState(null);
  const [close, setClose] = useState(false);
  const [skillsClose, setSkillsClose] = useState(false);
  const [skills, setSkills] = useState([...allAboutData.aboutData.skills]);
  const [statisticsClose, setStatisticsClose] = useState(false);
  const [statistics, setStatistics] = useState([
    ...allAboutData.aboutData.statistics,
  ]);
  const [experienceClose, setExperienceClose] = useState(false);
  const [experience, setExperience] = useState([
    ...allAboutData.experienceData,
  ]);
  const [educationClose, setEducationClose] = useState(false);
  const [education, setEducation] = useState([...allAboutData.educationData]);
  // ------------------------  data updating -------------------------------

  const db = getFirestore();
  if (documentId) {
    var userPortfolioRef = doc(db, 'User_portfolio_data', documentId);
  }
  else {
    console.log(" current user id not found !")
  }
  useEffect(() => {
    const About = {
      aboutPageData: {
        aboutData: {
          ...aboutData,
          skills: [...skills],
          statistics: [...statistics]
        },
        experienceData: [...experience],
        educationData: [...education]
      }
    }
    const updatedData = { ...data, About: { ...About } };
    // console.log("updated portfolio : ",updatedData)


    // ---------------- update to firebase -----------------------

    if (userPortfolioRef) {
      if (data) {
        console.log("started home data updating ....")

        // Update the HomeData field within portfolioData
        const updatedData = { ...data, About: { ...About } };

        // Update the document in Firestore
        updateDoc(userPortfolioRef, updatedData)
          .then(() => {
            console.log('About data updated successfully.');
          })
          .catch((error) => {
            console.error('Error updating Home data :', error);
          });
      }
    }
  }, [aboutData, skills, statistics, experience, education]);



  // useEffect(() => {
  //   getDoc(userPortfolioRef)
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         setPortfolioData(snapshot.data());
  //       } else {
  //         console.error('Portfolio data not found for document ID:', documentId);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error loading portfolio data:', error);
  //     });
  // }, [documentId, userPortfolioRef]);




  // --------------------------- data updates end  ---------------------------------
  const handleOpenFormModal = () => {
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
  };

  const handleEditAbout = (aboutData) => {
    setSelectedAbout(aboutData);
    handleOpenFormModal();
  };



  // -------------------------------------------------------
  // -----------  about data  ---------
  const updateAboutData = (newAboutData) => {
    setAboutData({ ...newAboutData });
    console.log("about data is updating LC .. 👍🏻");
  };
  // --------- update skills ---------
  const updateSkill = (updatedSkill, name) => {
    // Clone the current skills array to avoid mutation
    const updatedSkills = [...skills];
    const index = updatedSkills.findIndex((skill) => skill.name === name);

    if (index !== -1) {
      updatedSkills[index] = { ...updatedSkill };
      setSkills(updatedSkills); // Update the skills array
    }
  };

  const handleDeleteSkill = (skillName) => {
    const updatedSkills = skills.filter((skill) => skill.name !== skillName);
    setSkills(updatedSkills);
    console.log("skill deleted  🌸 : ", skillName);
  };
  // Function to update the skills array when a new skill is added
  const addNewSkill = (newSkill) => {
    if (newSkill.name && newSkill.x && newSkill.y) {
      setSkills([...skills, newSkill]);
    }
  };
  const [openAddSkillModal, setOpenAddSkillModal] = useState(false);
  const openAddSkill = () => {
    setOpenAddSkillModal(true);
  };

  const closeAddSkill = () => {
    setOpenAddSkillModal(false);
  };

  // ------------------- statistics -----------
  // useEffect(() => {
  //   console.log("skills updates : ", skills);
  // }, [skills]);

  const updateStatistic = (updatedStat, label) => {
    const updatedStatistics = [...statistics];
    const index = updatedStatistics.findIndex((stat) => stat.label === label);

    if (index !== -1) {
      updatedStatistics[index] = { ...updatedStat };
      setStatistics(updatedStatistics);
    }
  };

  const handleDeleteStatistic = (statLabel) => {
    const updatedStatistics = statistics.filter(
      (stat) => stat.label !== statLabel
    );
    setStatistics(updatedStatistics);
  };

  const addNewStatistic = (newStat) => {
    setStatistics([...statistics, newStat]);
  };

  // ------------------- Experience -----------
  // useEffect(() => {
  //   console.log("Updated statistics:", statistics);
  // }, [statistics]);

  const updateExperience = (updatedExperience, position) => {
    setExperience((prevData) =>
      prevData.map((experience) =>
        experience.position === position
          ? { ...experience, ...updatedExperience }
          : experience
      )
    );
  };

  const deleteExperience = (position) => {
    setExperience((prevData) =>
      prevData.filter((experience) => experience.position !== position)
    );
  };

  // ------------------- Education -----------
  // useEffect(() => {
  //   console.log("Updated Expreience :", experience);
  // }, [experience]);

  const updateEducation = (updatedEducation, type) => {
    setEducation((prevData) =>
      prevData.map((education) =>
        education.type === type
          ? { ...education, ...updatedEducation }
          : education
      )
    );
  };

  const deleteEducation = (type) => {
    setEducation((prevData) =>
      prevData.filter((education) => education.type !== type)
    );
  };

  // ------------------- Education -----------
  // useEffect(() => {
  //   console.log("Updated Education :", education);
  // }, [education]);

  return (
    <div className='w-screen mb-5 font-mono flex flex-col'>
      <div className='w-full flex justify-between items-center text-white p-4'>
        <h2 className='text-xl sm:text-base px-3 py-1 flex items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold'>
          <span class=' cursor-pointer'>Data</span>
          <span className='w-[2px] h-[80%] bg-gray-500 mx-1' />
          | Edit About
          <FiChevronRight />
        </h2>
        <h2
          className='text-4xl mr-10 sm:mr-0 sm:text-2xl p-2  items-center gap-1 rounded-full   text-pink-500  font-semibold'
          onClick={() => {
            handleOpenFormModal();
          }}
        >
          <BiAddToQueue />
        </h2>
      </div>
      <div className='flex-grow p-4 overflow-y-auto text-black dark:text-white'>
        <ul className='space-y-4'>
          <li
            className='bg-transparent border-2 border-gray-600 p-2 rounded-lg'
            onClick={() => {
              setSelectedAbout(aboutData);
              setClose(!close);
            }}
          >
            <div className='flex items-center justify-between cursor-pointer'>
              <strong className='cursor-pointer ml-1 font-extrabold'>
                {aboutData.title}
              </strong>
              <div className='flex gap-3  text-xl'>
                <button onClick={() => handleEditAbout(aboutData)}>
                  <BsPencilSquare />
                </button>
                <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                  {close ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
            </div>
            {aboutData == selectedAbout && close && (
              <div>
                <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                <AboutDetailsDropdown aboutData={aboutData} />
              </div>
            )}
          </li>

          <li className='bg-transparent border-2 border-gray-600 p-2 rounded-lg'>
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={() => setSkillsClose(!skillsClose)}
            >
              <strong className='cursor-pointer ml-1 font-extrabold'>
                Skills
              </strong>
              <div className='flex gap-3 text-2xl'>
                <button onClick={openAddSkill}>
                  <BiAddToQueue />
                </button>
                <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                  {skillsClose ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
            </div>
            {aboutData && skillsClose && (
              <div>
                <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                {skills.map((skill, index) => (
                  <EditSkills
                    key={index}
                    skillsData={skill}
                    onSave={(newSkill, name) => {
                      updateSkill(newSkill, name);
                    }}
                    onDelete={(skillName) => {
                      handleDeleteSkill(skillName);
                    }}
                  />
                ))}
                {/* {openAddSkillModal && <AddSkill />} */}
              </div>
            )}
            {openAddSkillModal && (
              <AddSkill
                isOpen={openAddSkill}
                closeModal={closeAddSkill}
                addNewSkill={(newSkill) => addNewSkill(newSkill)}
              />
            )}
          </li>

          <li className='bg-transparent border-2 border-gray-600 p-2 rounded-lg'>
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={() => setStatisticsClose(!statisticsClose)}
            >
              <strong className='cursor-pointer ml-1 font-extrabold'>
                Statistics
              </strong>
              <div className='flex gap-2 '>
                <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                  {statisticsClose ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
            </div>
            {aboutData && statisticsClose && (
              <div>
                <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                {statistics.map((statistic, index) => (
                  <EditStatistics
                    key={statistic.label}
                    statisticsData={statistic}
                    onSave={(state, label) => {
                      updateStatistic(state, label);
                    }}
                    onDelete={handleDeleteStatistic}
                  />
                ))}
              </div>
            )}
          </li>

          <li className='bg-transparent border-2 border-gray-600 p-2 rounded-lg'>
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={() => setExperienceClose(!experienceClose)}
            >
              <strong className='cursor-pointer ml-1 font-extrabold'>
                Experience
              </strong>
              <div className='flex gap-2 '>
                <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                  {experienceClose ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
            </div>
            {experience && experienceClose && (
              <div>
                <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                {experience.map((experience) => (
                  <EditExperience
                    key={experience.position}
                    experienceData={experience}
                    onSave={(exp, pos) => { updateExperience(exp, pos) }}
                    onDelete={deleteExperience}
                  />
                ))}
              </div>
            )}
          </li>

          <li className='bg-transparent border-2 border-gray-600 p-2 rounded-lg'>
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={() => setEducationClose(!educationClose)}
            >
              <strong className='cursor-pointer ml-1 font-extrabold'>
                Education
              </strong>
              <div className='flex gap-2 '>
                <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                  {educationClose ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
            </div>
            {education && educationClose && (
              <div>
                <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                {education.map((education) => (
                  <EditEducation
                    key={education.type}
                    educationData={education}
                    onSave={(exp, type) => { updateEducation(exp, type) }}
                    onDelete={deleteEducation}
                  />
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>

      <AboutFormModal
        isOpen={isFormModalOpen}
        closeModal={handleCloseFormModal}
        aboutData={aboutData}
        onSave={(newAboutData) => {
          updateAboutData(newAboutData);
        }}
      />
    </div>
  );
};

export default EditAbout;
