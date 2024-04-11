import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
const SingleImageUploader = () => {
  const [image, setImage] = useState();
  const [img, setImg]=useState('')
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log('img', image); 
  };

  const upload = async(e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const toastId = toast.loading('uploading...')
  
  const formData = new FormData();
  formData.append('profileImage', image);
  console.log('form', formData.values, formData); 
   await axios.post("http://localhost:5000/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      })
      .then((response) => {
        console.log("Image uploaded successfully:", response.data);
        setImg(response.data.data.url)
        toast.dismiss(toastId)
        toast.success(response.data.message)
      })
      .catch((error) => {
        console.error("Error during image upload:", error);
      });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <form onSubmit={upload}>
        <input
          className="upload"
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && (
          <div>
            <h2>Selected Image</h2>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <img
                style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "100%" }}
                src={URL.createObjectURL(image)} // Use URL.createObjectURL to display the selected image
                alt="Selected"
              />
              <button type="submit" style={{ padding: 10, cursor: "pointer", border: "none", borderRadius: 10, backgroundColor: "antiquewhite" }}>
                Update
              </button>
            </div>
          </div>
        )}
        </form>
        <div>
          <h1>uploaded image</h1>
          <img src={img} alt="img"/>
        </div>
    </div>
  );
};

export default SingleImageUploader;
