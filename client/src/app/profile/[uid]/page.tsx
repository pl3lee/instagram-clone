"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { AuthContext } from "@/app/contexts/AuthContext";
import useUser from "@/app/hooks/useUser";
import LoadingComponent from "@/app/components/LoadingComponent";
import fetcher from "@/app/helpers/fetcher";
import { UserInterface } from "@/app/interfaces/User";
import { PostInterface } from "@/app/interfaces/Post";

const Profile = ({ params }: { params: { uid: string } }) => {
  const { uid } = params;
  const {
    data: queriedUserData,
    error: queryUserError,
    isLoading: queryUserLoading,
  } = useSWR(`http://localhost:3001/users/${uid}`, fetcher);
  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useSWR(`http://localhost:3001/posts/user/${uid}`, fetcher);

  if (queryUserLoading || postsLoading) {
    return <LoadingComponent />;
  } else {
    return (
      <div className="flex flex-col">
        <ProfileInfoSection queriedUser={queriedUserData} />
        <PostsSection posts={posts} />
      </div>
    );
  }
};

const ProfileInfoSection = ({
  queriedUser,
}: {
  queriedUser: UserInterface;
}) => {
  const { refetchUser } = useContext(AuthContext);
  const { user, isLoading: userLoading } = useUser();
  const [followed, setFollowed] = useState(false);

  const handleFollow = () => {
    axios
      .patch("http://localhost:3001/users/follow", {
        uid: user._id,
        followId: queriedUser._id,
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
        followId: queriedUser._id,
      })
      .then((res) => {
        refetchUser();
        console.log("User unfollowed");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!userLoading && user) {
      setFollowed(user.follows.includes(queriedUser._id));
    }
  }, [user]);

  if (userLoading) {
    return <LoadingComponent />;
  } else if (user) {
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
                <button className="text-lg w-full text-center bg-button2 rounded-lg py-1 text-black">
                  <Link href="/profile/edit">Edit Profile</Link>
                </button>
              ) : followed ? (
                <button
                  onClick={handleUnfollow}
                  className="text-lg w-full text-center bg-button2 rounded-lg py-1 text-black"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className="text-lg w-full text-center bg-button1 rounded-lg py-1 text-white"
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">{queriedUser.bio}</div>
        <div className="w-full flex gap-3 justify-around border-y border-solid border-borderGray py-4">
          <BasicInfo num={queriedUser.posts.length} text="posts" />
          <BasicInfo num={queriedUser.followers.length} text="followers" />
          <BasicInfo num={queriedUser.follows.length} text="following" />
        </div>
      </div>
    );
  }
};

const BasicInfo = ({ num, text }: { num: number; text: string }) => {
  return (
    <div className="flex flex-col align-middle justify-center">
      <div className="text-center">{num}</div>
      <div className="text-slate-400">{text}</div>
    </div>
  );
};

const PostsSection = ({ posts }: { posts: [PostInterface] }) => {
  return (
    <div className="grid grid-cols-3">
      {posts.map((post: PostInterface) => {
        return (
          <div key={post._id} className="w-full aspect-square">
            <Link href={`/posts/${post._id}`}>
              <img src={post.img} className="w-full h-full object-cover" />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Profile;
