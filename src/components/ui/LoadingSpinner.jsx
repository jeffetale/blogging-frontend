// src/components/ui/LoadingSpinner.jsx

import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-xl flex flex-col items-center space-y-4 max-w-sm mx-4 w-full">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-20"></div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Publishing your masterpiece
        </h3>
        <div className="w-full space-y-2">
          <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-progressBar"></div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Generating summaries...</span>
            <span className="animate-pulse">Please wait</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
