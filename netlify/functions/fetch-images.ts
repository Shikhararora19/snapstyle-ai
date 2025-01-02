import { Handler } from "@netlify/functions";
import axios from "axios";

export const handler: Handler = async (event) => {
  const { itemName } = JSON.parse(event.body || "{}");

  if (!itemName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Item name is required" }),
    };
  }

  try {
    // Use Bing Image Search API (or Google Custom Search API)
    const apiKey = process.env.BING_SEARCH_API_KEY; // Add this to Netlify env vars
    const response = await axios.get(
      `https://api.bing.microsoft.com/v7.0/images/search`,
      {
        headers: { "Ocp-Apim-Subscription-Key": apiKey },
        params: {
          q: itemName,
          count: 1, // Get the first image
          safeSearch: "Moderate",
        },
      }
    );

    const images = response.data.value;

    if (!images || images.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No images found" }),
      };
    }

    const imageUrl = images[0].contentUrl; // First image URL

    return {
      statusCode: 200,
      body: JSON.stringify({ imageUrl }),
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch images." }),
    };
  }
};
