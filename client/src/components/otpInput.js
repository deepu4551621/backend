import React, { useState, useEffect } from 'react';
const OtpInput = ({ onComplete , reSendOtp}) => {
  const [digits, setDigits] = useState(Array(6).fill(''));
 const [indeX, setIndex]=useState(null)
 const [timerRunning, setTimerRunning] = useState(false);

  const handleInputChange = (index, value) => {
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setIndex(index)
    console.log(index)
    if (value && index < 6 - 1) {
      // Automatically move to the next input field
      const nextInput = document.getElementById(`digit${index + 1}`);
      nextInput.focus();
    }

    if (newDigits.every(digit => digit !== '')) {
      onComplete(newDigits.join(''));
    }
  };

  const handleBackspace = (index, event) => {
    if (event.key === 'Backspace' && index > 0 && digits[index] === '') {
      const newDigits = [...digits];
      newDigits[index - 1] = '';
      setDigits(newDigits);

      // Move focus back to the previous input field
      const prevInput = document.getElementById(`digit${index - 1}`);
      prevInput.focus();
    }
  };

const reGenerateOtp=()=>{
  reSendOtp()
}
useEffect(() => {
  const countdownTimer = setTimeout(() => {
    setTimerRunning(true); // Disable the button when the timer finishes
  }, 120000); // 2min

  return () => clearTimeout(countdownTimer);
}, []);
console.log("timer",timerRunning)
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:20}}>
        <div style={{display:'flex', flexDirection:'column'}}>
    <div style={{ padding:10, backgroundColor:indeX===5?"silver":"#fff"}}>
        <h2>Verify OTP</h2>
        <h6 style={{color:'green'}}>OTP sent to your email</h6>
      {digits?.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleBackspace(index, e)}
          id={`digit${index}`}
          style={{
            width: '30px',
            height: '30px',
            margin: '5px',
            textAlign: 'center',
            border: '1px solid #ccc', // Add a border
            borderRadius: '5px', // Add border radius for rounded corners
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow effect
            background: '#fff', // Set background color
          }}
        />
      ))}
     </div>
    <button disabled={!timerRunning} onClick={reGenerateOtp} type="button" class="btn btn-outline-success">re-generate-otp</button>
    </div>
    </div>
  );
};

export default OtpInput;





















