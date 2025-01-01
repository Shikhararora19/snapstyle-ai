import React from "react";

interface StyleCardProps {
  style: {
    name: string;
    description: string;
    type: string;
    price_range: string;
    store_link: string;
  };
}

const StyleCard: React.FC<StyleCardProps> = ({ style }) => {
  return (
    <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold mb-2 text-blue-600">{style.name}</h3>
      <p className="text-gray-700 mb-2">{style.description}</p>
      <p className="text-sm text-gray-500 mb-2">Type: {style.type}</p>
      <p className="text-sm text-gray-500 mb-2">Price: {style.price_range}</p>
      <a
        href={style.store_link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Buy Now
      </a>
    </div>
  );
};

export default StyleCard;
