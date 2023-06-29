"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FollowingPostsContainer from "../components/FollowingPostsContainer";
import useLocalStorage from "use-local-storage";

export default function Posts() {
  const [user, setUser] = useLocalStorage("user", null);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div className="mb-[10vh]">
      <FollowingPostsContainer uid={user?._id} />
    </div>
  );
}
