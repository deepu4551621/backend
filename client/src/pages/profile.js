import React, { useEffect, useState } from "react";
import Axios from "axios";
import { MdOutlineEdit } from "react-icons/md";
import toast from 'react-hot-toast'
import { FaRegUser } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import Upload from "../components/upload";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "../reducers/userSlice";
import Courses from "../components/courses";
import {useNavigate} from 'react-router-dom'

const Profile = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const { isAuthenticated, userData, error } = useSelector((state) => state.user);
  // const [data, setData] = useState({});
  const [errorMsg, setError]=useState('')
  const [modal, setModal]=useState(false)
  const [mycourse, setCourse]=useState([])
  useEffect(() => {
    const getUserData = async (id) => {
      try {
        const toastId=toast.loading('loading data...')
        await Axios.get(
          `https://backend-omega-orpin.vercel.app/profile?id=${id}`
        ).then((res) => {
          const userData =res.data.userData[0]
          const courseData =res.data.courseData
          setCourse(courseData)
         dispatch(loginSuccess({userData, courseData}))
        //  setData(userData[0])
          // console.log("data: ", res.data);
          toast.dismiss(toastId)
        });
      } catch (e) {
        // console.log("Error", e.response.data.message);
        setError(e.response.data.message)
      }
    };
    if (isAuthenticated) {
      // const userId = userData?.id||userData[0].id
      getUserData(userData.id);
    }else{
    navigate('/login')
    }
 
  }, [userData.profile_url]);
  // console.log("data--",data)
  const closeModal = () => {
    setModal(false);
  };
  return (
    <>
    <div className="p-container">
      <div className="profile">
        <div className="div">
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          {
            userData&&userData?.profile_url?(
              <img style={{borderRadius:10}} src={userData?.profile_url}  />
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
        </div>
        </div>
        {
          userData?(
            <>
            <h1 style={{textAlign:'center'}}>Enrolled Courses</h1>
            <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
            <Courses courses={mycourse} isvisible={true}/>
            </div>
            </>
          ):{errorMsg}
        }
      </div>
{
  modal&&(
    <div style={{backgroundColor:'rgba(0, 0, 0, 0.2)', position:'absolute', top:50,
    left:30, width:280, height:460, borderRadius:10}}>
      <Upload closeModal={closeModal} id={userData?.id}/>
    </div>
    
  )
}
    </>
  );
};

export default Profile;
