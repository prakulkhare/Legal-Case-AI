const express = require("express");
const router = express.Router();
const {
  getCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
} = require("../controllers/caseController");

// GET /api/cases?userId=xxx - Get all cases for a user
router.get("/", getCases);

// GET /api/cases/:id - Get a single case
router.get("/:id", getCaseById);

// POST /api/cases - Create a new case
router.post("/", createCase);

// PUT /api/cases/:id - Update a case
router.put("/:id", updateCase);

// DELETE /api/cases/:id - Delete a case
router.delete("/:id", deleteCase);

module.exports = router;
