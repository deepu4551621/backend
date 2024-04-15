 <!-- <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', margin:20}}>
        <div style={{display:'flex', flexDirection:'column'}}>
    <div style={{ padding:10}}>
        <h2>Verify OTP</h2>
      {otp.map((digit, index) => (
       <input
       key={index}
       type="text"
       maxLength="1"
       value={digit}
       onChange={(e) => handleInputChange(index, e.target.value)}
       onKeyDown={(e) => handleBackspace(index, e)}
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
    <button type="button" class="btn btn-outline-success">Verify</button>
    </div>
    </div> -->