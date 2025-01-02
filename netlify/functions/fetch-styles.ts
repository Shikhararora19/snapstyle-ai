import { Handler } from "@netlify/functions";
import axios from "axios";

export const handler: Handler = async (event) => {
  const { imageUrl, occasion, analyzedData, weather } = JSON.parse(event.body || "{}");

  if (!imageUrl || !occasion || !analyzedData || !weather) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing required fields." }),
    };
  }

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

  try {
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

      const recommendations = JSON.parse(response.data.choices[0].message.content);

      return {
        statusCode: 200,
        body: JSON.stringify({ items: recommendations }),
      };
    } catch (error) {
      console.error("Error fetching styles:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch style recommendations." }),
      };
    }
  }