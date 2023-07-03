"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import useUser from "./hooks/useUser";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/posts");
    }
  });
  if (isLoading) return <div>LOADING...</div>;

  return <div>HOME PAGE</div>;
}
