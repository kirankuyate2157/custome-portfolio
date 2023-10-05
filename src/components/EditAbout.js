import React, { useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import Modal from "react-modal";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { FiChevronUp, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BiAddToQueue } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import EditSkills from "./EditSkills";
import EditStatistics from "./EditStatistics";
import EditExperience from "./EditExperience";
import EditEducation from "./EditEducation";

import KiranPortfolioData from "../assets/portfolioData";
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
          className="grid sm:text-sm text-black dark:text-white grid-cols-12 mt-1 rounded p-2 ml-4  overflow-hidden"
        >
          <div className="col-span-8 sm:col-span-12">
            <div className="mb-2">
              <h4 className="font-semibold">Title</h4>
              <p className="text-black dark:text-gray-300">
                {aboutData.title}
              </p>
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

            <div className="mb-2">
              <h4 className="font-semibold">Bio</h4>
              {aboutData.bio.map((paragraph, index) => (
                <p key={index} className="text-black dark:text-gray-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className='col-span-1 sm:hidden'/>
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

const AboutFormModal = ({
  isOpen,
  closeModal,
  aboutData,
  handleSave,
}) => {
  const [formData, setFormData] = useState({ ...aboutData });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white w-full sm:w-96 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Edit About
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-gray-600">Title</label>
            <input
              type="text"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-gray-600">
              Profile Image
            </label>
            <input
              type="text"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Profile Image URL"
              value={formData.profileImg}
              onChange={(e) =>
                setFormData({ ...formData, profileImg: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-gray-600">Bio</label>
            <textarea
              className="block w-full h-24 py-2 px-3 border border-gray-300 rounded-md bg-gray-100 text-gray-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Bio"
              value={formData.bio.join("\n")}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value.split("\n") })
              }
            />
          </div>
          {/* Add more fields as needed */}
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            onClick={() => {
              handleSave(formData);
              closeModal();
            }}
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

const EditAbout = ({ aboutData, onSave, onCancel, isEditing }) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedAbout, setSelectedAbout] = useState(null);
  const [close, setClose] = useState(false);
  const [skillsClose, setSkillsClose] = useState(false);
  const [skills, setSkills] = useState([...aboutData.skills]);
  const [statisticsClose, setStatisticsClose] = useState(false);
  const [statistics, setStatistics] = useState([...aboutData.statistics]);
  const [experienceClose, setExperienceClose] = useState(false);
  const [experience, setExperience] =  useState([...KiranPortfolioData.About.aboutPageData.experienceData]);
  const [educationClose, setEducationClose] = useState(false);
  const [education, setEducation] =  useState([...KiranPortfolioData.About.aboutPageData.educationData]);

  
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

  const handleSaveAbout = (updatedAboutData) => {
    onSave(updatedAboutData);
    handleCloseFormModal();
  };

  const handleSaveSkill = (updatedSkill) => {
    // Implement the logic to save the skill
    // You can update the 'skills' state with the new skill data
    const updatedSkills = skills.map((skill) =>
      skill.name === updatedSkill.name ? updatedSkill : skill
    );
    setSkills(updatedSkills);
  };

  const handleDeleteSkill = (skillName) => {
    // Implement the logic to delete the skill
    // You can remove the skill from the 'skills' state
    const updatedSkills = skills.filter((skill) => skill.name !== skillName);
    setSkills(updatedSkills);
  };
   const handleSaveStatistics = (updatedSkill) => {
    // Implement the logic to save the skill
    // You can update the 'skills' state with the new skill data
    const updatedSkills = skills.map((skill) =>
      skill.name === updatedSkill.name ? updatedSkill : skill
    );
    setSkills(updatedSkills);
  };

  const handleDeleteStatistics = (skillName) => {
    // Implement the logic to delete the skill
    // You can remove the skill from the 'skills' state
    const updatedSkills = skills.filter((skill) => skill.name !== skillName);
    setSkills(updatedSkills);
  };


  const saveExperience = (data) => {
    // Check if the experience already exists
    const index = experience.findIndex((item) => item.position === data.position);
    if (index !== -1) {
      // Update existing experience
      const updatedData = [...experience];
      updatedData[index] = data;
      setExperience(updatedData);
    } else {
      // Add new experience
      setExperience([...experience, data]);
    }
  };

  // Function to delete an experience
  const deleteExperience = (position) => {
    // Filter out the experience to delete
    const updatedData = experience.filter((item) => item.position !== position);
    setExperience(updatedData);
  };



// Function to update education data
const handleSaveEducation = (updatedEducation) => {
  // Find the index of the education to be updated
  const indexToUpdate = educationData.findIndex(edu => edu.type === updatedEducation.type);

  if (indexToUpdate !== -1) {
    // Create a copy of the education data and update the specific education
    const updatedEducationData = [...educationData];
    updatedEducationData[indexToUpdate] = updatedEducation;
    setEducationData(updatedEducationData);
  }
};

// Function to delete education data
const handleDeleteEducation = (type) => {
  // Filter out the education to be deleted
  const updatedEducationData = educationData.filter(edu => edu.type !== type);
  setEducationData(updatedEducationData);
};

  return (
    <div className="w-screen mb-5 font-mono flex flex-col">
      <div className="w-full flex justify-between items-center text-white p-4">
        <h2 className="text-xl sm:text-base px-3 py-1 flex items-center gap-1 rounded-full bg-pink-800 border border-primary font-semibold">
          <span class=" cursor-pointer">Data</span>
          <span className="w-[2px] h-[80%] bg-gray-500 mx-1" />
          | Edit About
          <FiChevronRight />
        </h2>
        <h2
          className="text-4xl mr-10 sm:mr-0 sm:text-2xl p-2  items-center gap-1 rounded-full   text-pink-500  font-semibold"
          onClick={() => {
            handleOpenFormModal();
          }}
        >
          <BiAddToQueue />
        </h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto text-black dark:text-white">
        <ul className="space-y-4">
          <li
            className="bg-transparent border-2 border-gray-600 p-2 rounded-lg"
            onClick={() => {
              setSelectedAbout(aboutData);
              setClose(!close);
            }}
          >
            <div className="flex items-center justify-between cursor-pointer">
              <strong className="cursor-pointer ml-1 font-extrabold">
                {aboutData.title}
              </strong>
              <div className="flex gap-2 ">
                <button onClick={() => handleEditAbout(aboutData)}>
                  <BsPencilSquare />
                </button>
                <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                    { close ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
              </div>
            </div>
            {aboutData == selectedAbout && close && (
              <div>
                <hr className="mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700" />
                <AboutDetailsDropdown aboutData={aboutData} />
              </div>
            )}
            
          </li>

          <li
            className="bg-transparent border-2 border-gray-600 p-2 rounded-lg"
           
          >
            <div className="flex items-center justify-between cursor-pointer"
             onClick={() => setSkillsClose(!skillsClose)}
            >
              <strong className="cursor-pointer ml-1 font-extrabold">
                Skills
              </strong>
              <div className="flex gap-2 ">
              <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                    { skillsClose ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
              </div>
            </div>
            {aboutData && skillsClose && (
              <div>
                <hr className="mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700" />
                {skills.map((skill, index) => (
                  <EditSkills
                    key={index}
                    skillsData={skill}
                    onSave={handleSaveSkill}
                    onDelete={handleDeleteSkill}
                  />
      ))}
              </div>
            )}
            
          </li>

          <li
            className="bg-transparent border-2 border-gray-600 p-2 rounded-lg"
           
          >
            <div className="flex items-center justify-between cursor-pointer"
             onClick={() => setStatisticsClose(!statisticsClose)}
            >
              <strong className="cursor-pointer ml-1 font-extrabold">
              Statistics
              </strong>
              <div className="flex gap-2 ">
              <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                    { statisticsClose ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
              </div>
            </div>
            {aboutData && statisticsClose && (
              <div>
                <hr className="mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700" />
                {statistics.map((state, index) => (
                  <EditStatistics
                    key={index}
                    statisticsData={state}
                    onSave={handleSaveStatistics}
                    onDelete={handleDeleteStatistics}
                  />
      ))}
              </div>
            )}
            
          </li>


          <li
            className="bg-transparent border-2 border-gray-600 p-2 rounded-lg"
           
          >
            <div className="flex items-center justify-between cursor-pointer"
             onClick={() => setExperienceClose(!experienceClose)}
            >
              <strong className="cursor-pointer ml-1 font-extrabold">
              Experience
              </strong>
              <div className="flex gap-2 ">
              <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                    { experienceClose ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
              </div>
            </div>
            {experience && experienceClose && (
              <div>
                <hr className="mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700" />
                {experience.map((experience, index) => (
                    <EditExperience
                      key={index}
                      experienceData={experience}
                      onSave={saveExperience}
                      onDelete={deleteExperience}
                    />
                  ))}
                    </div>
                  )}
             </li>

             <li
            className="bg-transparent border-2 border-gray-600 p-2 rounded-lg"
           
          >
            <div className="flex items-center justify-between cursor-pointer"
             onClick={() => setEducationClose(!educationClose)}
            >
              <strong className="cursor-pointer ml-1 font-extrabold">
              Education
              </strong>
              <div className="flex gap-2 ">
              <button className='text-pink-600  flex text-3xl font-bold hover:text-indigo-800'>
                    { educationClose ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
              </div>
            </div>
            {education && educationClose && (
              <div>
                <hr className="mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700" />
                {education.map((education, index) => (
                    <EditEducation
                      key={index}
                      educationData={education}
                      onSave={saveExperience}
                      onDelete={deleteExperience}
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
        aboutData={selectedAbout || aboutData}
        handleSave={handleSaveAbout}
      />
    </div>
  );
};

export default EditAbout;
