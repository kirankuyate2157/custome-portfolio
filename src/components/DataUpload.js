// import React, { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { FcUpload } from 'react-icons/fc';

// const DataUpload = () => {
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const fileInputRef = useRef();

//   const openUploadForm = () => {
//     setShowUploadForm(true);
//   };

//   const closeUploadForm = () => {
//     setShowUploadForm(false);
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     // Kiran Portfolio data (you can customize it for your user's data)
//     const kiranData = {
//       SocialLinks: {
//         Twitter: 'https://twitter.com/kuyatekiran',
//         LinkedIn: 'https://www.linkedin.com/in/kirankuyate',
//         GitHub: 'https://github.com/kirankuyate2157',
//       },
//       // Add other data here...
//     };

//     if (fileInputRef.current.files.length > 0) {
//       const file = fileInputRef.current.files[0];
//       const storageRef = storage.ref(`/user_data/${file.name}`);
//       const uploadTask = storageRef.put(file);

//       uploadTask.on(
//         'state_changed',
//         (snapshot) => {
//           // Handle progress (optional)
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress}% done`);
//         },
//         (error) => {
//           // Handle errors (optional)
//           console.error('Error uploading the file:', error);
//           setUploadStatus('Error uploading data.');
//         },
//         () => {
//           // Handle successful upload
//           setUploadStatus('Data uploaded successfully');

//           // Update Kiran's data in Firebase (you need to define the Firebase structure)
//           const kiranRef = storage.ref('/kiran_data.json');
//           kiranRef.put(JSON.stringify(kiranData));
//         }
//       );
//     }
//   };


  

//   return (
//     <div className="relative">
//       <button
//         onClick={openUploadForm}
//         className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
//       >
//         Upload Data
//       </button>
//       {showUploadForm && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ type: 'spring', stiffness: 260, damping: 20 }}
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//         >
//           <div className="bg-white p-4 rounded shadow-lg w-1/2">
//             <button onClick={closeUploadForm} className="float-right text-gray-500">
//               <FcUpload size="24" />
//             </button>
//             <h2 className="text-xl font-semibold mb-4">Upload Data</h2>
//             {uploadStatus ? (
//               <div className="text-center">
//                 <p>{uploadStatus}</p>
//               </div>
//             ) : (
//               <form onSubmit={handleUpload}>
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">Select a file to upload:</label>
//                   <input type="file" ref={fileInputRef} />
//                 </div>
//                 <div className="mb-4">
//                   <p className="text-sm text-gray-600">
//                     Follow the naming convention and structure as per the provided schema. Make sure to provide accurate data.
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
//                   >
//                     Upload
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default DataUpload;
