import React, { useState } from "react";
import axios from 'axios';
import { MdVerified } from "react-icons/md";
import OtpInput from "../components/otpInput"; // Assuming you have created the OtpInput component
import toast from "react-hot-toast";
const VerifyOtpPage = ({ email }) => {
  const [isOtpSent, setSend] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const onComplete = async (otp) => {
    try {
      const response = await axios.post('https://backend-omega-orpin.vercel.app/user/verifyOtp', {
        otp: otp, // Use the OTP passed to the onComplete function
        email: email,
      });
      // Handle response from backend
      if (response.status === 200) {
       toast.success(response.data.message)
        setEmailVerified(response.data.success);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const sendOtp = async () => {
    const toastId = toast.loading('loading...')
    // Generate OTP
    const digits = '0123456789';
    let generatedOtp = '';
    for (let i = 0; i < 6; i++) {
      generatedOtp += digits[Math.floor(Math.random() * 10)];
    }
    // Send OTP to backend
    try {
      const response = await axios.post('https://backend-omega-orpin.vercel.app/user/saveOtp', {
        otp: generatedOtp, // Use the generated OTP
        email: email,
      });
      // Handle response from backend
      if (response.status === 200) {
        // console.log(response.data);
        setSend(true);
        toast.dismiss(toastId)
      }
    } catch (error) {
      // console.error('Error sending OTP:', error);
      if (error.response.data?.data?.isverified === 1) {
        setEmailVerified(true);
      }
      setSend(true);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {emailVerified ? (
        <MdVerified color="green" />
      ) : (
        isOtpSent ? (
          <OtpInput onComplete={onComplete} reSendOtp={sendOtp} />
        ) : (
          <div onMouseOver={()=>alert('under development skip email verification coming soon...')}>
            <button  disabled={true} type="button" className="btn btn-outline-success" onClick={sendOtp}> Verify Email</button>
          </div>
        )
      )}
    </div>
  );
};
// button for working email authentication when i add domain and modify dns
//  <button disabled={email === ''} type="button" class="btn btn-outline-success" onClick={sendOtp}> Verify Email</button>


export default VerifyOtpPage;
