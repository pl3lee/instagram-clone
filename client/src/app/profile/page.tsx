"use client";

import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ProfileHeader from "../components/ProfileHeader";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    console.log(res.data);
    return res.data;
  });

const Profile = () => {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  // if (!user) router.push("/");
  const { data, error, isLoading } = useSWR(
    `http://localhost:3001/users/followers/${user?._id}/id`,
    fetcher
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
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
            <Link href="/profile/edit">Edit Profile</Link>
          </button>
        </div>
      </div>
      <div className="p-6">{user.bio}</div>
      <div className="w-full flex gap-3 justify-around border-y border-solid border-slate-200 py-4">
        <BasicInfo num={user.posts.length} text="posts" />
        <BasicInfo num={data.length} text="followers" />
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
