const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeCase = async (req, res) => {
  try {
    const { caseText } = req.body;

    if (!caseText) {
      return res.status(400).json({ error: "caseText is required" });
    }
  
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are a legal AI assistant. Analyze the following case and provide:
    1. Summary of the case
    2. Relevant laws that may apply
    3. Possible outcomes

    Case: ${caseText}
    `;

    const result = await model.generateContent(prompt);

    res.json({ analysis: result.response.text() });
  } catch (error) {
    console.error("Error analyzing case:", error);

    // Surface more detail to the client while keeping a 500 status
    const message =
      error?.statusText ||
      error?.message ||
      "Internal Server Error while calling Gemini API";

    res.status(500).json({ error: message });
  }
};

module.exports = { analyzeCase };
