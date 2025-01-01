import React from "react";
import { logOut } from "../firebase/auth";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    await logOut();
    window.location.reload(); // Reload the app after logout
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
