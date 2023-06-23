"use client"
import { auth } from "..//firebase/firebase-config";
import { User, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false)
      }
    });
  }, [user]);

  return {user, loading};
}

export default useAuth;