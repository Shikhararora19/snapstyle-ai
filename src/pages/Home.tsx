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
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-6">
          Discover AI-Powered Fashion
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Upload your outfit inspiration, and let our AI recommend the perfect styles for you.
          Experience personalized fashion like never before.
        </p>
        <img
          src="/home.png" // Replace with the path to your illustration
          alt="Fashion AI Illustration"
          className="mt-8 max-w-sm"
        />
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 flex flex-col items-center p-6">
        <h1 className="text-6xl font-extrabold text-blue-700 mb-10 hover:text-blue-900 transition duration-300">
          SnapStyle AI
        </h1>
        {user ? (
          <>
            <div className="absolute top-6 right-6">
              <LogoutButton />
            </div>
            <div className="mb-8">
              <p className="text-xl font-medium text-gray-700">Logged in as:</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <FileUpload setImageUrl={setImageUrl} />
            {imageUrl && (
              <div className="mt-6">
                <p className="text-gray-600">Uploaded Image:</p>
                <img
                  src={imageUrl}
                  alt="Uploaded Preview"
                  className="mt-2 max-w-xs border rounded-lg shadow"
                />
              </div>
            )}
            {weatherData && (
              <div className="mt-6">
                <WeatherWidget weather={weatherData} />
              </div>
            )}
            <div className="mt-6">
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
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAnalyzeImage}
                className={`bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 ${
                  isAnalyzing ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Image"}
              </button>
              <button
                onClick={handleGetStyles}
                disabled={!analyzedData}
                className={`px-6 py-3 rounded text-white ${
                  analyzedData
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Get Style Suggestions
              </button>
            </div>
          </>
        ) : (
          <p className="text-red-500 text-xl">Please log in to access this feature.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
