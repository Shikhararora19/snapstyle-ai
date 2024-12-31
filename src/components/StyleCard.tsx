import React from "react";

interface StyleCardProps {
  style: {
    name: string;
    description: string;
    type: string;
  };
}

const StyleCard: React.FC<StyleCardProps> = ({ style }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold">{style.name}</h2>
      <p className="text-gray-600">{style.description}</p>
      <p className="text-sm text-gray-500">Type: {style.type}</p>
    </div>
  );
};

export default StyleCard;
