import React, { useState } from 'react';
import { uploadFile } from '@/services/firebaseConfig.js';

// components/ImageUploader.js
const Home = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const path = 'test'; // Change this to your desired path
    const imageName = image.name; // You can customize how you want to name the image

    try {
      const url = await uploadFile(image, path, imageName);
      setImageUrl(url);
      alert("Uploaded image..");
      setUploadError(null); // Clear any previous errors
    } catch (error) {
      console.log("Error uploading ", error)
      setUploadError('File upload failed. Please try again.'); // Set error message
    }
  };


  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>

      {uploadProgress > 0 && uploadProgress < 100 && (
        <progress value={uploadProgress} max="100"></progress>
      )}

      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
      {uploadError && <p style={{ color: 'red' }}>{uploadError}</p>}
    </div>
  );
};

export default Home;
