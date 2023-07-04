"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
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
          <button
            type="submit"
            className="bg-accentBlue text-white p-2 rounded"
          >
            Login
          </button>
          {error && (
            <div className="text-red-600 opacity-80 font-extralight text-sm">
              Your credentials are incorrect
            </div>
          )}
        </form>
        <div>
          Don't have an account?{" "}
          <Link className="text-linkBlue" href="/auth/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
