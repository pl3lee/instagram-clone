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

const Navbar = () => {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  if (
    pathname === "/auth/login" ||
    pathname === "/auth/signup" ||
    pathname.startsWith("/chat")
  ) {
    return <div></div>;
  }
  if (!isLoading && user) {
    return (
      <div>
        <SmallNavbar user={user} />;
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

  if (!notificationsLoading && !notificationsError && notifications) {
    return (
      <ul className="flex-col gap-3 justify-start fixed top-0 left-0 h-screen bg-white p-4 dark:bg-black hidden md:flex lg:hidden">
        <li className="icon-container">
          <Link href="/posts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="svg-icons"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </Link>
        </li>
        <li className="icon-container">
          <Link href="/search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="svg-icons"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </li>
        <li className="icon-container">
          <Link href="/chat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="svg-icons"
            >
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                clipRule="evenodd"
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
