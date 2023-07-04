"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import { UserInterface } from "../interfaces/User";

export interface AuthContextInterface {
  user: UserInterface | null;
  refetchUser: () => Promise<void>;
  loading: Boolean;
  error: Error | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    username: string
  ) => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface>({
  user: null,
  refetchUser: async () => {},
  loading: false,
  error: null,
  logout: async () => {},
  login: async (email: string, password: string) => {},
  register: async (email: string, password: string, username: string) => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, isLoading, setLocalUser } = useUser();
  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const logout = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    axios
      .post("http://localhost:3001/users/logout")
      .then(() => {
        setLocalUser(null);
        setError(null);
        router.push("/auth/login");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    axios
      .post("http://localhost:3001/users/login", {
        email,
        password,
      })
      .then((loggedInUser) => {
        setLocalUser(loggedInUser.data);
        setError(null);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const register = async (
    email: string,
    password: string,
    username: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    axios
      .post("http://localhost:3001/users/register", {
        email,
        password,
        username,
      })
      .then((loggedInUser) => {
        setLocalUser(loggedInUser.data);
        setError(null);
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const refetchUser = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    console.log("refetching user");
    axios
      .get(`http://localhost:3001/users/${user?._id}`)
      .then((response) => {
        console.log("refetch user success", response.data);
        setError(null);
        setLocalUser(response.data);
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
