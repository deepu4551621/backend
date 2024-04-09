import React, { useState } from 'react';
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import { FaRegUser } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";

const ProfileImageUploader = () => {
  const [image, setImage] = useState('j');


  return (
    <div className='profile'>
        <div className='div'>
          <span className="profileImg">
          <FaRegUser size={80} />
        </span>
        <span className="icon" >
          <IoCameraOutline size={30} />
        </span>
        </div>
     
    </div>
  );
};

export default ProfileImageUploader;
