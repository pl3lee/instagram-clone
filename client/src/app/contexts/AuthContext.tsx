"use client";
import { createContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext<{ user: any; setUser: any } | null>(
  null
);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetchUser = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:3001/users/${user._id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);
      setError(null);
      if (currentUser) {
        axios
          .get(`http://localhost:3001/users/fb/${currentUser.uid}`)
          .then((response) => {
            console.log("AuthContext changed", response.data);
            setUser(response.data);
          })
          .catch((err) => {
            console.log(err);
            setError(err);
          })
          .finally(() => setLoading(false));
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, refetchUser, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
