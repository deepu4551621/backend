import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import { loginSuccess } from "../reducers/userSlice";
import { setAvailableCourses } from "../reducers/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/pagination";
const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = Cookie.get("Jalebi");
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const toastId = toast.loading("Loading courses...");

        if (token) {
          const axiosConfig = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get("https://backend-omega-orpin.vercel.app", axiosConfig);
          if (response.status === 200) {
            const { userData, courseData } = response.data;
            dispatch(setAvailableCourses(courseData));
            dispatch(loginSuccess({ userData }));
            toast.dismiss(toastId);
          }
        } 
      } catch (error) {
       console.log(error)
      }
    };
    if(!isAuthenticated){
    fetchCourses();
    }
  }, [token, isAuthenticated]);

  return (
    <div className="home">
      {isAuthenticated ? (
        <>
          <h1>Courses We Offer</h1>
            <Pagination/>
        </>
      ):(
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Link to='/signup' style={{backgroundColor:'purple', textAlign:'center', margin:10,
        padding:20,color:'white',textDecoration:'none', borderRadius:20}}>Get started</Link>
         <p>Signup to see the courses we offer</p>
        </div>
      )}
    
    </div>
  );
};

export default Home;
