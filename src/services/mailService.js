const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // Brevo uses STARTTLS on 587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.sendVerificationEmail = async (email, token) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify?token=${token}`;

  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Verify Your Email for Secret Santa 🎅",
    html: `
      <h2>Welcome to Secret Santa 🎄</h2>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${verifyUrl}" style="padding: 10px 15px; background:#E63946; color:white; border-radius:5px; text-decoration:none;">
        Verify Email
      </a>
      <p>If you did not request this, ignore this email.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};
