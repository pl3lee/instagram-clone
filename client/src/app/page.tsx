"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

export default function Home() {
  const router = useRouter();
  const [localuser, setLocaluser] = useLocalStorage("user", null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!localuser) {
      router.push("/auth/login");
    } else {
      setUser(localuser);
      router.push("/posts");
    }
  }, [localuser]);

  return <div>HOME PAGE</div>;
}
