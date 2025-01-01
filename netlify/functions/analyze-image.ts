import { Handler } from "@netlify/functions";
import axios from "axios";

export const handler: Handler = async (event) => {
  const { imageUrl } = JSON.parse(event.body || "{}");

  if (!imageUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Image URL is required" }),
    };
  }

  try {
    // Generate a textual prompt for GPT-4o-mini
    const prompt = `
      You are an advanced image analysis AI. Based on the image URL provided, describe key visual elements such as:
      - Types of clothing (e.g., shirt, pants, jacket, etc.)
      - Colors and patterns
      - Styles (e.g., casual, formal, sporty, etc.)
      - Any accessories visible (e.g., watch, glasses, bag, etc.)
      - Environmental context (e.g., outdoor, indoor, sunny, rainy, etc.)

      Here is the image URL: ${imageUrl}

      Please return your findings in a structured format like:
      {
        "clothing": [ { "type": "Shirt", "color": "Blue", "pattern": "Solid" } ],
        "accessories": [ { "type": "Watch", "color": "Silver" } ],
        "environment": { "context": "Outdoor", "weather": "Sunny" }
      }
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an advanced image analysis AI." },
          { role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const analysis = response.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: analysis, // Pass the structured response to the frontend
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to analyze image." }),
    };
  }
};
