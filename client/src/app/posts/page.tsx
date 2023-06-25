"use client";
import PostsHeader from "../components/PostsHeader";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import FollowingPostsContainer from "../components/FollowingPostsContainer";

export default function Posts() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div>
      <PostsHeader />
      <FollowingPostsContainer uid={user?.uid} />
      <Navbar />
    </div>
  );
}
