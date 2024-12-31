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
      The response should be a **clean JSON array of objects** (no backticks or markdown, just plain JSON) with the following fields for each item:
      1. name (string)
      2. description (string)
      3. type (string, e.g., "Tops", "Shoes")
      4. price_range (string, e.g., "$20 - $50")
      5. store_link (string, a valid store URL like Amazon, Nike, etc.)

      Image URL: ${imageUrl}
      Occasion: '${occasion}'

      If you cannot analyze the image, suggest generic outfit ideas for the occasion.
      Return only the JSON array, nothing else.
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


    let items;
    try {
      items = JSON.parse(recommendations);
    } catch (parseError) {
      console.error("Failed to parse recommendations:", parseError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Invalid response format from OpenAI." }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ items }),
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
