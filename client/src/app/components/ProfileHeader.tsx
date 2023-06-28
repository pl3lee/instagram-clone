"use client";
import Link from "next/link";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ProfileHeader = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = JSON.parse(window.localStorage.getItem("user"));
    console.log(getUser);
    if (!getUser) {
      router.push("/auth/login");
    } else {
      setUser(getUser);
    }
  }, []);
  const [userInfo, setUserInfo] = useState(null);
  if (!user) return null;

  return (
    <ul className="sticky-header px-4">
      <li className="w-1/3 flex-1 list-none">
        <div className="text-3xl p-2 font-bold text-left overflow-x-auto overflow-y-hidden no-scrollbar">
          {user.username}
        </div>
      </li>
      <li className="flex-1 flex justify-end items-center">
        <button
          className="px-4 py-1 h-3/4 rounded-full bg-blue-400 text-sm"
          onClick={logout}
        >
          Logout
        </button>
      </li>
    </ul>
  );
};
export default ProfileHeader;
