"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../../../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedInUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      axios.post("http://localhost:3001/users/register", {
        firebaseId: loggedInUser.user.uid,
      });
      console.log(loggedInUser);
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
