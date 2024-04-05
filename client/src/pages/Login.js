import React, { useState } from 'react';
import axios from 'axios';
import { RiLockPasswordLine } from 'react-icons/ri';
import {MdOutlineAlternateEmail} from 'react-icons/md';
import {BiError} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [err,setErr]=useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('logging...');
    try {
        const response = await axios.post('https://backend-omega-orpin.vercel.app/login', formData);
         const data = response.json()
         console.log('dataTjson', data, )
        //  console.log('response', response)
        if(response.status===200){
          setFormData({
            name: '',
            email: '',
            password: '',
          });
          navigate('/', response.data);
          toast.success(data.message,{
            position:'top-center'
          })
          toast.dismiss(toastId)
        }
    } catch (error) {
      toast.dismiss(toastId)
      toast.error(error.response.data.message);
      console.log("ERROR:",error)

    }
};


  return (
    <div className='signup-container'>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <span className='icon'><MdOutlineAlternateEmail/></span>
        <input
        placeholder='Email Address'
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className='form-group'>
      <span className='icon'><RiLockPasswordLine/></span>
        <input
         placeholder='Password'
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {err && (
      <p style={{ color: 'red', textAlign:'center' }}><BiError/>{err}</p>)}
      <div className='form-group'>
        <button type='submit' onClick={handleSubmit}>Login</button>
      </div>
    </form>
  </div>
  );
};

export default Login;
