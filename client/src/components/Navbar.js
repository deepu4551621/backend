import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBookSkull } from "react-icons/fa6";
import Cookie from 'js-cookie'
const Navbar = () => {
  const [isvisible, setVisible]=useState(false)
  const logout=()=>{
    Cookie.remove('Jalebi');
  }
  return (
    <nav className='navbar'>
        <Link onMouseOver={()=>setVisible(true)}  onMouseLeave={()=>setVisible(false)} to='/profile' className='logo'>
        <FaBookSkull size={30}/><span>E-Learning Platform</span>
        </Link>
        <ul>
            <Link onClick={logout}>Logout</Link>
            <Link to='/login'>Login</Link>
        </ul>
        {
     isvisible&&(
     <div style={styles.modal}>
      <h3>Click to view profile</h3>
     </div>
     )
        }
    </nav>
  )
}
const styles={
  modal:{
    backgroundColor:'#eee4',
    color:'#fff',
    width:200,
    height:50,
    borderRadius:20,
    position:'absolute',
    left:10,
    top:60,
    textAlign:'center'
  }
}
export default Navbar