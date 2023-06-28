"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  let user: any;
  useEffect(() => {
    user = window.localStorage.getItem("user");
    if (user) {
      router.push("/posts");
    } else {
      router.push("/auth/login");
    }
  }, []);

  return <div>HOME PAGE</div>;
}
