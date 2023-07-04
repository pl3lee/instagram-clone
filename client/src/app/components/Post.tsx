"use client";
import axios from "axios";
import ViewComments from "./ViewComments";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { AuthContext, AuthContextInterface } from "../contexts/AuthContext";
import fetcher from "../helpers/fetcher";
import LoadingComponent from "./LoadingComponent";
import { PostInterface } from "../interfaces/Post";
import { UserInterface } from "../interfaces/User";
import ProfilePictureIcon from "./ProfilePictureIcon";

const Post = ({
  post,
  localUser,
}: {
  post: PostInterface;
  localUser: UserInterface | null;
}) => {
  const authContext: AuthContextInterface = useContext(AuthContext);
  const refetchUser = authContext.refetchUser;
  const [likeAmount, setLikeAmount] = useState<number>(post.likes.length);
  const {
    data: postUser,
    error: postUserError,
    isLoading: postUserLoading,
  } = useSWR(`http://localhost:3001/users/${post.uid}`, fetcher);

  const handleToggleLike = (): void => {
    axios
      .patch(`http://localhost:3001/posts/toggle/${localUser?._id}/${post._id}`)
      .then((res) => {
        refetchUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!postUserLoading) {
    return (
      <div className="flex flex-col">
        <PostHeader postUser={postUser} />
        <PostImage post={post} toggleLike={handleToggleLike} />
        <PostIconBar
          toggleLike={handleToggleLike}
          post={post}
          localUser={localUser}
          setLikeAmount={setLikeAmount}
        />
        <PostInformation
          post={post}
          postUser={postUser}
          likeAmount={likeAmount}
        />
      </div>
    );
  } else {
    return <LoadingComponent />;
  }
};

const PostHeader = ({ postUser }: { postUser: UserInterface }) => {
  return (
    <div className="flex gap-1 px-2 py-3">
      <ProfilePictureIcon image={postUser.profilePicture} size="lg" />
      <div className="flex-grow-[9] text-lg font-bold flex items-center ml-3">
        <Link href={`/profile/${postUser._id}`}>{postUser.username}</Link>
      </div>
    </div>
  );
};

const PostImage = ({
  post,
  toggleLike,
}: {
  post: PostInterface;
  toggleLike: () => void;
}) => {
  return (
    <div
      onDoubleClick={(e) => {
        toggleLike();
        console.log("double clicked");
      }}
    >
      <img src={post.img} className="w-full h-auto" alt="post image" />
    </div>
  );
};

const PostIconBar = ({
  post,
  localUser,
  toggleLike,
  setLikeAmount,
}: {
  post: PostInterface;
  localUser: UserInterface | null;
  toggleLike: () => void;
  setLikeAmount: (callback: (likeAmount: number) => number) => void;
}) => {
  const [liked, setLiked] = useState(
    localUser && post.likes.includes(localUser._id)
  );
  return (
    <div className="flex">
      <ul className="px-2 py-2 flex gap-3 justify-start w-full bg-white dark:bg-black">
        <li className="icon-container p-0">
          <button
            onClick={(e) => {
              toggleLike();
              setLiked(!liked);
              setLikeAmount((prevState: number) => {
                if (liked) {
                  return prevState - 1;
                } else {
                  return prevState + 1;
                }
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={liked ? "red" : "none"}
              className="w-7 h-7 stroke-black dark:stroke-white"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </li>
        <li className="icon-container p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7 dark:stroke-white stroke-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
            />
          </svg>
        </li>
      </ul>
    </div>
  );
};

const PostInformation = ({
  post,
  postUser,
  likeAmount,
}: {
  post: PostInterface;
  postUser: UserInterface;
  likeAmount: number;
}) => {
  const postDate = new Date(post.postDateTime);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="flex flex-col px-2 py-2 gap-1">
      <div>
        <div className="flex items-center gap-1">
          <span className="inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </span>
          {likeAmount} Likes
        </div>
      </div>
      <div>
        <span className="font-bold">{postUser.username}</span> {post.caption}
      </div>
      <ViewComments post={post} />
      <div className="font-light opacity-50 text-sm">
        Posted on {days[postDate.getDay()]}, {postDate.getFullYear()}/
        {postDate.getMonth()}/{postDate.getDate()}
      </div>
    </div>
  );
};

export default Post;
