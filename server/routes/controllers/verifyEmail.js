const VerifyEmail= async()=>{
    try {
        const verificationLink = "https://backend-omega-orpin.vercel.app/signup" + email;
        await resendInstance.emails.send({
          from: "Your App <no-reply@your-app.com>",
          to: email,
          subject: "Verify your email address",
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
        });
        res.render("verify-email", { message: "A verification email has been sent to your email address. Please check your inbox and click the verification link to complete your registration." });
      } catch (error) {
        console.error(error);
        res.render("verify-email", { message: "An error occurred while sending the verification email. Please try again later." });
      }
    }
module.exports =VerifyEmail