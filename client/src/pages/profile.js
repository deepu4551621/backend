import React, { useState } from "react";
import ImageUploader from "react-image-upload";
import { MdOutlineEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa"
import ProfileImageUploader from "../components/profileSection";
const Profile = () => {
  const [edit, setEdit] = useState(true);
  const [editValue, setVal]=useState('')
  const userData = {
    name: "Deepu",
    email: "D@gmail.com",
    courses: ["python", "java", "web dev", "ml", "javascript", "c++"],
  };
  const handleChange = () => {
    console.log("changeprofile");
  };
  const handleEdit = (id) => {
    setEdit(!edit)
setVal(id);
  }
  return (
    <>
    <div className="profile">
      <div className="div">
        <ProfileImageUploader/>
      </div>
      <div className="div">
        <h1>My Profile</h1>
        <div className="div3">
          <div>Name</div>
          <div>Email</div>
          <div>Courses</div>

          {/* Data row */}
          {/* Assuming userData is an object containing name, email, and courses */}
          <div>{userData?.name}</div>
          <div>{userData?.email}</div>
          <div>
            Render list of courses
            {userData.courses &&
              userData.courses.map((course, index) => (
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  key={index}
                >
                  <li key={course}>{course}</li>
                  <span style={{ cursor: "pointer" }} onClick={()=>handleEdit(index)}>
                   <MdOutlineEdit/>
                  </span>
                </ul>
              ))}
          </div>
        </div>
      </div>
    </div>
    {
        edit&&(
            <div style={{backgroundColor:'grey', width:400, height:100, borderRadius:10, 
            position:'relative', left:'40%'}}>
             <div style={{margin:10, padding:20}}>
                <input type="text"  value={userData.courses[editValue]} 
                onChange={(e) => {
                    // Assuming userData.courses is an array and editValue is the index of the course to edit
                    const updatedCourses = [...userData.courses];
                    updatedCourses[editValue] = e.target.value;
                    setVal({ ...userData, courses: updatedCourses });
                  }} 
                />
                <button>Update</button>
             </div>
            </div>
        )
    }
    </>
  );
};

export default Profile;
