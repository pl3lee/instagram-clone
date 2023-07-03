"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FollowingPostsContainer from "../components/FollowingPostsContainer";
import useUser from "../hooks/useUser";
import LoadingComponent from "../components/LoadingComponent";

export default function Posts() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <LoadingComponent />;
  } else {
    return (
      <div className="mb-[10vh]">
        <FollowingPostsContainer user={user} />
      </div>
    );
  }
}
