import { Handler } from "@netlify/functions";
import axios from "axios";

export const handler: Handler = async (event) => {
  try {
    const { imageUrl, occasion, analyzedData, weather } = JSON.parse(event.body || "{}");

    // Validate inputs
    if (!imageUrl || !occasion || !analyzedData || !weather) {
      console.error("Missing required fields:", { imageUrl, occasion, analyzedData, weather });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields." }),
      };
    }

    console.log("Received Payload:", { imageUrl, occasion, analyzedData, weather });

    const prompt = `
      You are a virtual stylist. Based on the following details, recommend suitable outfits:
      - Analyzed Data: ${JSON.stringify(analyzedData, null, 2)}
      - Occasion: ${occasion}
      - Weather: ${JSON.stringify(weather, null, 2)}

      Provide recommendations as an array of objects with:
      - Name
      - Description
      - Type (e.g., Tops, Bottoms)
      - Price Range
      - Store Link
      The response should be in JSON format.
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a virtual stylist." },
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

    console.log("OpenAI Response:", response.data);

    // Safely parse the response content
    let recommendations;
    try {
      recommendations = JSON.parse(response.data.choices[0].message.content);
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", response.data.choices[0].message.content);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to parse OpenAI response." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ items: recommendations }),
    };
  } catch (error) {
    console.error("Error in fetch-styles handler:", error.response?.data || error.message || error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch style recommendations." }),
    };
  }
};
