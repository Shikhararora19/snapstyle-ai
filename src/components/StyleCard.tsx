import React from "react";
import { Link } from "react-router-dom";

interface StyleCardProps {
  style: {
    name: string;
    description: string;
    type: string;
    link: string;
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

    </div>
  );
};

export default StyleCard;
