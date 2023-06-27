"use client";
import HomeHeader from "./components/PostsHeader";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Loading from "./loading";
import Error from "./error";

export default function Home() {
  const { user, setUser, loading, error } = useContext(AuthContext);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (user) {
    redirect("/posts");
  } else {
    redirect("/auth/login");
  }
  return <div></div>;
}
