const Participant = require("../models/Participant");
const drawService = require("../services/drawService");
const mailService = require("../services/mailService");
const DrawState = require("../models/DrawState");

exports.runDraw = async (req, res) => {
  try {
    const participants = await Participant.find({ verified: true });
    const count = participants.length;

    if (count < 3) {
      return res.status(400).json({ message: "At least 3 participants needed for the draw." });
    }

    let state = await DrawState.findOne();

    // Draw already completed for this group size
    if (state && state.hasDrawRun && state.lastCount === count) {
      return res.status(400).json({ message: "Draw already completed for this participant list." });
    }

    const pairs = drawService.drawAssignments(participants);

    for (const pair of pairs) {
      await Participant.findByIdAndUpdate(pair.giver._id, {
        assignedTo: pair.receiver._id
      });

      await mailService.sendAssignmentEmail(
        pair.giver.email,
        pair.receiver.name
      );
    }

    // Update draw state
    if (!state) state = new DrawState();
    state.hasDrawRun = true;
    state.lastCount = count;
    await state.save();

    res.json({ message: "Secret Santa draw complete!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getDrawState = async (req, res) => {
  try {
    const state = await DrawState.findOne();
    res.json(state || { hasDrawRun: false, lastCount: 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};
