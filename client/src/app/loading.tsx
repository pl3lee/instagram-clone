"use client";
import { CircularProgress } from "@chakra-ui/react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <CircularProgress isIndeterminate />
    </div>
  );
};

export default Loading;
