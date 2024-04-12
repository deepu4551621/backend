import React, { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { RiDeleteBin7Line } from "react-icons/ri";
import {useSelector, useDispatch} from 'react-redux'
import { logout } from "../reducers/userSlice";
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios  from "axios";
import Cookie from 'js-cookie'
const Setting = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const { userData, isAuthenticated } = useSelector((state) => state.user);
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const [verified, SetVerified] = useState(false);

  useEffect(()=>{
if(!isAuthenticated){
Cookie.remove('Jalebi')
navigate('/login')
}
else if(userData?.roles==='user'){
  navigate('/profile')
}

  }, [isAuthenticated])
  const closeModal = () => {
    setModal(false);
  };
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const verifyUser = async(e) => {
    e.preventDefault();
    // console.log('p',password)
       const toastId= toast.loading('verifying...',)
        try {
          const response =  await axios.post(`https://backend-omega-orpin.vercel.app/verifyuser?email=${userData?.email}`, {password});
            if(response.status===200){
                toast.dismiss(toastId)
                toast.success(response.data.message)
               SetVerified(response.data.success)
            }

          } catch (e) {
            toast.dismiss(toastId)
            toast.error(e.response.data.error)
            console.error('Error verifying user:', e);
          }
  };
  const deleteUser= async(e)=>{
        e.preventDefault();
        console.log('p',password)
           const toastId= toast.loading('Deleting account...',)
            try {
              const response =  await axios.delete(`https://backend-omega-orpin.vercel.app/deleteuser?id=${userData?.id}`);
                if(response.status===200){
                    toast.dismiss(toastId)
                    toast.success(response.data.message)
                   dispatch(logout())
                }
    
              } catch (e) {
                toast.dismiss(toastId)
                toast.error(e.response.data.error)
                console.error('Error verifying user:', e);
              }
      };
  
  return (
    <>
      <div
        style={{ backgroundColor: "#f5f5f5", width: "100%", padding: "2rem" }}
      >
        <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Name: 
        <span style={{color:'green'}}>{userData?.name}</span></div>
        <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
          Email: <span style={{color:'green'}}>{userData?.email}</span>
        </div>
        <button
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
          }}
          onClick={() => setModal(true)}
        >
          Delete Account
        </button>
      </div>
      {modal && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            position: "absolute",
            top: 70,
            left: 30,
            width: 280,
            height: 460,
            borderRadius: 10,
          }}
        >
          <span
            style={{ float: "right", padding: 10, cursor: "pointer" }}
            onClick={closeModal}
          >
            <GrClose size={20} color="white" />
          </span>
          {verified ? (
            <div onClick={deleteUser} style={{backgroundColor:'black',margin:15,top:'70px', 
             position:'absolute', cursor:'pointer',borderRadius:10 , textAlign:'center'}}>
                <p style={{color:'white'}}>press button to delete account permanently!</p>
        <RiDeleteBin7Line size={110} color="red"/>
        <h2 style={{color:'white'}}>Delete</h2>
            </div>
           
          ) : (
            <form onSubmit={verifyUser}>
              <div style={{ marginBottom: "10px", padding: 20 }}>
                <h3 style={{ textAlign: "center", color: "white" }}>
                  Enter password for verification
                </h3>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  required
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                }}
              >
                Verify
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default Setting;
