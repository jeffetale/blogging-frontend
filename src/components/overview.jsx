// src/components/overview.jsx

"use client";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import useSWR from "swr";
import { SidebarPostItem } from "./HandleImages";
import { useState } from "react";
import { OverviewSkeleton } from "./ui/HomeSkeleton";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function Overview({ setSelectedCategory }) {
  const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { data, error, isLoading } = useSWR(
    `${backendBaseURL}/api/v1/blog_posts`,
    fetcher
  );

  const [selectedCategory, setCategory] = useState("");

  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useSWR(`${backendBaseURL}/api/v1/popular_posts`, fetcher);

  if (error) return <div>Failed to Load</div>;
  if (isLoading) return <OverviewSkeleton />;

  const uniqueCategories = new Set(data.map((post) => post.category));

  const handleCategoryClick = (category) => {
    setCategory(category);
    setSelectedCategory(category);
  };

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800">
            Unable to Load
          </h3>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  if (isLoading) return <OverviewSkeleton />;

  return (
    <div>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Categories</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground font-extrabold font-weight:800 "
                prefetch={false}
                onClick={() => setSelectedCategory("")}
              >
                Show All
              </Link>
            </li>
            {Array.from(uniqueCategories).map((category, index) => (
              <li key={index}>
                <Link
                  href="#"
                  className={`text-muted-foreground hover:text-foreground ${
                    selectedCategory === category
                      ? "text-foreground font-bold"
                      : ""
                  }`}
                  prefetch={false}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Popular Posts</h3>
        </CardHeader>
        <CardContent>
          {postsError && <div>Failed to load popular posts</div>}
          {postsLoading && <div>Loading popular posts...</div>}
          {posts && (
            <ul className="space-y-4">
              {posts.map((post) => (
                <SidebarPostItem
                  key={post.id}
                  post={post}
                  backendBaseURL={backendBaseURL}
                />
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
