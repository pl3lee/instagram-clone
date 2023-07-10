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
        <ul className="sticky-header">
          <li className="flex-grow-[7]">
            <div className="text-3xl py-2 px-5 font-bold">Instagram</div>
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
