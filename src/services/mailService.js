const axios = require("axios");

// ------------------ Verification Email ------------------
exports.sendVerificationEmail = async (email, token) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify?token=${token}`;

  const data = {
    sender: { email: process.env.MAIL_FROM },
    to: [{ email }],
    subject: "Verify Your Email for Secret Santa 🎅",
    htmlContent: `
      <h2>Welcome to Secret Santa 🎄</h2>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${verifyUrl}"
         style="padding:10px 15px; background:#E63946; color:#fff; text-decoration:none; border-radius:5px;">
         Verify Email
      </a>
      <p>If you didn't request this, ignore this email.</p>
    `
  };

  await axios.post("https://api.brevo.com/v3/smtp/email", data, {
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
  });
};

// ------------------ Assignment Email (for Draw) ------------------
exports.sendAssignmentEmail = async (email, assignedPerson) => {
  const data = {
    sender: { email: process.env.MAIL_FROM },
    to: [{ email }],
    subject: "Your Secret Santa Assignment 🎁",
    htmlContent: `
      <h2>🎅 Secret Santa Assignment 🎄</h2>
      <p>You have been assigned:</p>
      <h3>${assignedPerson.name}</h3>
      <p>Make sure your gift is thoughtful and fun!</p>
    `
  };

  await axios.post("https://api.brevo.com/v3/smtp/email", data, {
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
  });
};
