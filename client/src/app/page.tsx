"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLocalStorage from "use-local-storage";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useLocalStorage("user", null);
  useEffect(() => {
    if (user) {
      router.push("/posts");
    } else {
      router.push("/auth/login");
    }
  }, []);

  return <div>HOME PAGE</div>;
}
