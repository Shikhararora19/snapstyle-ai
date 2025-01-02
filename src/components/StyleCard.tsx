import React from "react";

interface StyleCardProps {
  style: {
    name: string;
    description: string;
    type: string;
    price: string;
    store_link: string;
  };
}

const StyleCard: React.FC<StyleCardProps> = ({ style }) => {
  const handleAddToCart = () => {
    alert(`Added "${style.name}" to the cart!`);
  };

  return (
    <div className="p-4 border rounded shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-2">{style.name}</h3>
      <p className="text-gray-600 mb-2">{style.description}</p>
      <p className="text-sm text-gray-500 mb-2">Type: {style.type}</p>
      <p className="text-sm text-gray-500 mb-4">Price: {style.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transform transition duration-300 hover:bg-blue-700 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default StyleCard;
