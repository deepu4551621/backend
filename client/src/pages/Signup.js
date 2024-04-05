import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom'; // Change import to useHistory
import {BiError} from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import {BsPerson} from 'react-icons/bs';
import {MdOutlineAlternateEmail} from 'react-icons/md';
import {toast} from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [err,setErr]=useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Saving user data...");
    try {
        await axios.post('https://backend-omega-orpin.vercel.app/signup', formData).then((res)=>{
 console.log("response from server", res.json());
        })
        // if (response.status === 201) {
        //     // Registration successful
        //     setFormData({
        //         name: '',
        //         email: '',
        //         password: '',
        //     });
        //     toast.dismiss(toastId);
        //     toast.success('Registration Successful');
        //     // navigate('/login');
        // }
        console.log('Response back from server:', response);
    } catch (error) {
      toast.dismiss(toastId);
      if (error.response) {
        // Server responded with an error status code
        if (error.response.status === 400) {
          // Bad request
          console.log("Bad request:", error.response.data);
          toast.error(error.response.data.message || 'Bad request');
        } else {
          console.log("Error registering:", error.response.data);
          toast.error(error.response.data.message || 'An error occurred');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received:", error.request);
        toast.error('No response received from server');
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Request error:", error.message);
        toast.error('Request error: ' + error.message);
      }
    }
};



  return (
    <div className="signup-container">
    <h2>Signup</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
      <span className='icon'><BsPerson/></span>
        <input
        placeholder='Name'
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
      <span className='icon'><MdOutlineAlternateEmail/></span>
        <input
        placeholder='Email'
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
      <span className='icon'><RiLockPasswordLine/></span>
        <input
        placeholder='Password'
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
      <span className='icon'><RiLockPasswordLine/></span>
        <input
         placeholder='ConfirmPassword'
          type="password"
          id="cpassword"
          name="cpassword"
          value={formData.cpassword}
          onChange={handleChange}
          required
        />
      </div>
      {err && (
      <p style={{ color: 'red', textAlign:'center' }}><BiError/>{err}</p>)}
      <div className="form-group">
        <button type="submit" onClick={handleSubmit}>Register</button>
      </div>
    </form>
  </div>
  );
};

export default Register;
