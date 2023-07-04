"use client";
import { CircularProgress } from "@mui/material";
const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <CircularProgress />
    </div>
  );
};

export default LoadingComponent;
