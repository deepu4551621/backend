import React from 'react'
import { useLocation } from 'react-router-dom'
const Home = () => {
  const location = useLocation()
  const data = location?.state;
  const arr =[1,2,3]

  return (
    <div>
<h1>Home</h1>

<p>{data}</p>
    </div>
  )
}

export default Home