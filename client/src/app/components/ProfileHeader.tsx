"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useLocalStorage from "use-local-storage";

const ProfileHeader = () => {
  const { logout } = useContext(AuthContext);
  const [localuser, setLocaluser] = useLocalStorage("user", null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(localuser);
  }, [localuser]);

  if (user) {
    return (
      <ul className="sticky-header px-4">
        <li className="w-1/3 flex-1 list-none">
          <div className="text-3xl p-2 font-bold text-left overflow-x-auto overflow-y-hidden no-scrollbar">
            {user?.username}
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
  }
  return <div></div>;
};
export default ProfileHeader;
