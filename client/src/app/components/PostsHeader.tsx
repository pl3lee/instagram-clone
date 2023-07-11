"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import useUser from "../hooks/useUser";
import LoadingComponent from "./LoadingComponent";
import GenericHeader from "./GenericHeader";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { NotificationInterface } from "../interfaces/Notification";
import { backendURL } from "../backendURL";

const PostsHeader = () => {
  const { user, isLoading: userLoading } = useUser();
  const {
    data: notifications,
    error: notificationsError,
    isLoading: notificationsLoading,
  } = useSWR(
    !userLoading && user
      ? `${backendURL}/users/notifications/notification/${user._id}`
      : null,
    fetcher
  );

  const pathname = usePathname();
  if (!userLoading && !notificationsLoading) {
    if (pathname === "/posts/create") {
      return <GenericHeader title="New Post" />;
    } else if (pathname.startsWith("/posts/")) {
      return <GenericHeader title="Post" />;
    } else if (pathname.startsWith("/posts")) {
      return (
        <ul className="sticky-header md:hidden">
          <li className="flex-grow-[7]">
            <div className="text-3xl py-2 px-5 font-bold">Instagram</div>
          </li>
          <li className="icon-container">
            <Link href="/posts/create">
              <svg
                aria-label="Home"
                color="rgb(245, 245, 245)"
                fill="rgb(245, 245, 245)"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
                className="svg-icons"
              >
                <title>Home</title>
                <path
                  d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552Z"
                  fill="none"
                  className="stroke-black dark:stroke-white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></path>
                <line
                  fill="none"
                  className="stroke-black dark:stroke-white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  x1="6.545"
                  x2="17.455"
                  y1="12.001"
                  y2="12.001"
                ></line>
                <line
                  fill="none"
                  className="stroke-black dark:stroke-white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  x1="12.003"
                  x2="12.003"
                  y1="6.545"
                  y2="17.455"
                ></line>
              </svg>
            </Link>
          </li>
          <li className="icon-container">
            <Link href="/notifications">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`svg-icons ${
                  notifications.filter(
                    (notification: NotificationInterface) => {
                      return !notification.read;
                    }
                  ).length > 0
                    ? "fill-red-600"
                    : "fill-none"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </Link>
          </li>
        </ul>
      );
    }
  } else {
    return <LoadingComponent />;
  }
};
export default PostsHeader;
