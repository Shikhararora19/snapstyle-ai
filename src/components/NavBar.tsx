import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          SnapStyle AI
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/results" className="hover:underline">
            Results
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
