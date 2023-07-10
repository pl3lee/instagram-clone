"use client";
import Post from "./Post";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { PostInterface } from "../interfaces/Post";
import { UserInterface } from "../interfaces/User";
import LoadingComponent from "./LoadingComponent";
import { backendURL } from "../backendURL";

const FollowingPostsContainer = ({ user }: { user: UserInterface | null }) => {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR(`${backendURL}/posts/following/${user?._id}`, fetcher);

  if (isLoading) {
    return <LoadingComponent />;
  } else {
    return (
      <div>
        {posts &&
          posts.map((post: PostInterface) => {
            return (
              <div key={post._id}>
                <Post post={post} localUser={user} />
              </div>
            );
          })}
      </div>
    );
  }
};

export default FollowingPostsContainer;
