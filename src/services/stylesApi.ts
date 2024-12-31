export const fetchStyles = async (imageUrl: string, occasion: string): Promise<any> => {
    const response = await fetch("/.netlify/functions/fetch-styles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl, occasion }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch style recommendations");
    }
  
    const data = await response.json();
    console.log("Styles API Response:", data); // Log the response for debugging
    return data;
  };
  