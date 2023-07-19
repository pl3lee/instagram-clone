"use client";
import { useEffect } from "react";
const Error = () => {
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="text-3xl">
        An error occurred. Please{" "}
        <a
          href="https://instagram-clone.billylee.me"
          className="text-blue-500 underline"
        >
          Login
        </a>{" "}
        again.
      </div>
    </div>
  );
};

export default Error;
