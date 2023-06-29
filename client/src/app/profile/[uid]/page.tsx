"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import useLocalStorage from "use-local-storage";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Profile = ({ params }: any) => {
  const router = useRouter();
  const { uid } = params;
  const [localuser, setLocaluser] = useLocalStorage("user", null);
  const [user, setUser] = useState(null);
  const { data, error, isLoading } = useSWR(
    `http://localhost:3001/users/${uid}`,
    fetcher
  );

  useEffect(() => {
    if (!localuser) {
      router.push("/auth/login");
    }
    setUser(localuser);
  }, [localuser]);

  if (!user) {
    return <div></div>;
  }
  if (!isLoading) {
    return <ProfileSection user={user} queriedUser={data} />;
  }
};

const ProfileSection = ({ user, queriedUser }: any) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center p-6 gap-8 w-full">
        <div className="flex-shrink-0 flex justify-start">
          <img
            src={queriedUser.profilePicture}
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
        </div>
        <div className="flex flex-shrink flex-col align-middle justify-center gap-3 p-1 w-[60%]">
          <div className="text-3xl overflow-x-auto overflow-y-hidden no-scrollbar">
            {queriedUser.username}
          </div>
          <div>
            {queriedUser._id === user._id ? (
              <button className="text-lg w-full text-center bg-slate-200 rounded-lg py-1 text-black">
                <Link href="/profile/edit">Edit Profile</Link>
              </button>
            ) : (
              <button className="text-lg w-full text-center bg-slate-200 rounded-lg py-1 text-black">
                Follow
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">{queriedUser.bio}</div>
      <div className="w-full flex gap-3 justify-around border-y border-solid border-slate-300 py-4">
        <BasicInfo num={queriedUser.posts.length} text="posts" />
        <BasicInfo num={queriedUser.followers.length} text="followers" />
        <BasicInfo num={queriedUser.follows.length} text="following" />
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
