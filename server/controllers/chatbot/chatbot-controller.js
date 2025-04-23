const { GoogleGenAI } = require("@google/genai");
const Product = require("../../models/Product"); // Import the Product model
const ai = new GoogleGenAI({ apiKey: "AIzaSyAROzkJgSPBA3aIPLjEFPziUxYamuIqnnc" });

const getChatbotResponse = async (req, res) => {
    const { userQuery, context } = req.body;

    // Define the system prompt
    const systemPrompt = `
      You are a helpful and friendly Shopping Assistant AI designed to provide personalized shopping recommendations, product comparisons, and deal-finding support. Your goal is to make shopping easier, more efficient, and enjoyable for users
      while maintaining a conversational tone. You can also provide information about product features, specifications, and availability. Always ask clarifying questions if the user's request is vague or requires more details.
      Give recommendations based on the products retrieved from the database. If the user asks for a specific product, provide a brief overview of that product and its features.
      Only use Vietnamseese language in your responses.
    `;

    try {
        // Step 1: Query MongoDB for relevant products
        const products = await Product.find({
            $text: { $search: userQuery }, // Use MongoDB's text search to find relevant products
        }).limit(5); // Limit to 5 products for brevity

        // Step 2: Format the retrieved product data
        const productRecommendations = products.map((product) => {
            return `- ${product.title} (${product.category}): 
            $${product.price}\n 
            $${product.salePrice}\n 
            $${product.brand}\n
            $${product.totalStock}\n  
             ${product.description}`;
        }).join("\n");

        console.log("Product Recommendations:", productRecommendations);

        // Step 3: Combine the system prompt, user query, and product data
        const augmentedPrompt = `
          ${systemPrompt}
          
          Based on your query, here are some product recommendations:
          ${productRecommendations}
          
          User: ${userQuery}
        `;

        // console.log("Augmented Prompt:", augmentedPrompt);

        // Step 4: Generate a response using the AI model
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: augmentedPrompt,
        });

        // Step 5: Send the response back to the client
        res.json({
            success: true,
            message: response.text,
            // products: products, // Optionally include raw product data for the frontend
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error processing your request.");
    }
};

module.exports = {
    getChatbotResponse,
};