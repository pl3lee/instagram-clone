"use client";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <CircularProgress />
    </div>
  );
};

export default Loading;
