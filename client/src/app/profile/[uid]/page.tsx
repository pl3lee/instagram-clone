"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import useLocalStorage from "use-local-storage";
import useSWR from "swr";
import axios from "axios";
import { AuthContext } from "@/app/contexts/AuthContext";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Profile = ({ params }: any) => {
  const { uid } = params;
  return (
    <div className="flex flex-col">
      <ProfileInfoSection queriedUser={uid} />
      <PostsSection queriedUser={uid} />
    </div>
  );
};

const ProfileInfoSection = ({ queriedUser }: any) => {
  const router = useRouter();
  const { refetchUser } = useContext(AuthContext);
  const [localuser, setLocaluser] = useLocalStorage("user", null);
  const [user, setUser] = useState(null);
  const { data, error, isLoading } = useSWR(
    `http://localhost:3001/users/${queriedUser}`,
    fetcher
  );

  useEffect(() => {
    if (!localuser) {
      router.push("/auth/login");
    }
    setUser(localuser);
  }, [localuser]);

  const handleFollow = () => {
    axios
      .patch("http://localhost:3001/users/follow", {
        uid: user._id,
        followId: queriedUser,
      })
      .then((res) => {
        refetchUser();
        console.log("User followed");
      })
      .catch((err) => console.log(err));
  };
  const handleUnfollow = () => {
    axios
      .patch("http://localhost:3001/users/unfollow", {
        uid: user._id,
        followId: queriedUser,
      })
      .then((res) => {
        refetchUser();
        console.log("User followed");
      })
      .catch((err) => console.log(err));
  };
  if (!user) {
    return <div></div>;
  }
  if (!isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-center p-6 gap-8 w-full">
          <div className="flex-shrink-0 flex justify-start">
            <img
              src={data.profilePicture}
              className="w-[100px] h-[100px] rounded-full object-cover"
            />
          </div>
          <div className="flex flex-shrink flex-col align-middle justify-center gap-3 p-1 w-[60%]">
            <div className="text-3xl overflow-x-auto overflow-y-hidden no-scrollbar">
              {data.username}
            </div>
            <div>
              {data._id === user._id ? (
                <button className="text-lg w-full text-center bg-slate-200 rounded-lg py-1 text-black">
                  <Link href="/profile/edit">Edit Profile</Link>
                </button>
              ) : user.follows.includes(queriedUser) ? (
                <button
                  onClick={handleUnfollow}
                  className="text-lg w-full text-center bg-slate-200 rounded-lg py-1 text-black"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className="text-lg w-full text-center bg-slate-200 rounded-lg py-1 text-black"
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">{data.bio}</div>
        <div className="w-full flex gap-3 justify-around border-y border-solid border-slate-300 py-4">
          <BasicInfo num={data.posts.length} text="posts" />
          <BasicInfo num={data.followers.length} text="followers" />
          <BasicInfo num={data.follows.length} text="following" />
        </div>
      </div>
    );
  }
};

const BasicInfo = ({ num, text }: any) => {
  return (
    <div className="flex flex-col align-middle justify-center">
      <div className="text-center">{num}</div>
      <div className="text-slate-400">{text}</div>
    </div>
  );
};

const PostsSection = ({ queriedUser }: any) => {
  const {
    data: posts,
    error: postsError,
    isLoading: postsIsLoading,
  } = useSWR(`http://localhost:3001/posts/user/${queriedUser}`, fetcher);
  if (!postsIsLoading) {
    return (
      <div className="grid grid-cols-3">
        {posts.map((post: any) => {
          return (
            <div key={post._id} className="w-full aspect-square">
              <img src={post.img} className="w-full h-full object-cover" />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default Profile;
