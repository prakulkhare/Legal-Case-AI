const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeCase = async (req, res) => {
  try {
    const { caseText } = req.body;

    if (!caseText) {
      return res.status(400).json({ error: "caseText is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { analyzeCase };
