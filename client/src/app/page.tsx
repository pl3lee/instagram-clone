import HomeHeader from "./components/PostsHeader";
import Navbar from "./components/Navbar";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { getAuth } from "./contexts/AuthContext";

export default function Home() {
  const auth = getAuth();
  if (auth) {
    redirect("/posts");
  } else {
    redirect("/auth/login");
  }
  return <div></div>;
}
