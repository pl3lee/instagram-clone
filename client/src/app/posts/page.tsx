"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FollowingPostsContainer from "../components/FollowingPostsContainer";

export default function Posts() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const getUser = JSON.parse(window.localStorage.getItem("user"));
    console.log(getUser);
    if (!getUser) {
      router.push("/auth/login");
    } else {
      setUser(getUser);
    }
  }, []);

  return (
    <div className="mb-[10vh]">
      <FollowingPostsContainer uid={user?._id} />
    </div>
  );
}
