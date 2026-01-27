const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const analyzeRoute = require("./routes/analyze");
const casesRoute = require("./routes/cases");
const profileRoute = require("./routes/profile");

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:3000", // allow frontend
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Routes
app.get("/", (req, res) => {
  res.send("AI Case Analysis Backend Running 🚀");
});

app.use("/api/analyze", analyzeRoute);
app.use("/api/cases", casesRoute);
app.use("/api/profile", profileRoute);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
