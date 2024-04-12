const VerifyEmail= async(req,res)=>{
      res.send(HTML)
    }
module.exports =VerifyEmail

const HTML = `
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <p>Hello!</p>
    <p>Thanks for signing up for our app. To complete your registration, please click the following link to verify your email address:</p>
    <p><a href="${verificationLink}">${verificationLink}</a></p>
    <p>If you didn't sign up for our app, please ignore this email.</p>
    <p>Best regards,</p>
    <p>The Your App Team</p>
  </body>
</html>
`