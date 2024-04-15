import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Profile from '../pages/profile'
import Setting from '../pages/setting'
// import OTPGenerator from '../pages/verifyOTP'
import { Toaster } from 'react-hot-toast'
const AppRoutes = () => {
    
  return (
    <>
     <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/setting' element={<Setting/>}/>
        {/* <Route path='/signup/emailVerify' element={<OTPGenerator/>} /> */}
     </Routes>
     </>
  )
}

export default AppRoutes