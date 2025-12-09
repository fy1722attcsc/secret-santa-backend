const axios = require("axios");

exports.sendVerificationEmail = async (email, token) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify?token=${token}`;

  const data = {
    sender: { email: process.env.MAIL_FROM },
    to: [{ email }],
    subject: "Verify Your Email for Secret Santa 🎅",
    htmlContent: `
      <html>
        <body>
          <h2>Welcome to Secret Santa 🎄</h2>
          <p>Please verify your email by clicking the button below:</p>
          <a href="${verifyUrl}" style="padding:12px 20px;background:#E63946;color:white;border-radius:6px;text-decoration:none;">Verify Email</a>
        </body>
      </html>
    `,
  };

  await axios.post("https://api.brevo.com/v3/smtp/email", data, {
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
  });
};

