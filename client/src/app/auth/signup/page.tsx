"use client";
import Link from "next/link";
import { useState } from "react";
import { auth } from "../../../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

const SignUp = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (!loading && user) {
    router.push("/");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(loggedInUser);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex w-full justify-center align-middle p-16 h-screen">
      <div className="flex flex-col gap-40">
        <div className="text-bold text-3xl text-center">Instagram</div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            className="auth-input"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Register
          </button>
        </form>
        <div>
          Already have an account?{" "}
          <Link className="text-blue-900" href="/auth/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;