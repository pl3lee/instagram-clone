"use client";
import HomeHeader from "./components/PostsHeader";
import useAuth from "@/hooks/useAuth";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Loading from "./loading";
import Error from "./error";

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
