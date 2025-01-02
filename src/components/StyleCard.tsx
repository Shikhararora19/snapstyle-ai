import React, { useEffect, useState } from "react";

interface StyleCardProps {
  style: {
    name: string;
    description: string;
    type: string;
    price: string;
  };
}

const StyleCard: React.FC<StyleCardProps> = ({ style }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("/.netlify/functions/fetch-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemName: style.name }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch image.");
        }

        const data = await response.json();
        setImage(data.imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [style.name]);

  return (
    <div className="p-4 border rounded shadow-md hover:shadow-lg transition-shadow duration-300">
      {image ? (
        <img src={image} alt={style.name} className="w-full h-48 object-cover mb-4 rounded" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-4">
          <p className="text-gray-500">Loading image...</p>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{style.name}</h3>
      <p className="text-gray-600 mb-2">{style.description}</p>
      <p className="text-sm text-gray-500 mb-2">Type: {style.type}</p>
      <p className="text-sm text-gray-500 mb-4">Price: {style.price}</p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transform transition duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default StyleCard;
