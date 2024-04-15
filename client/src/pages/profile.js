import React, { useEffect, useState } from "react";
import Axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
import { MdOutlineEdit } from "react-icons/md";
import { IoSettingsOutline,IoCameraOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

import toast from 'react-hot-toast'
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../reducers/userSlice";
import Courses from "../components/courses";
import Cookie from 'js-cookie'
import EditUserForm from "../components/editForm";
import Upload from "../components/upload";

const Profile = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { isAuthenticated, userData,mycourse  } = useSelector((state) => state.user);
  const token = Cookie.get('Jalebi')
  const [errorMsg, setError]=useState('')
  const [modal, setModal]=useState(false)
  const [modal2, setModal2]=useState(false)
  const [isverified, setCourse]=useState(null)

  useEffect(() => {
    const getUserData = async (id) => {
      try {
        const toastId=toast.loading('loading data...', {position:'top-center'})
        await Axios.get(
          `https://backend-omega-orpin.vercel.app/profile?id=${id}`
        ).then((res) => {
          const userData =res.data.userData[0]
          const courseData =res.data.courseData
          setCourse(res.data?.isVerified)
          toast.dismiss(toastId)
         dispatch(loginSuccess({userData, courseData}))
          // console.log("profile:",res.data)
        });
      } catch (e) {
       setError(e.response.data.message)
      }
    };
    if (token) {
      // if(!mycourse){
        getUserData(userData.id);
      // }
    }else{
    navigate('/login')
    }
 console.log('check',isverified)
  }, [token, userData?.profile_url]);
  // console.log("data--",mycourse)
  const closeModal = () => {
    setModal(false);
    setModal2(false);
   
  };

  return (
    <>
    <div className="p-container">
      <div className="profile">
        <div className="div">
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          {
            userData&&userData?.profile_url?(
              <img style={{borderRadius:10}} src={userData?.profile_url} alt="img" />
            ):(
              <>
<       span className="profileImg" >
          <FaRegUser size={80} />
        </span>
        </>
            )
          }
           <span className="icon" onClick={() => setModal(true)} >
          <IoCameraOutline size={30} />
        </span>
        <span>{userData?.roles}</span>
    </div>
        </div>
        <div className="div">
          <h1>My Profile</h1>
          <div className="div3">
            <div>Name</div>
            <div>Email</div>
            <div>{userData?.name}</div>
            <div>{userData?.email}</div>
          </div>
          <span  onClick={userData?.roles==='user' ? null : () => setModal2(true)} 
          style={{display:'flex', justifyContent:'flex-end', padding:10, cursor:'pointer'}}><MdOutlineEdit color={userData?.roles==='user' ? 'grey' : 'purple'} size={25}/></span>
          {
           <Link to={userData?.roles === 'user' ? null : '/profile/setting'} style={{display:'flex', justifyContent:'flex-end', padding:10, cursor:'pointer'}}><IoSettingsOutline color="black" size={25}/></Link>
          }
         
        </div>
        </div>
      
          <>
          <h1 style={{textAlign:'center'}}>Enrolled Courses</h1>
          {  mycourse&&mycourse?.length>0?(
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
            <Courses courses={mycourse} isvisible={true} deletebtn={true}/>
            </div>
            ):<p style={{textAlign:'center'}}>{errorMsg}</p> }
         </>
      </div>
{
  modal&&(
    <div style={{backgroundColor:'rgba(0, 0, 0, 0.2)', position:'absolute', top:50,
    left:30, width:280, height:460, borderRadius:10}}>
      <Upload closeModal={closeModal} id={userData?.id}/>
    </div>
    
  )
}
{
  modal2&&(
    <div style={{backgroundColor:'rgba(0, 0, 0, 0.2)', position:'absolute', top:80,
    right:30, width:280, height:300, borderRadius:10}}>
    <EditUserForm closeModal={closeModal}/>
    </div>
  )
}

    </>
  );
};

export default Profile;
