import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { UserInterface } from "../interfaces/User";

export default function useUser() {
  const router = useRouter();
  const [localuser, setLocaluser] = useLocalStorage<UserInterface | null>(
    "user",
    null
  );
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const setLocalUser = (newUser: UserInterface | null): void => {
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
