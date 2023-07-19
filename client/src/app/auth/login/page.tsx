"use client";
import Link from "next/link";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [placeholder, setPlaceholder] = useState("Login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlaceholder("Logging in...");
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
            className="bg-accentBlue text-white p-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={email == "" || password == ""}
          >
            {placeholder}
          </button>
          {error && (
            <div className="text-red-600 opacity-80 font-extralight text-sm">
              Your credentials are incorrect
            </div>
          )}
          <button
            onClick={async () => {
              setEmail("demoaccount@gmail.com");
              setPassword("demoaccount123");
              await login("demoaccount@gmail.com", "demoaccount123");
            }}
            className="text-white p-2 rounded bg-green-500"
          >
            Login to demo account
          </button>
        </form>
        <div>
          Don&apos;t have an account?{" "}
          <Link className="text-linkBlue" href="/auth/signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
