import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";

const GuidDropdown = () => {
    const [close, setClose] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className='grid sm:text-sm text-black font-mono dark:text-white grid-cols-12 mt-1 rounded p-2 ml-4 overflow-hidden'
            >
                <div className='col-span-8 sm:col-span-12'>
                
                  
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-2">Profile Section</h2>
                        <p>
                            {`    In the profile section, you can view and edit your personal data. This
                        includes your name, username, portfolio URL, portfolio status
                        (public or private), views, and likes. You can click on your
                        portfolio image to view it in full size.`}
                        </p>

                    </section>

                 
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-2">Other Sections</h2>
                        <p>
                            {`In other sections, you can add and edit your projects, skills,
                        articles, education, experience, and more. The portfolio link in the
                        profile section will take you to your complete Personal portfolio.
                    `}</p>
                   
                    </section>

                   
                    <section>
                        <p>
                            {` Congratulations! You've successfully navigated through the user
                        guide. If you have any further questions, feel free to reach out in
                        the footer section by saying hello. 👋🏻`}
                        </p>
                    </section>

                </div>
            </motion.div>

        </AnimatePresence>
    );
};

const Guid = () => {
    const [selectedProfile, setSelectedProfile] = useState(false);

    return (
        <div className="w-full">
            <div className='flex-grow p-4 overflow-y-auto text-black dark:text-white'>
                <ul className='space-y-4'>
                    <li
                        className='bg-transparent border-2 border-gray-600 p-2 rounded-lg'
                        onClick={() => setSelectedProfile(!selectedProfile)}
                    >
                        <div className='flex items-center justify-between cursor-pointer'>
                            <strong className='cursor-pointer ml-1 font-semibold'>
                               {` Guid : How to use ?`}
                            </strong>

                        </div>
                        {selectedProfile && (
                            <div>
                                <hr className='mb-3 mt-1 border-gray-500 border-1 dark:border-gray-700' />
                                <GuidDropdown />
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Guid;
