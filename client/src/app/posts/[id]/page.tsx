"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import useLocalStorage from "use-local-storage";
import useSWR from "swr";
import axios from "axios";
import { AuthContext } from "@/app/contexts/AuthContext";
import Post from "@/app/components/Post";
import fetcher from "@/app/fetcher/fetcher";

const PostPage = ({ params }: any) => {
  const { id } = params;
  const { data, error, isLoading } = useSWR(
    `http://localhost:3001/posts/post/${id}`,
    fetcher
  );
  if (!isLoading) {
    return <Post post={data} />;
  }
};
export default PostPage;
