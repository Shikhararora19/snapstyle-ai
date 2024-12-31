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
      You are a virtual stylist. Based on the image at the URL provided below and the occasion described, suggest multiple outfit ideas. 
      The response should include the following for each outfit item:
      1. Name
      2. Description
      3. Type (e.g., Tops, Bottoms, Shoes, Accessories, etc.)
      4. Price range ensure to include this very important
      5. Store link very important should be real like amazon, hollister etc. and have for each item

      Image URL: ${imageUrl}
      Occasion: '${occasion}'

      If you cannot analyze the image, suggest generic multiple outfit ideas for the given occasion ensuring you have a real store link.
      Please ensure the response is structured as a plain array of objects (not wrapped in JSON text).
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: 'system', content: 'You are a fashion stylist.' },
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

    const recommendations = response.data.choices[0].message.content;
    console.log("Style Recommendations:", recommendations); // Log the response for debugging

    // Parse the response as JSON to ensure it is an array
    const items = JSON.parse(recommendations);

    return {
      statusCode: 200,
      body: JSON.stringify({ items }), // Return the plain array
    };
  } catch (error) {
    console.error("Error fetching styles:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch style recommendations." }),
    };
  }
};
