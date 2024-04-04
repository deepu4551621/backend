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
    cpassword: ''
  });
  const [err,setErr]=useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {                      
        const Response = await axios.post('https://backend-omega-orpin.vercel.app/signup', formData )  
        if(Response.status === 200) {
          // Registration successful
          // setFormData({
          //   name: '',
          //   email: '',
          //   password: '',
          //   cpassword: ''
          // });
          toast.success('Registration Successful');
          navigate('/login');
        } else {
          // Handle unexpected response
          console.error('Unexpected response:', Response);
          toast.error('Registration failed. Please try again later.');
        }         
    } catch (error) {
      console.error("failed to Register", error);
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
