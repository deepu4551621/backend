import React, { useState } from 'react';
import axios from 'axios';
import { GrClose } from 'react-icons/gr';
import {useSelector} from 'react-redux'
import toast from 'react-hot-toast'
const EditUserForm = ({ closeModal }) => {
    const { userData } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const toastId= toast.loading('updating...')
    try {
      const response =  await axios.put(`https://backend-omega-orpin.vercel.app/updateuser?id=${userData?.id}`, formData);
        console.log('User data updated successfully');
        if(response.status===200){
            toast.success(response.data.message)
            toast.dismiss(toastId)
            closeModal()
        }
        
      } catch (error) {
        console.error('Error updating user:', error);
      }
  };
const handleClose=()=>{
    closeModal()
}
  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', padding: '20px' }}>
        <span style={{float:"right", cursor:'pointer'}} onClick={handleClose}>
      <GrClose size={20}/>
      </span>
    <div style={{ marginBottom: '10px' }}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData?.name}
        onChange={handleChange}
        style={{ width: '100%', padding: '8px', borderRadius: '5px', marginBottom: '10px' }}
      />
    </div>
    <div style={{ marginBottom: '10px' }}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData?.email}
        onChange={handleChange}
        style={{ width: '100%', padding: '8px', borderRadius: '5px', marginBottom: '10px' }}
      />
    </div>
    <button type="submit" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
      Update
    </button>
  </form>
  
  );
};

export default EditUserForm;
