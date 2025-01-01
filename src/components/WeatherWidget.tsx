import React from "react";
import { WeatherResponse } from "../types/weather";

interface WeatherWidgetProps {
  weather: WeatherResponse;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  const { name, main, weather: weatherDetails } = weather;
  const condition = weatherDetails[0]?.description || "Unknown";
  const icon = `http://openweathermap.org/img/wn/${weatherDetails[0]?.icon}.png`;

  return (
    <div className="bg-blue-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in">
      <h2 className="text-xl font-bold text-blue-600">Current Weather</h2>
      <div className="flex items-center mt-2">
        <img src={icon} alt={condition} className="w-12 h-12 animate-pulse" />
        <div className="ml-4">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-gray-700">
            {main.temp}°C - {condition}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
