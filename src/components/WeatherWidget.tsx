import React from "react";
import { WeatherResponse } from "../types/weather";

interface WeatherWidgetProps {
  weather: WeatherResponse;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  return (
    <div className="bg-blue-100 p-4 rounded shadow mt-4">
      <h2 className="text-xl font-bold">Current Weather</h2>
      <div className="flex items-center mt-2">
        <img src={weather.icon} alt={weather.condition} className="w-12 h-12" />
        <div className="ml-4">
          <p className="text-lg">{weather.location}</p>
          <p className="text-gray-700">
            {weather.temperature}°C - {weather.condition}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
