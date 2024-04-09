import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBookSkull } from "react-icons/fa6";
import ProfileImageUploader from './profileSection';
const Navbar = () => {
  const [isvisible, setVisible]=useState(false)
  const [login, setLogin]=useState(false)
  return (
    <nav className='navbar'>
        <Link onMouseOver={()=>setVisible(true)}  className='logo'>
        <FaBookSkull size={30}/><span>E-Learning Platform</span>
        </Link>
        <ul>
          {
            login?<Link>Logout</Link>:<Link to='/login'>Login</Link>
          }
        </ul>
        {
     isvisible&&(
     <div style={styles.modal} onMouseLeave={()=>setVisible(false)}>
      {/* <button onClick={()=>setVisible(false)}>Close</button> */}
      <ProfileImageUploader/>
     </div>
     )
        }
    </nav>
  )
}
const styles={
  modal:{
    backgroundColor:'#ccc',
    width:200,
    height:200,
    borderRadius:20,
    position:'absolute',
    left:10,
    top:60,

  }
}
export default Navbar