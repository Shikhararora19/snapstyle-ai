export interface WeatherResponse {
    coord: {
      lon: number;
      lat: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    name: string; // City name
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
  }
  