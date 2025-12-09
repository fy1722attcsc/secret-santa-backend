const mongoose = require("mongoose");

const drawStateSchema = new mongoose.Schema({
  hasDrawRun: { type: Boolean, default: false },
  lastCount: { type: Number, default: 0 }
});

module.exports = mongoose.model("DrawState", drawStateSchema);
