import { Handler } from "@netlify/functions";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handler: Handler = async (event) => {
  const { imageUrl } = JSON.parse(event.body || "{}");

  if (!imageUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Image URL is required" }),
    };
  }

  try {
    console.log("Analyzing image:", imageUrl);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an advanced image analysis AI.",
        },
        {
        role: "user",
        content: [
          { type: "text", text: "You are an advanced image analysis AI. Based on the image URL provided, describe key visual elements such as Types of clothing, Colors, Patterns, and Styles. Please return your findings in a structured format like: { \"clothing\": [ { \"type\": \"Shirt\", \"color\": \"Blue\", \"pattern\": \"Solid\" } ], \"accessories\": [ { \"type\": \"Watch\", \"color\": \"Silver\" } ], \"environment\": { \"context\": \"Outdoor\", \"weather\": \"Sunny\" } }"},
          {
            type: "image_url",
            image_url: {
              "url": imageUrl,
            },
          },
        ],
      },
    ],
      temperature: 0.7,
    });

    // Extract the content from the response
    const analysis = response.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ analysis }), // Pass the structured response to the frontend
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to analyze image." }),
    };
  }
};
