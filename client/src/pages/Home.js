import React, { useEffect, useState } from "react";
import Courses from "../components/courses";
import axios from "axios";
import toast from "react-hot-toast";
import Cookie from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import RefreshToken from "../components/refresh";
import { loginSuccess } from "../reducers/userSlice";
import { setAvailableCourses } from "../reducers/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/pagination";
const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, roles } = useSelector((state) => state.user);
  const { availableCourses } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const token = Cookie.get("Jalebi");
  const refreshToken = Cookie.get("RefreshJalebi");
  // console.log('allcourses', availableCourses)
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
        } else {
          // console.log('Token not available');
          navigate("/login");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const newAccessToken = await RefreshToken(refreshToken);
            if (newAccessToken) {
              // Retry fetching courses with the new access token
              await fetchCourses();
            } else {
              // console.log('Failed to refresh token');
            }
          } catch (refreshError) {
            // console.log('Error refreshing token:', refreshError);
          }
        }
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
