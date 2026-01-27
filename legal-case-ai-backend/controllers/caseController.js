const Case = require("../models/Case");

// Get all cases for a user
const getCases = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const cases = await Case.find({ userId }).sort({ date: -1 });
    res.json(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single case by ID
const getCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const caseItem = await Case.findById(id);
    
    if (!caseItem) {
      return res.status(404).json({ error: "Case not found" });
    }
    
    res.json(caseItem);
  } catch (error) {
    console.error("Error fetching case:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new case
const createCase = async (req, res) => {
  try {
    const { userId, title, caseText, analysis, summary } = req.body;

    if (!userId || !title || !caseText || !analysis) {
      return res.status(400).json({ error: "userId, title, caseText, and analysis are required" });
    }

    const newCase = new Case({
      userId,
      title,
      caseText,
      analysis,
      summary: summary || "",
    });

    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    console.error("Error creating case:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a case
const updateCase = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, caseText, analysis, summary } = req.body;

    const updatedCase = await Case.findByIdAndUpdate(
      id,
      { title, caseText, analysis, summary, date: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedCase) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.json(updatedCase);
  } catch (error) {
    console.error("Error updating case:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a case
const deleteCase = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCase = await Case.findByIdAndDelete(id);

    if (!deletedCase) {
      return res.status(404).json({ error: "Case not found" });
    }

    res.json({ message: "Case deleted successfully", case: deletedCase });
  } catch (error) {
    console.error("Error deleting case:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
};
