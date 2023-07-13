"use client";
import Post from "./Post";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { PostInterface } from "../interfaces/Post";
import { UserInterface } from "../interfaces/User";
import LoadingComponent from "./LoadingComponent";
import { backendURL } from "../backendURL";
import NoPostsYet from "./NoPostsYet";

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
      <div className="min-h-screen md:max-w-screen-sm">
        {posts && posts.length === 0 ? (
          <div className="h-screen flex justify-center items-center ">
            <NoPostsYet subtext="Find someone to follow in the search tab, or create a post yourself!" />
          </div>
        ) : (
          posts &&
          posts.map((post: PostInterface) => {
            return (
              <div key={post._id}>
                <Post post={post} localUser={user} />
              </div>
            );
          })
        )}
      </div>
    );
  }
};

export default FollowingPostsContainer;
