import React from 'react'
import { useLocation } from 'react-router-dom'
const Home = () => {
  const location = useLocation()
  const data = location?.state;
  const arr =[1,2,3]
console.log("data", data);
  return (
    <div>
<h1>Home</h1>
   {
    data?<h1>{data.message}</h1>:null
   }
    </div>
  )
}

export default Home