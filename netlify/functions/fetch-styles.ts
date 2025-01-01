import { Handler } from "@netlify/functions";
import axios from "axios";

export const handler: Handler = async (event) => {
  const { imageUrl, occasion, analyzedData, weather } = JSON.parse(
    event.body || "{}"
  );

  if (!imageUrl || !occasion || !analyzedData || !weather) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields." }),
    };
  }

  try {
    const prompt = `
      You are a virtual stylist. Based on the uploaded image, occasion, weather, and analysis data, suggest multiple outfit ideas. 
      Consider the following details:
      1. Name of the outfit item
      2. Description
      3. Type (e.g., Tops, Bottoms, Shoes, Accessories, etc.)
      4. Price range (important)
      5. Store link (real links like Amazon, etc.)

      Inputs:
      - Image Analysis Data: ${JSON.stringify(analyzedData)}
      - Occasion: '${occasion}'
      - Weather: ${JSON.stringify(weather)}

      Generate suggestions for outfits that are comfortable and appropriate for the given weather and occasion. 
      Ensure to include relevant links, price ranges, and details for each item.

      Respond as an array of objects with the specified structure.
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: 'system', content: 'You are a fashion stylist that provides outfit recommendation based on weather, occasion and image.' },
          { role: "user", content: prompt },
        ],
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

  // Sanitize the analyzed data
  const sanitizedAnalysis = analysis.replace(/```json|```/g, "").trim();

    let parsedAnalysis;
  try {
      parsedAnalysis = JSON.parse(sanitizedAnalysis);
      console.log("Parsed analyzed image data:", parsedAnalysis);
    } catch (parseError) {
      console.error("Failed to parse analyzed image data:", parseError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Invalid analyzed image data format." }),
      };
    }

  return {
      statusCode: 200,
      body: JSON.stringify({ parsedAnalysis }),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching styles:", error.response?.data || error.message);
    } else {
      console.error("Error fetching styles:", error);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch style recommendations." }),
    };
  }
};
