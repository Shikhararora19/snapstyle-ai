import React, { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import WeatherWidget from "../components/WeatherWidget";
import { WeatherResponse } from "../types/weather";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-config";
import { getLocation } from "../utils/getLocation";
import LogoutButton from "../components/LogoutButton";

const Home: React.FC = () => {
  const [user] = useAuthState(auth);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [occasion, setOccasion] = useState<string>("Casual");
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const location = await getLocation();
        const response = await fetch(
          `/.netlify/functions/get-weather?location=${location.locationName}`
        );
        const weather = await response.json();
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
    navigate("/results", { state: { imageUrl, occasion } });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-tr from-gray-100 to-blue-200 min-h-screen animate-fade-in">
      <h1 className="text-5xl font-bold text-blue-700 mb-6 hover:text-blue-900 transition duration-300">
        SnapStyle AI
      </h1>
      {user ? (
        <>
          <p className="text-gray-700 mb-4">Logged in as: {user.email}</p>
          <LogoutButton />
          <FileUpload setImageUrl={setImageUrl} />
          {weatherData && <WeatherWidget weather={weatherData} />}
          <div className="mt-4">
            <label
              htmlFor="occasion"
              className="block text-gray-700 font-medium mb-2"
            >
              Select an Occasion:
            </label>
            <select
              id="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-500"
            >
              <option value="Casual">Casual</option>
              <option value="Formal">Formal</option>
              <option value="Party">Party</option>
              <option value="Work">Work</option>
            </select>
          </div>
          <button
            onClick={handleGetStyles}
            className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Get Style Suggestions
          </button>
        </>
      ) : (
        <p className="text-red-500">Please log in to access this feature.</p>
      )}
    </div>
  );
};

export default Home;
