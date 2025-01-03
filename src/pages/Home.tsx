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
  const [analyzedData, setAnalyzedData] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

  const handleAnalyzeImage = async () => {
    if (!imageUrl) {
      alert("Please upload an image first.");
      return;
    }
    setIsAnalyzing(true);
    try {
      const response = await fetch("/.netlify/functions/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze image.");
      }

      const { analyzedData } = await response.json();
      setAnalyzedData(analyzedData);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGetStyles = () => {
    if (!imageUrl || !analyzedData) {
      alert("Please upload and analyze an image first.");
      return;
    }
    navigate("/results", {
      state: {
        imageUrl,
        occasion,
        analyzedData,
        weather: weatherData,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="text-center py-10">
        <h1 className="text-6xl font-bold text-blue-700 hover:text-blue-900 transition duration-300">
          SnapStyle AI
        </h1>
        <p className="text-xl text-gray-600 mt-2">
          Upload your outfit inspiration and let AI style you!
        </p>
      </header>

      <main className="flex flex-col items-center w-full max-w-4xl">
        {user ? (
          <>
            <LogoutButton />
            <div className="my-6">
              <FileUpload setImageUrl={setImageUrl} />
            </div>
            {imageUrl && (
              <div className="flex flex-col items-center mt-4">
                <img
                  src={imageUrl}
                  alt="Uploaded Preview"
                  className="max-w-xs rounded-lg shadow-lg"
                />
              </div>
            )}
            {weatherData && <WeatherWidget weather={weatherData} />}

            <div className="w-full mt-6">
              <label
                htmlFor="occasion"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Select an Occasion:
              </label>
              <select
                id="occasion"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="border border-gray-300 p-3 rounded w-full focus:ring-2 focus:ring-blue-500"
              >
                <option value="Casual">Casual</option>
                <option value="Formal">Formal</option>
                <option value="Party">Party</option>
                <option value="Work">Work</option>
              </select>
            </div>

            <div className="flex flex-col items-center mt-6 space-y-4">
              <button
                onClick={handleAnalyzeImage}
                className={`bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-300 ${
                  isAnalyzing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Image"}
              </button>
              <button
                onClick={handleGetStyles}
                disabled={!analyzedData}
                className={`bg-blue-500 text-white px-6 py-3 rounded-lg ${
                  analyzedData
                    ? "hover:bg-blue-600 transition-all duration-300"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Get Style Suggestions
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-500 mt-6">Please log in to access this feature.</p>
        )}
      </main>
    </div>
  );
};

export default Home;
