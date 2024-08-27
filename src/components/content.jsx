// src/components/content.jsx

"use client";

import Link from "next/link";
import useSWR from "swr";

import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function Content({ searchTerm = "", selectedCategory = "" }) {
  const { data, error, isLoading } = useSWR(
    "http://127.0.0.1:8000/api/v1/blog_posts",
    fetcher
  );

  if (error) return <div>Failed to Load</div>;
  if (isLoading) return <div>Loading...</div>;

  const filteredPosts = data.filter((post) => {
    const matchesSearchTerm = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {filteredPosts.map((post) => (
        <article
          key={post.id}
          className="bg-background rounded-md shadow-sm overflow-hidden"
        >
          <img
            src={post.image_url}
            width={800}
            height={400}
            alt="Blog post image"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-muted-foreground mb-4">{post.content}</p>
            <Link
              href={`/blog/${post.id}`}
              className="inline-flex items-center gap-2 text-primary hover:underline text-red "
            >
              Read more
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
