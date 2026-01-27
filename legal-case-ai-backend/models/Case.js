const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
  },
  caseText: {
    type: String,
    required: true,
  },
  analysis: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Case", caseSchema);
