import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="w-20 h-20 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
