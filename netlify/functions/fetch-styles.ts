import { Handler } from "@netlify/functions";
import axios from "axios";

export const handler: Handler = async (event) => {
  try {
    const { imageUrl, occasion, analyzedData, weather } = JSON.parse(event.body || "{}");

    if (!imageUrl || !occasion || !analyzedData || !weather) {
      console.error("Missing required fields:", { imageUrl, occasion, analyzedData, weather });
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields." }) };
    }

    console.log("Received Payload:", { imageUrl, occasion, analyzedData, weather });

    const prompt = `
      You are a virtual stylist. Based on the following details, recommend suitable outfits:
      - Analyzed Data: ${JSON.stringify(analyzedData, null, 2)}
      - Occasion: ${occasion}
      - Weather: ${JSON.stringify(weather, null, 2)}

      Provide recommendations as an array of objects. Each object should contain:
      - "Name" (string): Name of the item.
      - "Description" (string): A short description of the item.
      - "Type" (string): The category (e.g., Tops, Bottoms, Accessories, etc.).
      - "Price" (string): Price in USD.
      - "Store Link" (string): A valid URL to purchase the item.

      Respond with **only the JSON array**, nothing else.
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
    console.log("Raw OpenAI Response:", response.data.choices[0].message.content);


    let recommendations;
    try {
      const rawContent = response.data.choices[0].message.content;
      const sanitizedContent = rawContent.replace(/```json|```/g, "").trim();
      console.log("Sanitized Content:", sanitizedContent);

      if (!isValidJSON(sanitizedContent)) {
        throw new Error("Invalid JSON format.");
      }

      recommendations = JSON.parse(sanitizedContent).map((item: any) => ({
        name: item.Name || "Unknown Name",
        description: item.Description || "No description available.",
        type: item.Type || "Unknown Type",
        price: item["Price"] || "Price not specified.",
        store_link: item["Store Link"] || "#",
      }));
    } catch (error) {
      console.error("Error parsing OpenAI response:", error);
      return { statusCode: 500, body: JSON.stringify({ error: "Failed to parse OpenAI response." }) };
    }

    return { statusCode: 200, body: JSON.stringify({ items: recommendations }) };
  } catch (error) {
    console.error("Error in fetch-styles handler:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch style recommendations." }) };
  }
};

const isValidJSON = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};
