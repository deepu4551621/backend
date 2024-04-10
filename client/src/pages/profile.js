import React, { useEffect, useState } from "react";
import Axios from "axios";
import { MdOutlineEdit } from "react-icons/md";
import Cookie from "js-cookie";
import ProfileImageUploader from "../components/profileSection";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.user.userData);
  const [edit, setEdit] = useState(true);
  const [editValue, setVal] = useState("");
  const [data, setData] = useState([]);
  const [errorMsg, setError]=useState('')
  const userData = {
    name: "Deepu",
    email: "D@gmail.com",
    courses: ["python", "java", "web dev", "ml", "javascript", "c++"],
  };

  useEffect(() => {
    console.log("profile:", user.id);
    if (user.id) {
      getUserData(user.id);
    }
  }, []);
  const getUserData = async (id) => {
    try {
      await Axios.get(
        `https://backend-omega-orpin.vercel.app/profile?id=${id}`
      ).then((res) => {
        setData(res.data?.courseData);
        console.log("getuserData: ", res);
      });
    } catch (error) {
      console.log("authError", error.response.data.message);
    }
  };
  const handleChange = () => {
    console.log("changeprofile");
  };
  const handleEdit = (id) => {
    setEdit(!edit);
    setVal(id);
  };
  return (
    <>
      <div className="profile">
        <div className="div">
          <ProfileImageUploader />
        </div>
        <div className="div">
          <h1>My Profile</h1>
          <div className="div3">
            <div>Name</div>
            <div>Email</div>
            <div>My Courses</div>

            {/* Data row */}
            {/* Assuming userData is an object containing name, email, and courses */}
            <div>{user?.name}</div>
            <div>{user?.email}</div>
            <div>
              {data ? (
                data.map((course, index) => (
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
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(index)}
                    >
                      <MdOutlineEdit />
                    </span>
                  </ul>
                ))
              ) : (
                <p>{errorMsg}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {edit && (
        <div
          style={{
            backgroundColor: "grey",
            width: 400,
            height: 100,
            borderRadius: 10,
            position: "relative",
            left: "40%",
          }}
        >
          <div style={{ margin: 10, padding: 20 }}>
            <input
              type="text"
              value={userData.courses[editValue]}
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
      )}
    </>
  );
};

export default Profile;
