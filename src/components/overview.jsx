// src/components/overview.jsx

"use client";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function Overview({ setSelectedCategory }) {
  const { data, error, isLoading } = useSWR(
    "http://127.0.0.1:8000/api/v1/blog_posts",
    fetcher
  );

  const {
    data: posts,
    error: postsError,
    isLoading: postsLoading,
  } = useSWR("http://127.0.0.1:8000/api/v1/popular_posts", fetcher);

  if (error) return <div>Failed to Load</div>;
  if (isLoading) return <div>Loading...</div>;

  const uniqueCategories = new Set(data.map(post => post.category));

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
            Welcome to my blog! I'm a passionate web developer, designer and
            ethical hacker, sharing my insights and experiences on the latest
            trends and technologies in the industry.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Categories</h3>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
          {Array.from(uniqueCategories).map((category, index) => (
              <li>
                <Link
                  key={index}
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  onClick={() => setSelectedCategory(category)}
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
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                  >
                    <img
                      src={post.image_url}
                      width={80}
                      height={80}
                      alt="Popular post image"
                      className="rounded-md"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">{post.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {post.content}
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
