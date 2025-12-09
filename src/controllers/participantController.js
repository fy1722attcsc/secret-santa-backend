const Participant = require("../models/Participant");
const VerificationToken = require("../models/VerificationToken");
const generateToken = require("../utils/generateToken");
const mailService = require("../services/mailService");

exports.register = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await Participant.findOne({ email });

    if (user && user.verified) {
      return res.status(400).json({ message: "Email already registered" });
    }

    if (!user) {
      user = await Participant.create({ name, email });
    }

    const token = generateToken();

    await VerificationToken.create({
      participantId: user._id,
      token
    });

    // ⬇️ PASS ONLY token + userID — DO NOT build URL here
    await mailService.sendVerificationEmail(email, token, user._id);

    res.json({ message: "Verification email sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verify = async (req, res) => {
  try {
    const { token, id } = req.query;

    const record = await VerificationToken.findOne({ participantId: id, token });

    if (!record) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await Participant.findByIdAndUpdate(id, { verified: true });

    await VerificationToken.deleteMany({ participantId: id });

    res.json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllVerified = async (req, res) => {
  try {
    const participants = await Participant.find({ verified: true }).select("name email");
    res.json({ participants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
