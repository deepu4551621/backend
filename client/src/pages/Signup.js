import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom'; // Change import to useHistory
import {BiError} from 'react-icons/bi';
import { RiLockPasswordLine,RiAdminLine } from 'react-icons/ri';
import {BsPerson} from 'react-icons/bs';
import {MdOutlineAlternateEmail} from 'react-icons/md';
import {toast} from 'react-hot-toast'
import { Link } from 'react-router-dom';
import VerifyOtpPage from './verifyOTP';
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword:'',
    role: 'user',
  });

  const [err,setErr]=useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
console.log(err)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // Validate all fields before submission
   validateAllFields();
   // Proceed with form submission if no errors
   if (!Object.values(formData).some(value => value === ''))  {
       // Submit form data
      //  console.log('Form submitted:', formData);
    const toastId = toast.loading("Saving user data...");
    try {
      const res = await axios.post('https://backend-omega-orpin.vercel.app/signup', formData);
        // const data =  await res.json();
        console.log("response from server",res );
        if (res.status === 201) {
            // Registration successful
            setFormData({
                name: '',
                email: '',
                password: '',
            });
            toast.dismiss(toastId);
            toast.success('Registration Successful');
            navigate('/login');
        }
    } catch (e) {
      toast.dismiss(toastId);
      toast.error(e.response.data.message, {duration:3000})
    //  console.log('error registering', e.response.data.message)
    }
  }
};
// error handling
const validateField = (name, value) => {
  // Write validation rules for each field
  let error = '';
  switch (name) {
      case 'name':
          // Example: Name should not be empty
          error = value.trim() === '' ? 'Name is required' : '';
          break;
      case 'email':
          // Example: Validate email format
          error = !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email address' : '';
          break;
      case 'password':
          // Example: Password should be at least 8 characters long
          error = value.length < 8 ? 'Password must be at least 8 characters long' : '';
          break;
      case 'cpassword':
          // Example: Confirm password should match password
          error = value !== formData.password ? 'Passwords do not match' : '';
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
      <div className="form-group">
      <span className='icon'><RiAdminLine/></span>
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      </div>
      {err && (
      <p style={{ color: 'red', textAlign:'center' }}>
            {Object.values(err).some(error => error !== '') ? <BiError color='red' /> :null}
        {err.password || err.name || err.email || err.cpassword}
        </p>)}
        {formData.email ? <VerifyOtpPage  email={formData.email} />:null}
      <div className="form-group">
        <button type="submit" className={Object.values(formData).some(value => value === '') ? 'disabled' : ''}  disabled={Object.values(formData).some(value => value === '')} onClick={handleSubmit}>Register</button>
      </div>
    </form>
    <div className='lastDiv'><span>Already have an account!</span> <Link to='/login'>Login</Link></div>
  </div>
  );
};

export default Register;
