"use client";
import Post from "./Post";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { PostInterface } from "../interfaces/Post";
import { UserInterface } from "../interfaces/User";
import LoadingComponent from "./LoadingComponent";

const FollowingPostsContainer = ({ user }: { user: UserInterface | null }) => {
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR(`http://localhost:3001/posts/following/${user?._id}`, fetcher);

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
