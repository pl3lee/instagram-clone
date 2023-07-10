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
import ProfilePictureIcon from "@/app/components/ProfilePictureIcon";
import { backendURL } from "@/app/backendURL";

const Profile = ({ params }: { params: { uid: string } }) => {
  const { uid } = params;
  const {
    data: queriedUserData,
    error: queryUserError,
    isLoading: queryUserLoading,
  } = useSWR(`${backendURL}/users/user/${uid}`, fetcher);
  const { user, isLoading: userLoading } = useUser();
  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useSWR(`${backendURL}/posts/user/${uid}`, fetcher);

  if (queryUserLoading || postsLoading || userLoading) {
    return <LoadingComponent />;
  } else {
    return (
      <div className="flex flex-col">
        <ProfileInfoSection queriedUser={queriedUserData} user={user} />
        <PostsSection posts={posts} user={user} />
      </div>
    );
  }
};

const ProfileInfoSection = ({
  queriedUser,
  user,
}: {
  queriedUser: UserInterface;
  user: UserInterface | null;
}) => {
  const { refetchUser } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  const handleFollow = () => {
    axios
      .patch(
        `${backendURL}/users/follow`,
        {
          uid: user?._id,
          followId: queriedUser._id,
        },
        {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("token") || ""),
          },
        }
      )
      .then((res) => {
        refetchUser();
        console.log("User followed");
      })
      .catch((err) => console.log(err));
  };
  const handleUnfollow = () => {
    axios
      .patch(
        `${backendURL}/users/unfollow`,
        {
          uid: user?._id,
          followId: queriedUser._id,
        },
        {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("token") || ""),
          },
        }
      )
      .then((res) => {
        refetchUser();
        console.log("User unfollowed");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (user) {
      setFollowed(user.follows.includes(queriedUser._id));
    }
  }, [user]);

  if (user) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-center p-6 gap-8 w-full">
          <ProfilePictureIcon image={queriedUser.profilePicture} size="xl" />
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

const PostsSection = ({
  posts,
  user,
}: {
  posts: [PostInterface];
  user: UserInterface | null;
}) => {
  if (user) {
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
  }
};
export default Profile;
