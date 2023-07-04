import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

export default function useUser() {
  const router = useRouter();
  const [localuser, setLocaluser] = useLocalStorage("user", null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setLocalUser = (newUser) => {
    setIsLoading(true);
    Promise.all([setLocaluser(newUser), setUser(newUser)]).then(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    if (!localuser) {
      setUser(null);
      router.push("/auth/login");
    } else {
      setUser(localuser);
    }
    setIsLoading(false);
  }, [localuser]);

  return { user, isLoading, setLocalUser };
}