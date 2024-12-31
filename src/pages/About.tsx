import React from "react";

const About: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4">About SnapStyle AI</h1>
      <p className="text-gray-700">
        SnapStyle AI is a virtual styling assistant that uses artificial intelligence to suggest outfit ideas tailored to your preferences, weather conditions, and special occasions.
      </p>
      <p className="mt-4 text-gray-700">
        Our goal is to make dressing up fun and effortless. Upload an image, let our AI analyze it, and get style recommendations that suit your needs!
      </p>
    </div>
  );
};

export default About;
