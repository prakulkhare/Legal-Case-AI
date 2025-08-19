const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const analyzeRoute = require("./routes/analyze");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3000", // allow frontend
  methods: ["GET", "POST"]
}));

// Routes
app.get("/", (req, res) => {
  res.send("AI Case Analysis Backend Running 🚀");
});

app.use("/api/analyze", analyzeRoute);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
