"use client";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    router.push("/");
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
