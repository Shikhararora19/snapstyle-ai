export const getLocation = async (): Promise<{ latitude: number; longitude: number; locationName: string }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation not supported by your browser.");
      }
  
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
  
          try {
            // Reverse geocoding to get location name
            const apiKey = process.env.OPENCAGE_API_KEY;
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=15f8ae7aa4904b13a933e7d771579cbf`
            );
  
            if (!response.ok) {
              throw new Error("Failed to fetch location name.");
            }
  
            const data = await response.json();
            console.log("Location data:", data);
            const locationName = data.results[0]?.formatted || "Unknown location";
  
            resolve({ latitude, longitude, locationName });
          } catch (error) {
            reject(`Error fetching location name: ${(error as Error).message}`);
          }
        },
        (error) => reject(error.message)
      );
    });
  };
  