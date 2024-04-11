import React, { useState } from 'react';
// import { Image, Transformation, CloudinaryContext } from 'cloudinary-react';
import { FaRegUser } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import ImageUploader from 'react-image-upload'
const UserImage = () => {
  const [image, setImage] = useState('');



 const onDrop = (pictureFiles) => {
  setImage(pictureFiles);
}
  return (
    <>
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
   
     <div style={{backgroundColor:'green'}}>
     <ImageUploader
          singleImage={true}
        />
     </div>
    </>
  );
};

export default UserImage;
