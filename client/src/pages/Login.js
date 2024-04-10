import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiLockPasswordLine } from 'react-icons/ri';
import {MdOutlineAlternateEmail} from 'react-icons/md';
import {BiError} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {useDispatch} from 'react-redux'
import { login } from '../reducers/userSlice';
import { Link } from 'react-router-dom';
import Cookie from 'js-cookie'
const Login = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [err,setErr]=useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
console.log(Object.values(err).length)
};
useEffect(()=>{
  console.log("check errors", !Object.values(formData).some(value => value === '' ))
  console.log("values",!Object.values(err)==='')
  console.log('eror',err)
},[err])
const handleSubmit = async (e) => {
    e.preventDefault();
    validateAllFields()
    if (!Object.values(formData).some(value => value === '') ) {
      // Submit form data
    const toastId = toast.loading('logging...');
    try {
        const response = await axios.post('https://backend-omega-orpin.vercel.app/login', formData);
         console.log('dataTjson', response, )
        const {success, id} = response.data;
        if(response.status===200){
          setFormData({
            name: '',
            email: '',
            password: '',
          });
          navigate('/')
         Cookie.set('Jalebi',response.data.accessToken )
         Cookie.set('RefreshJalebi',response.data.refreshToken )
         dispatch(login({success, id}))
          toast.dismiss(toastId)
          toast.success('Login successFull',{
            position:'top-center',
            duration:3000
          })
        }
    } catch (e) {
      toast.dismiss(toastId)
      toast.error(e.response.data.error, {duration:3000})
      console.log("ERROR:",e)
    }
  }
};

// error handle
const validateField = (name, value) => {
  // Write validation rules for each field
  let error = '';
  switch (name) {
    case 'email':
      // Example: Validate email format
      error = !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email address' : '';
      break;
    case 'password':
        error = value.trim() === '' ? 'Password is required' : '';
          break;
      default:
          break;
  }
  // Update errors state for the current field
  setErr({ ...err, [name]: error });
};

const validateAllFields = () => {
  // Validate all fields when the form is submitted
  for (const [name, value] of Object.entries(formData)) {
      validateField(name, value);
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
     <p style={{ color: 'red', textAlign:'center' }}>
            {Object.values(err).some(error => error !== '') ? <BiError color='red' /> : null}
        {err.password || err.email}
        </p>)}
      <div className='form-group'>
        <button type='submit' className={Object.values(formData).some(value => value === '') ? 'disabled' : ''}  disabled={Object.values(formData).some(value => value === '')} onClick={handleSubmit}>Login</button>
      </div>
    </form>
    <div className='lastDiv'><span>Don't have an account!</span> <Link to='/signup'>Signup</Link></div>
  </div>
  );
};

export default Login;
