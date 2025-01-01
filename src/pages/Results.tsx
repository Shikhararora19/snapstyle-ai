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
      navigate("/");
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
        setStyles(data.items || []);
      } catch (error) {
        console.error("Error fetching styles:", error);
        alert("Failed to load style suggestions.");
      } finally {
        setLoading(false);
      }
    };
  
    getStyles();
  }, [imageUrl, occasion, analyzedData, weather, navigate]);
  
  if (loading) return <p>Loading styles...</p>;
  if (styles.length === 0) return <p>No styles available. Please try again later.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Style Recommendations</h1>
      {weather && <WeatherWidget weather={weather} />} {/* Show weather */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {styles.map((style, index) => (
          <StyleCard key={index} style={style} />
        ))}
      </div>
    </div>
  );
};

export default Results;
