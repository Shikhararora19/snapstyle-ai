import { Handler } from "@netlify/functions";
import axios from "axios";

export const handler: Handler = async (event) => {
  const location = event.queryStringParameters?.location || "New York";
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data), // Ensure valid JSON response
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching weather data:", error.response?.data || error.message);
    } else {
      console.error("Error fetching weather data:", (error as Error).message);
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather data." }),
    };
  }
};
