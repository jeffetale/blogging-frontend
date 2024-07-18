"use client";

import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function Overview() {
  const { data, error, isLoading } = useSWR(
    "http://127.0.0.1:8000/api/v1/blog_posts",
    fetcher
  );

  if (error) return <div>Failed to Load</div>;
  if (isLoading) return <div>Loading...</div>;

  const filteredCategories = data.filter((post) => post.category.toLowerCase());

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
            {filteredCategories.map((post) => (
              <li>
                <Link
                  key={post.id}
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  {post.category}
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
          <ul className="space-y-4">
            <li>
              <Link
                href="#"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <img
                  src="/placeholder.svg"
                  width={80}
                  height={80}
                  alt="Popular post image"
                  className="rounded-md"
                />
                <div>
                  <h4 className="text-lg font-semibold">
                    Mastering React Hooks: A Comprehensive Guide
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Dive deep into the world of React Hooks and learn how to
                    leverage them to build more efficient and maintainable
                    applications.
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <img
                  src="/placeholder.svg"
                  width={80}
                  height={80}
                  alt="Popular post image"
                  className="rounded-md"
                />
                <div>
                  <h4 className="text-lg font-semibold">
                    Designing for Accessibility: Best Practices and Techniques
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Learn how to create inclusive and accessible web experiences
                    that cater to users with diverse needs and abilities.
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <img
                  src="/placeholder.svg"
                  width={80}
                  height={80}
                  alt="Popular post image"
                  className="rounded-md"
                />
                <div>
                  <h4 className="text-lg font-semibold">
                    The Future of Web Development: Trends and Insights
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Explore the latest trends and technologies shaping the
                    future of web development, from AI-powered tools to the rise
                    of serverless architecture.
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
