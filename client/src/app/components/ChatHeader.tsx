"use client";
import { UserInterface } from "../interfaces/User";
import { useRouter } from "next/navigation";
import ProfilePictureIcon from "./ProfilePictureIcon";
import Link from "next/link";

const ChatHeader = ({ user }: { user: UserInterface }) => {
  const router = useRouter();
  return (
    <div className="sticky-header justify-start gap-2">
      <div className="flex items-center">
        <button onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <Link href={`/profile/${user._id}`}>
        <div className="flex gap-3">
          <ProfilePictureIcon image={user.profilePicture} size="md" />
          <div className="text-xl flex items-center">{user.username}</div>
        </div>
      </Link>
    </div>
  );
};

export default ChatHeader;
