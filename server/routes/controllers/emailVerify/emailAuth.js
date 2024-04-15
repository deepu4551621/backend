const { Resend } = require("resend");
const MYEMAIL = process.env.EMAIL;
const resendInstance = new Resend(process.env.RESEND_API);

const EmailAuth = async (req, res, next) => {
  const { otp, email } = req.body;
  console.log('emailExist: otp:', otp, '\nemail:', email);
  try {
    if (!otp || !email) {
      return res.status(404).json({ email, otp, error: "something is missing" });
    }
    // Send verification email
    //  from: "Acme <onboarding@resend.dev>", testing sender
    //  to: MYEMAIL, testing receiver
     await resendInstance.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: `Verify your email address [Mr. ${email}]`,
      text: `Please click the following link to verify your email address:`,
      html: `
      <html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      .otp {
        font-weight: bold;
        font-size: 20px;
        color:green;
      }
      .otp-digit {
        margin-right: 5px;
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <p>Hello ${email}!</p>
    <p>Thanks for signing up for our app. To complete your registration, please use the following OTP to verify your email address:</p>
    <p class="otp">
      <!-- Loop through each digit of the OTP -->
      ${otp
        .split('')
        .map((digit, index) => `<span class="otp-digit">${digit}</span>`)
        .join(' ')}
    </p>
    <p>If you didn't sign up for our app, please ignore this email.</p>
    <p>Best regards,</p>
    <p>The Your App Team</p>
  </body>
</html>

      `,
    });
    next()
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ error: 'An error occurred while sending the verification email.' });
  }
};

module.exports = EmailAuth;
