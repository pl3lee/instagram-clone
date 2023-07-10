"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useUser from "../hooks/useUser";

const ProfileHeader = () => {
  const { logout } = useContext(AuthContext);
  const { user, isLoading } = useUser();

  if (!isLoading && user) {
    return (
      <ul className="sticky-header px-4">
        <li className="flex-2 list-none">
          <div className="text-3xl p-2 font-bold text-left overflow-x-auto overflow-y-hidden no-scrollbar">
            {user?.username}
          </div>
        </li>
        <li className="flex-1 flex justify-end items-center">
          <button
            className="px-4 py-1 h-3/4 rounded-full bg-accentBlue text-sm text-white font-bold"
            onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    );
  }
  return <div></div>;
};
export default ProfileHeader;
