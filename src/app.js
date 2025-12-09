const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const participantRoutes = require("./routes/participantRoutes");
const drawRoutes = require("./routes/drawRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/participants", participantRoutes);
app.use("/api/draw", drawRoutes);

module.exports = app;
