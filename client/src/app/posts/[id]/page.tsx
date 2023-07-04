"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { AuthContext } from "@/app/contexts/AuthContext";
import Post from "@/app/components/Post";
import fetcher from "@/app/fetcher/fetcher";
import useUser from "@/app/hooks/useUser";
import LoadingComponent from "@/app/components/LoadingComponent";

const PostPage = ({ params }: any) => {
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
