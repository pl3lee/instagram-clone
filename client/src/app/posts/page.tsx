"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FollowingPostsContainer from "../components/FollowingPostsContainer";
import useLocalStorage from "use-local-storage";

export default function Posts() {
  const [localuser, setLocaluser] = useLocalStorage("user", null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (!localuser) {
      router.push("/auth/login");
    }
    setUser(localuser);
  }, []);

  return (
    <div className="mb-[10vh]">
      <FollowingPostsContainer uid={user?._id} />
    </div>
  );
}
