"use client";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";

const Profile = () => {
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <div>
      <h1>Profile</h1>
      <button className="border-solid border" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
