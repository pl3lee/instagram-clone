"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import useLocalStorage from "use-local-storage";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useLocalStorage("user", null);
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, []);
  if (!user) {
    return <div></div>;
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-start p-6 gap-8">
        <div className="flex-shrink-0 flex justify-start">
          <img
            src={user.profilePicture}
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-shrink flex-col align-middle justify-center gap-3 p-1 max-w-[60%]">
          <div className="text-3xl overflow-x-auto overflow-y-hidden no-scrollbar">
            {user.username}
          </div>
          <button className="text-lg w-full text-center bg-slate-200 rounded-lg py-1 text-black">
            <Link href="/profile/edit">Edit Profile</Link>
          </button>
        </div>
      </div>

      <div className="p-6">{user.bio}</div>
      <div className="w-full flex gap-3 justify-around border-y border-solid border-slate-300 py-4">
        <BasicInfo num={user.posts.length} text="posts" />
        <BasicInfo num={user.followers.length} text="followers" />
        <BasicInfo num={user.follows.length} text="following" />
      </div>
    </div>
  );
};

const BasicInfo = ({ num, text }: any) => {
  return (
    <div className="flex flex-col align-middle justify-center">
      <div className="text-center">{num}</div>
      <div className="text-slate-400">{text}</div>
    </div>
  );
};

export default Profile;
