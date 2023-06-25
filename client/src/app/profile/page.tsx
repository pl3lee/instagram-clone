"use client";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ProfileHeader from "../components/ProfileHeader";

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
      <ProfileHeader />
      <button className="border-solid border" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
