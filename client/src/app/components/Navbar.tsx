"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useUser from "../hooks/useUser";
import ProfilePictureIcon from "./ProfilePictureIcon";
import { UserInterface } from "../interfaces/User";
import useSWR from "swr";
import fetcher from "../helpers/fetcher";
import { backendURL } from "../backendURL";
import LoadingComponent from "./LoadingComponent";
import { NotificationInterface } from "../interfaces/Notification";

const Navbar = () => {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  if (
    pathname === "/auth/login" ||
    pathname === "/auth/signup" ||
    pathname.startsWith("/chat/")
  ) {
    return <div></div>;
  }
  if (!isLoading && user) {
    return (
      <div>
        <SmallNavbar user={user} />
        <MediumNavbar user={user} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

const SmallNavbar = ({ user }: { user: UserInterface }) => {
  const pathname = usePathname();
  return (
    <ul className="px-8 py-2 flex gap-3 justify-between fixed bottom-0 left-0 w-full bg-white border-borderGray border-solid border-t-[0.5px] dark:bg-black md:hidden">
      <li className="icon-container">
        <Link href="/posts">
          <svg
            aria-label="Home"
            color="rgb(245, 245, 245)"
            role="img"
            viewBox="0 0 24 24"
            className={`${
              pathname.startsWith("/posts")
                ? "fill-black dark:fill-white"
                : "fill-none"
            } svg-icons`}
            strokeWidth={2}
          >
            <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
          </svg>
        </Link>
      </li>
      <li className="icon-container">
        <Link href="/search">
          <svg
            aria-label="Search"
            color="rgb(245, 245, 245)"
            role="img"
            viewBox="0 0 24 24"
            className={`svg-icons`}
            strokeWidth={2}
          >
            <path
              d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
              className={`stroke-black dark:stroke-white ${
                pathname.startsWith("/search")
                  ? "fill-black dark:fill-white"
                  : "fill-none"
              }`}
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
              x1="16.511"
              x2="22"
              y1="16.511"
              y2="22"
            ></line>
          </svg>
        </Link>
      </li>
      <li className="icon-container">
        <Link href="/chat">
          <svg
            aria-label="Messenger"
            color="rgb(245, 245, 245)"
            fill="hsl(0, 0%, 96.07843137254902%)"
            role="img"
            viewBox="0 0 24 24"
            className={`svg-icons`}
          >
            <path
              d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
              fill="none"
              className="stroke-black dark:stroke-white"
              stroke-miterlimit="10"
              stroke-width="1.739"
            />
            <path
              d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
              fill-rule="evenodd"
              className="stroke-black dark:stroke-white fill-black dark:fill-white"
            ></path>
          </svg>
        </Link>
      </li>
      <li className="icon-container">
        <Link href={`/profile/${user._id}`}>
          <ProfilePictureIcon image={user.profilePicture} size="md" />
        </Link>
      </li>
    </ul>
  );
};

const MediumNavbar = ({ user }: { user: UserInterface }) => {
  const {
    data: notifications,
    error: notificationsError,
    isLoading: notificationsLoading,
  } = useSWR(
    `${backendURL}/users/notifications/notification/${user._id}`,
    fetcher
  );
  const pathname = usePathname();

  if (!notificationsLoading && !notificationsError && notifications) {
    return (
      <ul className="flex-col gap-5 justify-start fixed top-0 left-0 h-screen bg-white p-4 dark:bg-black hidden md:flex lg:hidden">
        <li className="icon-container">
          <Link href="/posts">
            <svg
              aria-label="Home"
              color="rgb(245, 245, 245)"
              role="img"
              viewBox="0 0 24 24"
              className={`${
                pathname.startsWith("/posts")
                  ? "fill-black dark:fill-white"
                  : "fill-none"
              } svg-icons`}
              strokeWidth={2}
            >
              <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"></path>
            </svg>
          </Link>
        </li>
        <li className="icon-container">
          <Link href="/search">
            <svg
              aria-label="Search"
              color="rgb(245, 245, 245)"
              role="img"
              viewBox="0 0 24 24"
              className={`svg-icons`}
              strokeWidth={2}
            >
              <path
                d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                className={`stroke-black dark:stroke-white ${
                  pathname.startsWith("/search")
                    ? "fill-black dark:fill-white"
                    : "fill-none"
                }`}
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
                x1="16.511"
                x2="22"
                y1="16.511"
                y2="22"
              ></line>
            </svg>
          </Link>
        </li>
        <li className="icon-container">
          <Link href="/chat">
            <svg
              aria-label="Messenger"
              color="rgb(245, 245, 245)"
              fill="hsl(0, 0%, 96.07843137254902%)"
              role="img"
              viewBox="0 0 24 24"
              className={`svg-icons`}
            >
              <path
                d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
                fill="none"
                className="stroke-black dark:stroke-white"
                stroke-miterlimit="10"
                stroke-width="1.739"
              />
              <path
                d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
                fill-rule="evenodd"
                className="stroke-black dark:stroke-white fill-black dark:fill-white"
              ></path>
            </svg>
          </Link>
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
                notifications.filter((notification: NotificationInterface) => {
                  return !notification.read;
                }).length > 0
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
        <li className="icon-container">
          <Link href={`/profile/${user._id}`}>
            <ProfilePictureIcon image={user.profilePicture} size="md" />
          </Link>
        </li>
      </ul>
    );
  } else {
    return <LoadingComponent />;
  }
};

export default Navbar;
