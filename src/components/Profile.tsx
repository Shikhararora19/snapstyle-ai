import React from "react";
import { getCurrentUser } from "../firebase/auth";

const Profile: React.FC = () => {
  const user = getCurrentUser();

  if (!user) {
    return <p>No user logged in.</p>;
  }

  return (
    <div>
      <p>Welcome, {user.email}</p>
    </div>
  );
};

export default Profile;
