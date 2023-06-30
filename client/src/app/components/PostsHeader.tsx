"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

const PostsHeader = () => {
  const [localuser, setLocaluser] = useLocalStorage("user", null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(localuser);
  }, []);
  const pathname = usePathname();
  if (!user) return <div></div>;
  if (pathname === "/posts/create") {
    return (
      <ul className="sticky-header">
        <li className="text-center text-3xl font-bold p-2">Create post</li>
      </ul>
    );
  } else if (pathname.startsWith("/posts")) {
    return (
      <ul className="sticky-header">
        <li className="flex-grow-[7]">
          <div className="text-3xl p-2 font-bold">Instagram</div>
        </li>
        <li className="icon-container">
          <Link href="/posts/create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="svg-icons"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
        <li className="icon-container">
          <Link href="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="svg-icons"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </Link>
        </li>
      </ul>
    );
  }
};
export default PostsHeader;
