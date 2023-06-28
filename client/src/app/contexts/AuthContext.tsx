"use client";
import { createContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext<{ user: any; setUser: any } | null>(
  null
);

const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = async () => {
    setLoading(true);
    setError(null);
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
    // router.push("/");
  };
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((loggedInUser) => {
        axios
          .get(`http://localhost:3001/users/fb/${loggedInUser.uid}`)
          .then((response) => {
            setUser(response.data);
            console.log("Logged in", response.data);
          })
          .catch((err) => setError(err));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    createUserWithEmailAndPassword(auth, email, password)
      .then((createdUser) => {
        axios
          .get(`http://localhost:3001/users/register/${createdUser.uid}`)
          .then((response) => {
            setUser(response.data);
            console.log("Registered", response.data);
          })
          .catch((err) => setError(err));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

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
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      if (loggedInUser) {
        axios
          .get(`http://localhost:3001/users/fb/${loggedInUser.uid}`)
          .then((response) => {
            setUser(response.data);
            setLoading(false);
          })
          .catch((err) => setError(err));
      }
    });
    return () => unsubscribe();
  }, []);

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
