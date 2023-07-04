"use client";
import useSWR from "swr";
import Post from "@/app/components/Post";
import fetcher from "@/app/helpers/fetcher";
import useUser from "@/app/hooks/useUser";
import LoadingComponent from "@/app/components/LoadingComponent";

const PostPage = ({ params }: { params: { id: string } }) => {
  const { user: localUser, isLoading: userLoading } = useUser();
  const { id } = params;
  const {
    data,
    error,
    isLoading: postLoading,
  } = useSWR(`http://localhost:3001/posts/post/${id}`, fetcher);
  if (postLoading || userLoading) {
    return <LoadingComponent />;
  } else {
    return <Post post={data} localUser={localUser} />;
  }
};
export default PostPage;
