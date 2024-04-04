import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isvisible, setVisible]=useState(false)
  return (
    <nav className='navbar'>
        <Link onClick={()=>setVisible(true)} className='logo'><img src='#' alt='img'/>profile</Link>
        <ul>
           <Link to='/login'>Login</Link>
           <Link to='/signup'>Signup</Link>
        </ul>
        {
     isvisible&&(
     <div style={styles.modal}>
      <button onClick={()=>setVisible(false)}>Close</button>
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