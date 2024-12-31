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
    <div className="bg-blue-100 p-4 rounded shadow mt-4">
      <h2 className="text-xl font-bold">Current Weather</h2>
      <div className="flex items-center mt-2">
        <img src={icon} alt={condition} className="w-12 h-12" />
        <div className="ml-4">
          <p className="text-lg">{name}</p>
          <p className="text-gray-700">
            {main.temp}°C - {condition}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
