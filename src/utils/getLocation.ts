export const getLocation = async (): Promise<{ latitude: number; longitude: number; locationName: string }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported by your browser.");
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          try {
            const apiKey = process.env.OPENCAGE_API_KEY || "";
            if (!apiKey) {
              throw new Error("OpenCage API key is missing.");
            }
  
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=15f8ae7aa4904b13a933e7d771579cbf`
            );
  
            if (!response.ok) {
              throw new Error(`Failed to fetch location name: ${response.statusText}`);
            }
  
            const data = await response.json();
  
            // Extract city from components
            const components = data.results[0]?.components;
            const city = components?.city || components?.town || components?.village || "New York";
  
            resolve({ latitude, longitude, locationName: city });
          } catch (error) {
            if (error instanceof Error) {
              reject(`Error fetching location name: ${error.message}`);
            } else {
              reject("Error fetching location name.");
            }
          }
        },
        (error) => reject(error.message)
      );
    });
  };
  