const { GoogleGenAI } = require("@google/genai");
const gemini_api_key = "Your gemini api key"
const ai = new GoogleGenAI({ apiKey: gemini_api_key });

const getChatbotResponse = async (req, res) => {
    const { userQuery, context } = req.body;
    const systemPrompt = `
      You are a helpful and friendly Shopping Assistant AI designed to provide personalized shopping recommendations, product comparisons, and deal-finding support. Your goal is to make shopping easier, more efficient, and enjoyable for users
      while maintaining a conversational tone. You can also provide information about product features, specifications, and availability. Always ask clarifying questions if the user's request is vague or requires more details.
    `;
    try {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${systemPrompt}\n\nUser: ${userQuery}`,
      });
      // console.log(response.text);
      res.json(response.text);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing your request.');
  }
}

module.exports = {
  getChatbotResponse,
};