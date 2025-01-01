import { Handler } from "@netlify/functions";
import axios from "axios";

export const handler: Handler = async (event) => {
  const { imageUrl } = JSON.parse(event.body || "{}");

  if (!imageUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Image URL is required" }),
    };
  }

  try {
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/dgsbnmnfu/resources/image/upload`,
      {
        params: {
          public_ids: imageUrl, // Public ID of the image
          colors: true, // Request colors metadata
        },
      }
    );

    const dominantColors = response.data.colors;

    return {
      statusCode: 200,
      body: JSON.stringify({ colors: dominantColors }),
    };
  } catch (error) {
    console.error("Error fetching colors from Cloudinary:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch image metadata." }),
    };
  }
};
