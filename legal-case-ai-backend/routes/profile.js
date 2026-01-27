const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../controllers/profileController");

// GET /api/profile?userId=xxx&email=xxx - Get user profile
router.get("/", getProfile);

// PUT /api/profile - Create or update user profile
router.put("/", updateProfile);

module.exports = router;
