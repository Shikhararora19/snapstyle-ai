import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out from Firebase
      navigate("/login"); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-600">
      Log Out
    </button>
  );
};

export default LogoutButton;
