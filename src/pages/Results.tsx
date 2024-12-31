import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import StyleCard from "../components/StyleCard";
import { fetchStyles } from "../services/stylesApi";

const Results: React.FC = () => {
  const location = useLocation();
  const { imageUrl, occasion } = location.state as { imageUrl: string; occasion: string };
  const [styles, setStyles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStyles = async () => {
      try {
        const recommendations = await fetchStyles(imageUrl, occasion);
        console.log("Fetched styles:", recommendations);
        setStyles(recommendations.items || []); // Use fallback if `items` is undefined
      } catch (error) {
        console.error("Error fetching styles:", error);
      }
    };
  
    getStyles();
  }, [imageUrl, occasion]);
  
  if (loading) return <p>Loading styles...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Style Recommendations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {styles.map((style, index) => (
          <StyleCard key={index} style={style} />
        ))}
      </div>
    </div>
  );
};

export default Results;
