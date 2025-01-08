// src/components/content.jsx

"use client";
import useSWR from "swr";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FeaturedPost } from "./HandleImages";
import { PostGridItem } from "./HandleImages";

const AnimatedCard = motion(Card);
const fetcher = (url) => fetch(url).then((res) => res.json());

export function Content({ initialSearchTerm = "", initialCategory = "" }) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [featuredPost, setFeaturedPost] = useState(null);
  const router = useRouter();

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

  const handlePostClick = (slug) => {
    if (!slug) {
      console.error("Post slug is undefined:", slug);
      return;
    }
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="space-y-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Post */}
            {featuredPost && (
              <FeaturedPost
                post={featuredPost}
                handlePostClick={handlePostClick}
                backendBaseURL={backendBaseURL}
              />
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
                  <div key={post.id}>
                    <PostGridItem
                      post={post}
                      handlePostClick={handlePostClick}
                      backendBaseURL={backendBaseURL}
                    />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

