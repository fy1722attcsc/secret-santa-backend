const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const participantRoutes = require("./routes/participantRoutes");
const drawRoutes = require("./routes/drawRoutes");

const app = express();
app.use(express.json());

// ------------------ CORS CONFIG ------------------
const allowedOrigins = [
  "http://localhost:5173",
  "https://secret-santa-local.vercel.app"  // <-- Your Vercel domain
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow backend/internal calls
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// -------------------------------------------------

app.use("/api/participants", participantRoutes);
app.use("/api/draw", drawRoutes);

module.exports = app;
