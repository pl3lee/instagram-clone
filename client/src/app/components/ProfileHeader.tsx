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
  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get(`http://localhost:3001/users/fb`, {
  //         params: { firebaseId: user.uid },
  //       })
  //       .then((response) => {
  //         setUserInfo(response.data);
  //         console.log(response.data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // });
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
