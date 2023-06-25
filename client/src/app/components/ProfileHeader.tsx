"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const ProfileHeader = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  if (!user) return null;

  return (
    <ul className="sticky-header">
      <li className="flex-1">
        <div className="text-3xl p-2 font-bold">Instagram</div>
      </li>
    </ul>
  );
};
export default ProfileHeader;
