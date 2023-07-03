"use client";
import axios from "axios";
import ViewComments from "./ViewComments";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import useSWR from "swr";
import { AuthContext } from "../contexts/AuthContext";
import fetcher from "../fetcher/fetcher";
import LoadingComponent from "./LoadingComponent";

const Post = ({ post, localUser }: any) => {
  const { refetchUser } = useContext(AuthContext);
  const [likeAmount, setLikeAmount] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(localUser._id));
  const {
    data: postUser,
    error: postUserError,
    isLoading: postUserLoading,
  } = useSWR(`http://localhost:3001/users/${post.uid}`, fetcher);

  const handleToggleLike = () => {
    axios
      .patch(`http://localhost:3001/posts/toggle/${localUser._id}/${post._id}`)
      .then((res) => {
        if (res.data.message === "Post liked") {
          setLikeAmount(likeAmount + 1);
        } else if (res.data.message === "Post unliked") {
          setLikeAmount(likeAmount - 1);
        }
        setLiked(!liked);
        refetchUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!postUserLoading) {
    return (
      <div className="flex flex-col">
        <PostHeader
          profilePicture={postUser?.profilePicture}
          username={postUser?.username}
          uid={postUser?._id}
        />
        <PostImage img={post.img} toggleLike={handleToggleLike} />
        <PostIconBar toggleLike={handleToggleLike} liked={liked} />
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

const PostHeader = ({ profilePicture, username, uid }: any) => {
  return (
    <div className="flex gap-1 px-2 py-3">
      <div className="flex-shrink-0 mr-3">
        <img
          src={profilePicture}
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
      </div>
      <div className="flex-grow-[9] text-lg font-bold flex items-center">
        <Link href={`/profile/${uid}`}>{username}</Link>
      </div>
    </div>
  );
};

const PostImage = ({ img, toggleLike }: any) => {
  return (
    <div
      onDoubleClick={(e) => {
        toggleLike();
        console.log("double clicked");
      }}
    >
      <img src={img} className="w-full h-auto" />
    </div>
  );
};

const PostIconBar = ({ liked, toggleLike }: any) => {
  return (
    <div className="flex">
      <ul className="px-2 py-2 flex gap-3 justify-start w-full bg-white dark:bg-black">
        <li className="icon-container p-0">
          <button
            onClick={(e) => {
              toggleLike();
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

const PostInformation = ({ post, postUser, likeAmount }: any) => {
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
