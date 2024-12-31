import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StyleCard from "../components/StyleCard";
import { fetchStyles } from "../services/stylesApi";

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Add a fallback for state
  const { imageUrl, occasion } = location.state || { imageUrl: null, occasion: null };

  const [styles, setStyles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect back to home if required state is missing
    if (!imageUrl || !occasion) {
      alert("Missing required data. Redirecting to Home.");
      navigate("/");
      return;
    }

    const getStyles = async () => {
      try {
        const response = await fetchStyles(imageUrl, occasion);
        console.log("Fetched styles:", response);

        // Use items directly from the response
        setStyles(response.items || []);
      } catch (error) {
        console.error("Error fetching styles:", error);
      } finally {
        setLoading(false);
      }
    };

    getStyles();
  }, [imageUrl, occasion, navigate]);

  if (loading) return <p>Loading styles...</p>;

  if (styles.length === 0) {
    return <p>No styles available. Please try again later.</p>;
  }

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
