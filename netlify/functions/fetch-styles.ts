import { Handler } from "@netlify/functions";
import axios from "axios";

export const handler: Handler = async (event) => {
  const { imageUrl, occasion } = JSON.parse(event.body || "{}");

  if (!imageUrl || !occasion) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Image URL and occasion are required." }),
    };
  }

  try {
    const prompt = `
      Analyze this image: ${imageUrl}.
      Suggest outfit ideas for the occasion: '${occasion}'. Provide:
      - Clothing item name
      - Description
      - Type
      - Image URL
      - Store link (optional).
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const recommendations = response.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ recommendations }),
    };
  } catch (error) {
    console.error("Error fetching styles:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch style recommendations." }),
    };
  }
};
