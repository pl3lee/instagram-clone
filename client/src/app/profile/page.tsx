"use client";

import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ProfileHeader from "../components/ProfileHeader";

const Profile = () => {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  if (!user) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center p-6 gap-8">
        <div className="flex-shrink-0">
          <img
            src={user.profilePicture}
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col align-middle justify-center w-full gap-3 p-1">
          <div className="text-3xl">{user.username}</div>
          <button className="text-lg w-full text-center bg-slate-200 rounded-lg py-1 text-black">
            Edit Profile
          </button>
        </div>
      </div>
      <div className="p-6">{user.bio}</div>
      <div className="w-full flex gap-3 justify-around">
        {/* <div className="flex flex-col align-middle justify-center">
          <div className="text-center">{user.posts.length}</div>
          <div className="text-slate-700 font-extralight">posts</div>
        </div> */}
        <BasicInfo num={user.posts.length} text="posts" />
        {/* <BasicInfo num={user.followers.length} text="followers" /> */}
        <BasicInfo num={user.follows.length} text="following" />
      </div>
    </div>
  );
};

const BasicInfo = ({ num, text }: any) => {
  return (
    <div className="flex flex-col align-middle justify-center">
      <div className="text-center">{num}</div>
      <div className="text-slate-700 font-extralight">{text}</div>
    </div>
  );
};

export default Profile;
