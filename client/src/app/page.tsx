"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useUser from "./hooks/useUser";
import LoadingComponent from "./components/LoadingComponent";

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  useEffect(() => {
    if (!isLoading && user) {
      router.push("/posts");
    }
  });
  return <LoadingComponent />;
}
