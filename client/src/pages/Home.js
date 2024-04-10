import React, { useEffect, useState } from 'react'
import Courses from '../components/courses';
import  axios  from 'axios';
import toast from 'react-hot-toast'
import Cookie from 'js-cookie'
import RefreshToken from '../components/refresh';
const Home = () => {
  const token= Cookie.get('Jalebi')
    const refreshToken = Cookie.get('RefreshJalebi')
  const [courses, setCourses]=useState([])
  useEffect(()=>{
   const toastId= toast.loading('loading...')
    
if(token){
    authenticate(token)
}else if(refreshToken){

}
else{
    console.log('token not available')
}
toast.dismiss(toastId)
  
  },[])
  const authenticate=async(token)=>{
    const axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  try {
    await axios.get('https://backend-omega-orpin.vercel.app', axiosConfig).then((res)=>{
        setCourses(res.data)
        console.log('data: ',res.data)
        
       })
  } catch (error) {
    if(error.response&&error.response.status===401){
      const newAccessToken = await RefreshToken(refreshToken);
      return authenticate(newAccessToken)
    }
    console.log('authError', error)
  }
  }
  return (
    <div className='home'>
   <h1>Courses We Offer</h1>
   <div className='courseDiv'>
   <Courses courses={courses}/>
   </div>
    </div>
  )
}

export default Home