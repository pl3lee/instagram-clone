"use client";
import useSWR from "swr";
import Post from "@/app/components/Post";
import fetcher from "@/app/helpers/fetcher";
import useUser from "@/app/hooks/useUser";
import LoadingComponent from "@/app/components/LoadingComponent";
import { backendURL } from "@/app/backendURL";

const PostPage = ({ params }: { params: { id: string } }) => {
  const { user: localUser, isLoading: userLoading } = useUser();
  const { id } = params;
  const {
    data: postData,
    error: postError,
    isLoading: postLoading,
  } = useSWR(`${backendURL}/posts/post/${id}`, fetcher);
  if (postLoading || userLoading) {
    return <LoadingComponent />;
  } else {
    return <Post post={postData} localUser={localUser} />;
  }
};
export default PostPage;
