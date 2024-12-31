import React from "react";

interface StyleCardProps {
  style: {
    name: string;
    description: string;
    type: string;
    price: number;
  };
}

const StyleCard: React.FC<StyleCardProps> = ({ style }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="text-xl font-semibold">{style.name}</h3>
      <p className="text-gray-600">{style.description}</p>
      <p className="text-sm text-gray-500">Type: {style.type}</p>
      <p>price: {style.price}</p>
      <a href="{style.link}" className="block text-blue-600 hover:underline mt-2">
        View Details
        </a>
    </div>
  );
};

export default StyleCard;
