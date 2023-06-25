"use client";
import HomeHeader from "./components/PostsHeader";
import Navbar from "./components/Navbar";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

export default function Home() {
  const { user, setUser } = useContext(AuthContext);

  if (user) {
    redirect("/posts");
  } else {
    redirect("/auth/login");
  }
  return <div></div>;
}
