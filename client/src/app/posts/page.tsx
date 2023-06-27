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
    console.log("from posts", user);
    if (!user) {
      router.push("/");
    }
  }, []);
  if (!user) return null;
  return (
    <div className="mb-[10vh]">
      <PostsHeader />
      <FollowingPostsContainer uid={user._id} />
    </div>
  );
}
