"use client";
import React, { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";
import { UserInterface } from "../interfaces/User";
import { backendURL } from "../backendURL";
import useLocalStorage from "use-local-storage";

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
  const [token, setToken] = useLocalStorage<string | null>("token", null);

  const logout = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    axios
      .post(`${backendURL}/users/logout`)
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
      .post(`${backendURL}/users/login`, {
        email,
        password,
      })
      .then((loggedInUser) => {
        setLocalUser(loggedInUser.data.user);
        setToken(loggedInUser.data.token);
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
      .post(`${backendURL}/users/register`, {
        email,
        password,
        username,
      })
      .then((loggedInUser) => {
        setLocalUser(loggedInUser.data.user);
        setToken(loggedInUser.data.token);
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
    axios
      .get(`${backendURL}/users/user/${user?._id}`, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("token") || ""),
        },
      })
      .then((response) => {
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
