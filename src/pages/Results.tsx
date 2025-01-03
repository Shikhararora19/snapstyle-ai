import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StyleCard from "../components/StyleCard";
import WeatherWidget from "../components/WeatherWidget";

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageUrl, occasion, analyzedData, weather } = location.state || {};

  const [styles, setStyles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imageUrl || !occasion || !analyzedData || !weather) {
      alert("Missing required data. Redirecting to Home.");
      navigate("/Home");
      return;
    }

    const getStyles = async () => {
      try {
        const response = await fetch("/.netlify/functions/fetch-styles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl, occasion, analyzedData, weather }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch styles.");
        }

        const data = await response.json();
        console.log("Fetched Styles:", data.items);
        setStyles(data.items || []);
      } catch (error) {
        console.error("Error fetching styles:", error);
      } finally {
        setLoading(false);
      }
    };

    getStyles();
  }, [imageUrl, occasion, analyzedData, weather, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen from-green-100 via-blue-100 to-purple-100">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-lg text-gray-600">Fetching style recommendations...</p>
        </div>
      </div>
    );
  }

  if (styles.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-lg text-gray-600">No styles available. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-r from-green-100 via-blue-100 to-purple-100">
      {/* Cart Button */}
      <button
  onClick={() => navigate("/cart")}
  className="absolute top-4 right-4 bg-blue-200 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-300 shadow-lg"
>
  <img
    src="/shopping.svg" // Path to your SVG in the public folder
    alt="Cart Icon"
    className="w-6 h-6"
  />
  <span className="sr-only">View Cart</span>
</button>

        {/* wishlist button */}
        <button
          onClick={() => navigate("/wishlist")}
          className="absolute top-4 right-16 bg-blue-200 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-300 shadow-lg"
        >
            <img
                src="/wishlist.svg" // Path to your SVG in the public folder
                alt="Wishlist Icon"
                className="w-6 h-6"
            />
            <span className="sr-only">View Wishlist</span>
        </button>  


      {/* Weather Widget */}
      <div className="p-4">
        <WeatherWidget weather={weather} iconSize="lg" />
      </div>

      {/* Style Recommendations */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {styles.map((style, index) => (
          <StyleCard key={index} style={style} />
        ))}
      </div>
    </div>
  );
};

export default Results;
