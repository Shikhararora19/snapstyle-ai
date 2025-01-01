import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg shadow hover:bg-red-600 transition duration-300"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
