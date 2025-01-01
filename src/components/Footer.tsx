import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto shadow-inner">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} SnapStyle AI. All Rights Reserved.</p>
        <p className="text-sm text-gray-400">
          Made with ❤️ by Shikhar Arora
        </p>
      </div>
    </footer>
  );
};

export default Footer;
