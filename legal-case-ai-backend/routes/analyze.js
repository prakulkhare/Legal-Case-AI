const express = require("express");
const router = express.Router();
const { analyzeCase } = require("../controllers/analyzeController");

// POST /api/analyze
router.post("/", analyzeCase);

module.exports = router;
