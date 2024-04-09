import React, { useEffect, useState } from 'react'
import Courses from '../components/courses';
import  axios  from 'axios';
import toast from 'react-hot-toast'
const Home = () => {
  const [courses, setCourses]=useState([])
  useEffect(()=>{
   const toastId= toast.loading('loading...')
    axios.get('https://backend-omega-orpin.vercel.app/').then((res)=>{
     setCourses(res.data)
     toast.dismiss(toastId)
    })
  },[])

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