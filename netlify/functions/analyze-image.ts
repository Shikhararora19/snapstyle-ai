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
          { type: "text", text: "You are an advanced image analysis AI. Based on the image URL provided, describe key visual elements such as Types of clothing, Colors, Patterns, and Styles. Please return your findings in JSON format." },
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

    const content = response.choices[0].message.content;

    if (!content){
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to analyze image." }),
      };
    }

    // Parse JSON content safely
    const analysis = JSON.parse(content.replace(/```json|```/g, "").trim());

    return {
      statusCode: 200,
      body: JSON.stringify({ analyzedData: analysis }),
    };
  } catch (error) {
    console.error("Error analyzing image:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to analyze image." }),
    };
  }
};
