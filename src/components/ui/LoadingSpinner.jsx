import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
  fullScreen = false,
  message = "Loading...",
  size = "default", // 'small', 'default', or 'large'
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12",
  };

  // If fullScreen is true, show the overlay version
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-xl flex flex-col items-center space-y-3">
          <Loader2
            className={`${sizeClasses.default} animate-spin text-amber-600`}
          />
          <p className="text-gray-600 font-medium">{message}</p>
        </div>
      </div>
    );
  }

  // Otherwise, show the inline version
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <Loader2
        className={`${sizeClasses.default} animate-spin text-amber-600`}
      />
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
