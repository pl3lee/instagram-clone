"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const GenericHeader = ({ title }: { title: string }) => {
  const router = useRouter();
  return (
    <div className="sticky-header justify-start gap-0">
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
      <div className="text-center text-3xl font-bold p-2">{title}</div>
    </div>
  );
};

export default GenericHeader;
