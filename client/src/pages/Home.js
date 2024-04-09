import React from 'react'
import { useLocation } from 'react-router-dom'
import Courses from '../components/courses';
const Home = () => {
  const location = useLocation()
  const data = location?.state;
  return (
    <div className='home'>
   {
    data?<h1>{data.message}</h1>:null
   }
   <h1>Courses We Offer</h1>
   <div className='courseDiv'>
   <Courses/>
   </div>
    </div>
  )
}

export default Home