"use client";
import { CircularProgress } from "@chakra-ui/react";
const LoadingComponent = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <CircularProgress isIndeterminate />
    </div>
  );
};

export default LoadingComponent;
