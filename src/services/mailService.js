const transporter = require("../config/mail");

exports.sendVerificationEmail = async (email, link) => {
  return transporter.sendMail({
    to: email,
    subject: "Verify your Secret Santa registration",
    text: `Click the link to verify your email: ${link}`
  });
};

exports.sendAssignmentEmail = async (email, receiverName) => {
  return transporter.sendMail({
    to: email,
    subject: "Your Secret Santa Assignment 🎅",
    text: `You are the Secret Santa for: ${receiverName}. Keep it secret!`
  });
};
