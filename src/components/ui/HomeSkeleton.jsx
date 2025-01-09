// src/components/ui/HomeSkeleton.jsx

import React from "react";

const ContentSkeleton = () => {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Featured Post Skeleton */}
      <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 rounded-lg">
        <div className="p-4 space-y-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>

      {/* Grid Posts Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg h-[300px]"
          >
            <div className="p-4 space-y-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const OverviewSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Categories Card Skeleton */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-8 bg-gray-300 dark:bg-gray-600 rounded"
            ></div>
          ))}
        </div>
      </div>

      {/* Popular Posts Card Skeleton */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex space-x-4">
              <div className="h-16 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogPostSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
      {/* Hero Image Skeleton */}
      <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-700 rounded-lg mb-8"></div>

      {/* Title Skeleton */}
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>

      {/* Content Skeleton */}
      <div className="mt-8 space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
      </div>
    </div>
  );
};

export default BlogPostSkeleton;

export { ContentSkeleton, OverviewSkeleton };