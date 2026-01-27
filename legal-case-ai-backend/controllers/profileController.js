const UserProfile = require("../models/UserProfile");

// Get user profile
const getProfile = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    let profile = await UserProfile.findOne({ userId });
    
    // If profile doesn't exist, create a default one
    if (!profile) {
      profile = new UserProfile({
        userId,
        email: req.query.email || "",
        username: "",
        phone: "",
        bio: "",
      });
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create or update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, email, username, phone, bio } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      { email, username, phone, bio, updatedAt: new Date() },
      { new: true, upsert: true, runValidators: true }
    );

    res.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
