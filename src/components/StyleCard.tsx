import React from "react";

interface StyleCardProps {
    style: {
      Description: string;
      Name: string;
      Price_Range: string;
      Store_Link: string;
      Type: string;
    };
  }
  
  const StyleCard: React.FC<StyleCardProps> = ({ style }) => {
    return (
      <div className="p-4 border rounded shadow-md">
        <h3 className="text-xl font-semibold mb-2">{style.Name}</h3>
        <p className="text-gray-600 mb-2">{style.Description}</p>
        <p className="text-sm text-gray-500 mb-2">Type: {style.Type}</p>
        <p className="text-sm text-gray-500 mb-2">Price: {style.Price_Range}</p>
        <a
          href={style.Store_Link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Buy Now
        </a>
      </div>
    );
  };
  
export default StyleCard;
