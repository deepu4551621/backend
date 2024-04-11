import React, { useEffect, useState } from 'react';
import Courses from '../components/courses';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookie from 'js-cookie';
import {useNavigate} from 'react-router-dom'
import RefreshToken from '../components/refresh';
import  {loginSuccess}  from '../reducers/userSlice';
import { setAvailableCourses } from '../reducers/courseSlice';
import {useDispatch, useSelector} from 'react-redux'
const Home = () => {
const navigate=useNavigate()
  const { isAuthenticated } = useSelector((state) => state.user);
  const { availableCourses } = useSelector((state) => state.data);
  const dispatch=useDispatch();
  const token = Cookie.get('Jalebi');
  const refreshToken = Cookie.get('RefreshJalebi');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const toastId = toast.loading('Loading courses...');

        if (token) {
          const axiosConfig = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };

          const response = await axios.get('https://backend-omega-orpin.vercel.app', axiosConfig);
         if(response.status===200){
          const {userData, courseData,} = response.data
          dispatch(setAvailableCourses(courseData))
          dispatch(loginSuccess({userData}))
          toast.dismiss(toastId);
         }
        } else {
          // console.log('Token not available');
          navigate('/login')
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          try {
            const newAccessToken = await RefreshToken(refreshToken);
            if (newAccessToken) {
              // Retry fetching courses with the new access token
              await fetchCourses();
            } else {
              console.log('Failed to refresh token');
            }
          } catch (refreshError) {
            console.log('Error refreshing token:', refreshError);
          }
        } else {
          console.log('Error fetching courses:', error);
        }
      }
    };
    if(!isAuthenticated){
      fetchCourses();
    }
   
  }, [token, refreshToken]);

  return (
    <div className='home'>
      <h1>Courses We Offer</h1>
      <div className='courseDiv'>
        <Courses courses={availableCourses} />
      </div>
    </div>
  );
};

export default Home;
