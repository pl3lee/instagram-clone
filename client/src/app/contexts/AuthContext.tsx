"use client";
import { createContext, useState, useEffect } from "react";
// import { auth } from "../../firebase/firebase-config";
// import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
// import {
//   signOut,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
// } from "firebase/auth";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<{ user: any; setUser: any } | null>(
  null
);

const AuthProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = async () => {
    setLoading(true);
    setError(null);
    axios
      .post("http://localhost:3001/users/logout")
      .then(() => {
        setUser(null);
        setError(null);
        localStorage.removeItem("user");
        router.push("/auth/login");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    axios
      .post("http://localhost:3001/users/login", {
        email,
        password,
      })
      .then((loggedInUser) => {
        setUser(loggedInUser);
        setError(null);
        localStorage.setItem("user", JSON.stringify(loggedInUser.data));
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    axios
      .post("http://localhost:3001/users/register", {
        email,
        password,
      })
      .then((loggedInUser) => {
        setUser(loggedInUser);
        setError(null);
        localStorage.setItem("user", JSON.stringify(loggedInUser.data));
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const refetchUser = () => {
    setLoading(true);
    setError(null);
    axios
      .get(`http://localhost:3001/users/${user._id}`)
      .then((response) => {
        setUser(response.data);
        setError(null);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        refetchUser,
        loading,
        error,
        logout,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
