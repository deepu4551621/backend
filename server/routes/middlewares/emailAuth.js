const { Resend } = require("resend");
const resendApi =process.env.RESEND_API
const MYEMAIL =process.env.EMAIL
const resendInstance = new Resend(resendApi);
const EmailAuth=async(req,res,next)=>{
    const {name, email} = req.body
    console.log(name, email)
    const verificationLink = "https://backend-omega-orpin.vercel.app/verifyEmail";
    const data = await resendInstance.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: MYEMAIL,
      subject: `Verify your email address [Mr. ${name}] `,
      text: `Please click the following link to verify your email address: ${verificationLink}`,
      html: `
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
      `,
    })
      res.status(200).json(data);
}

module.exports =EmailAuth