import React, { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import WeatherWidget from "../components/WeatherWidget";
import { WeatherResponse } from "../types/weather";
import { useNavigate } from "react-router-dom";
import { getLocation } from "../utils/getLocation";

const Home: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<string>("Casual");
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
        try {
          const location = await getLocation();
          const response = await fetch(
            `/.netlify/functions/get-weather?location=${location.latitude},${location.longitude}`
          );
      
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
      
          const weather = await response.json(); // Parse JSON response
          setWeatherData(weather);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      };
      
      

    fetchWeather();
  }, []);

  const handleGetStyles = () => {
    if (!imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    navigate("/results", { state: { imageUrl, occasion, weatherData } });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold mb-4">SnapStyle AI</h1>
      <FileUpload setImageUrl={setImageUrl} />
      {weatherData && <WeatherWidget weather={weatherData} />}
      <div className="mt-4">
        <label htmlFor="occasion" className="block text-gray-700 font-medium mb-2">
          Select an Occasion:
        </label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Party">Party</option>
          <option value="Work">Work</option>
        </select>
      </div>
      <button
        onClick={handleGetStyles}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
      >
        Get Style Suggestions
      </button>
    </div>
  );
};

export default Home;
