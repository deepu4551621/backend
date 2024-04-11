import React, { useEffect, useState } from "react";
import Axios from "axios";
import { MdOutlineEdit } from "react-icons/md";
import toast from 'react-hot-toast'
import { FaRegUser } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import Upload from "../components/upload";
import { useSelector, useDispatch } from "react-redux";
// import { enroll } from "../reducers/courseSlice";
import Courses from "../components/courses";
import {useNavigate} from 'react-router-dom'
const Profile = () => {
  const navigate=useNavigate()
  
  const { isAuthenticated, userData, error } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [errorMsg, setError]=useState('')
  const [modal, setModal]=useState(false)
  useEffect(() => {
    const getUserData = async (id) => {
      try {
        const toastId=toast.loading('loading data...')
        await Axios.get(
          `https://backend-omega-orpin.vercel.app/profile?id=${id}`
        ).then((res) => {
          setData(res.data.courseData);
        //  dispatch(enroll(res.data.courseData))
          // console.log("data: ", res.data.courseData);
          toast.dismiss(toastId)
        });
      } catch (e) {
        console.log("Error", e.response.data.message);
        setError(e.response.data.message)
      }
    };
    if (isAuthenticated) {
      getUserData(userData.id);
    }else{
    navigate('/login')
    }
  }, [isAuthenticated]);
const handleClick=()=>{
  setModal(true)
}
  return (
    <>
    <div style={{display:'flex', flexDirection:'column',backgroundColor:'antiquewhite'}}>
      <div className="profile">
        <div className="div">
        <div className='profile'>
        <div className='div'>
          <span className="profileImg" >
          <FaRegUser size={80} />
        </span>
        <span className="icon"onClick={handleClick} >
          <IoCameraOutline size={30} />
        </span>
        </div>
    </div>
        </div>
        <div className="div">
          <h1>My Profile</h1>
          <div className="div3">
            <div>Name</div>
            <div>Email</div>
            <div >My Courses</div>

            {/* Data row */}
            {/* Assuming userData is an object containing name, email, and courses */}
            <div>{userData?.name}</div>
            <div>{userData?.email}</div>
            <div>
          
            {errorMsg}
            </div>
          </div>
        </div>
        </div>
        {
          data?(
            <>
            <h1 style={{textAlign:'center'}}>Enrolled Courses</h1>
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
            <Courses courses={data} isvisible={true}/>
            </div>
            </>
          ):{errorMsg}
        }
      </div>
{
  modal&&(
    <div style={{backgroundColor:'grey', position:'absolute', top:50,
    left:30, width:500, height:500, borderRadius:10}}>
      <Upload/>
    </div>
    
  )
}
    </>
  );
};

export default Profile;
