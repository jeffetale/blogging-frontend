// src/components/content.jsx

"use client";
import useSWR from "swr";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Clock, Tag } from "lucide-react";
import { Overview } from "@/components/overview";
import Link from "next/link";
import { useState, useEffect } from "react";

const AnimatedCard = motion(Card);
const fetcher = (url) => fetch(url).then((res) => res.json());

export function Content({ initialSearchTerm = "", initialCategory = "" }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [featuredPost, setFeaturedPost] = useState(null);

  const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { data, error, isLoading } = useSWR(
    `${backendBaseURL}/api/v1/blog_posts`,
    fetcher
  );

  useEffect(() => {
    if (data && data.length > 0) {
      setFeaturedPost(data[0]);
    }
  }, [data]);

  if (error) return <div>Failed to Load</div>;
  if (isLoading) return <div>Loading...</div>;

  const filteredPosts = data
    ? data.filter((post) => {
        const matchesSearchTerm = post.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory
          ? post.category === selectedCategory
          : true;
        return matchesSearchTerm && matchesCategory;
      })
    : [];

  return (
    <div className="space-y-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Post */}
            {featuredPost && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Featured Post</h2>
                <AnimatedCard
                  className="overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <img
                      src={`${backendBaseURL}${featuredPost.image_url_medium}`}
                      alt={featuredPost.title}
                      className="w-full h-64 object-cover rounded-l-lg"
                    />
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {featuredPost.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {featuredPost.summary}
                        </p>
                      </div>
                      <Button className="self-start">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </AnimatedCard>
              </section>
            )}

            {/* Search */}
            <section>
              <div className="relative w-full mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </section>

            {/* Blog Posts Grid */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <AnimatedCard
                    key={post.id}
                    className="overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={`${backendBaseURL}${post.image_url_large}`}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <h3 className="text-xl font-bold">{post.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {post.summary.substring(0, 100)}...
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Tag className="mr-1 h-4 w-4" />
                        <span>{post.category}</span>
                      </div>
                    </CardFooter>
                  </AnimatedCard>
                ))}
              </div>
            </section>
          </div>

          {/* Overview Section */}
          {/* <div className="lg:col-span-1">
            <Overview setSelectedCategory={setSelectedCategory} />
          </div> */}
        </div>
      </div>
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
