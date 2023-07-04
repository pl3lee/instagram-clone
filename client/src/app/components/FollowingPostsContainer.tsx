"use client";
import axios from "axios";
import Post from "./Post";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";

const FollowingPostsContainer = ({ user }: any) => {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR(`http://localhost:3001/posts/following/${user._id}`, fetcher);

  return (
    <div>
      {posts &&
        posts.map((post: any) => {
          return (
            <div key={post._id}>
              <Post post={post} localUser={user} />
            </div>
          );
        })}
    </div>
  );
};

export default FollowingPostsContainer;
