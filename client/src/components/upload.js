import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
import { GrClose } from "react-icons/gr";
const SingleImageUploader = ({closeModal, id }) => {
  const [image, setImage] = useState();
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log('img', e.target.files[0]); 
    
  };

  const upload = async (e) => {
    e.preventDefault();

    try {
      const toastId = toast.loading('Uploading...', { position: 'top-left' });

      const formData = new FormData();
      formData.append('profileImage', image);
      formData.append('id', id);

      const response = await axios.post(
        "https://backend-omega-orpin.vercel.app/uploadImage",formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data.message);
      toast.dismiss(toastId);
      closeModal();
    } catch (error) {
      console.error("Error during image upload:", error);
      toast.error("Failed to upload image. Please try again later.");
    }
  };
const handleClick=()=>{
  closeModal()
}
  return (
    <div style={{ padding:10 }}>
      <span style={{float:"right", cursor:'pointer'}} onClick={handleClick}>
      <GrClose size={20}/>
      </span>
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
            <h2 style={{color:'white'}}>Selected Image</h2>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <img
                style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "10%" }}
                src={URL.createObjectURL(image)} // Use URL.createObjectURL to display the selected image
                alt="Selected"
              />
              <button type="submit" style={{ padding: 10, cursor: "pointer", border: "none", borderRadius: 10, backgroundColor: "#181817" }}>
                Update
              </button>
            </div>
          </div>
        )}
        </form>
    </div>
  );
};

export default SingleImageUploader;
