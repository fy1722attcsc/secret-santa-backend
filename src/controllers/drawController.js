const Participant = require("../models/Participant");
const drawService = require("../services/drawService");
const mailService = require("../services/mailService");

exports.runDraw = async (req, res) => {
  try {
    const participants = await Participant.find({ verified: true });

    if (participants.length < 3) {
      return res.status(400).json({ message: "At least 3 participants needed for the draw." });
    }

    const pairs = drawService.drawAssignments(participants);

    for (const pair of pairs) {
      await Participant.findByIdAndUpdate(pair.giver._id, {
        assignedTo: pair.receiver._id
      });

      await mailService.sendAssignmentEmail(
        pair.giver.email,
        pair.receiver
      );
    }

    res.json({ message: "Secret Santa draw complete! Assignments emailed." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
