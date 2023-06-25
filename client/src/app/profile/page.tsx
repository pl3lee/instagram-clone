"use client";

import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ProfileHeader from "../components/ProfileHeader";

const Profile = () => {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);

  return (
    <div>
      <ProfileHeader />
    </div>
  );
};

export default Profile;
