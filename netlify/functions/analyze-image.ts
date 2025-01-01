import { Handler } from "@netlify/functions";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const handler: Handler = async (event) => {
  const { imageUrl } = JSON.parse(event.body || "{}");

  if (!imageUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Image URL is required." }),
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an advanced image analysis AI." },
        {
          role: "user",
          content: `Analyze the image at the following URL and describe clothing, accessories, colors, patterns, styles, and environment in JSON format:
          URL: ${imageUrl}`,
        },
      ],
      temperature: 0.7,
    });

    const content = response.choices[0].message?.content;

    if (!content) {
      throw new Error("No content received from OpenAI.");
    }

    // Parse JSON content safely
    const analysis = JSON.parse(content.replace(/```json|```/g, "").trim());
    console.log("Image Analysis:", analysis);
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
