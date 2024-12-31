export const analyzeImage = async (imageUrl: string) => {
    const response = await fetch("/.netlify/functions/analyze-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });
    return response.json();
  };
  