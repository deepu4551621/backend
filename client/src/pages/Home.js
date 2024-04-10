import React, { useEffect, useState } from 'react';
import Courses from '../components/courses';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookie from 'js-cookie';
import RefreshToken from '../components/refresh';
import { login } from '../reducers/userSlice';
import {useDispatch} from 'react-redux'
const Home = () => {
  const dispatch=useDispatch();
  const token = Cookie.get('Jalebi');
  const refreshToken = Cookie.get('RefreshJalebi');
  const [courses, setCourses] = useState([]);
 const [user, setUser]=useState({});
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
          setCourses(response.data.courseData);
          setUser(response.data.userData)
          console.log('data:->', response.data)
          toast.dismiss(toastId);
        } else {
          console.log('Token not available');
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

    fetchCourses();
  }, [token, refreshToken]);

  return (
    <div className='home'>
      <h1>Courses We Offer</h1>
      <div className='courseDiv'>
        {/* <Courses courses={courses} /> */}
      </div>
    </div>
  );
};

export default Home;
