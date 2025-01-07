// src/components/overview.jsx

"use client";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import useSWR from "swr";
import Image from "next/image";

import { useState } from "react";
import { HTMLContentRenderer } from "./HTMLContentRenderer";

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
  if (isLoading) return <div>Loading...</div>;

  const uniqueCategories = new Set(data.map((post) => post.category));

  const handleCategoryClick = (category) => {
    setCategory(category);
    setSelectedCategory(category);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">Jeff Etale</h3>
              <p className="text-muted-foreground">Founder, Blog Inc.</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Welcome to my blog! I&apos;m a passionate web developer, designer
            and ethical hacker, sharing my insights and experiences on the
            latest trends and technologies in the industry.
          </p>
        </CardContent>
      </Card>
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
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                  >
                    <div className="relative w-full h-64">
                      <Image
                        src={
                          post.image_url_small.startsWith("http")
                            ? post.image_url_small
                            : `${backendBaseURL}${post.image_url_small}`
                        }
                        alt="Popular post image"
                        width={80} 
                        height={80} 
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">{post.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        <HTMLContentRenderer content={post.short_summary} />
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
