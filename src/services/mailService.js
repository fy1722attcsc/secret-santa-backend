const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // Port 587 = STARTTLS
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
    subject: "Verify Your Secret Santa Email 🎅",
    html: `
      <h2>Welcome to Secret Santa 🎄</h2>
      <p>Click the button below to verify your participation:</p>
      <a href="${verifyUrl}"
         style="display:inline-block;padding:12px 20px;background:#E63946;color:white;border-radius:6px;text-decoration:none;font-weight:bold;">
        Verify Email
      </a>
      <p>If you did not request this, ignore this email.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};
