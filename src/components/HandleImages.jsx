// src/components/HandleImages.jsx

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HTMLContentRenderer } from "./HTMLContentRenderer";
import { FaClock, FaUser, FaEye } from "react-icons/fa";

const AnimatedCard = motion.div;

// Featured Post Component
export const FeaturedPost = ({ post, handlePostClick, backendBaseURL }) => {
  const imageUrl = post.image_url_medium.startsWith("http")
    ? post.image_url_medium
    : `${backendBaseURL}${post.image_url_medium}`;

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Featured Post</h2>
      <AnimatedCard
        className="overflow-hidden cursor-pointer rounded-lg bg-white shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={() => handlePostClick(post.slug)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-l-lg"
              priority
            />
          </div>
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
              <p className="text-muted-foreground mb-4">{post.summary}</p>
            </div>
            <Button className="self-start">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </AnimatedCard>
    </section>
  );
};

// Post Grid Item Component
export const PostGridItem = ({ post, handlePostClick, backendBaseURL }) => {
  const imageUrl = post.image_url_large.startsWith("http")
    ? post.image_url_large
    : `${backendBaseURL}${post.image_url_large}`;

  return (
    <AnimatedCard
      className="overflow-hidden cursor-pointer rounded-lg bg-white shadow-lg"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => handlePostClick(post.slug)}
    >
      <div className="relative aspect-video w-full">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardHeader>
        <h3 className="text-xl font-bold">{post.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {post.summary?.substring(0, 100)}...
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Tag className="mr-1 h-4 w-4" />
          <span>{post.category}</span>
        </div>
      </CardFooter>
    </AnimatedCard>
  );
};

// Sidebar Post Item Component
export const SidebarPostItem = ({ post, backendBaseURL }) => {
  const imageUrl = post.image_url_small.startsWith("http")
    ? post.image_url_small
    : `${backendBaseURL}${post.image_url_small}`;

  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
      >
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={imageUrl}
            alt="Popular post image"
            fill
            sizes="80px"
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
  );
};


// Blog Post Image & Metadata Component
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const PostHero = ({ post, backendBaseURL }) => {
  const imageUrl = post.image_url_medium.startsWith("http")
    ? post.image_url_medium
    : `${backendBaseURL}${post.image_url_medium}`;

  return (
    <div className="relative min-h-[600px] flex flex-col">
      {/* Background Image Container - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/70 to-gray-900/90" />
      </div>

      {/* Content Container - Fixed at top */}
      <div className="relative z-10 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Category Tag */}
          {post.category && (
            <span className="inline-block px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full mb-6">
              {post.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-300 text-sm">
            <div className="flex items-center space-x-2">
              <span className="font-medium">
                {post.user?.username || "Anonymous"}
              </span>
            </div>
            <div className="flex items-center">
              <span>Published: {formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center">
              <span>{post.view_count.toLocaleString()} views</span>
            </div>
          </div>

          {/* Update date if different from creation date */}
          {post.updated_at !== post.created_at && (
            <div className="text-gray-400 text-sm mt-4">
              Updated: {formatDate(post.updated_at)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const AboutPageImage = ({ imageUrl, backendBaseURL, className }) => {
  const getValidImageUrl = () => {
    if (!imageUrl) {
      return "/api/placeholder/400/400"; // Placeholder image
    }
    return imageUrl.startsWith("http")
      ? imageUrl
      : `${backendBaseURL}${imageUrl}`;
  };

  return (
    <div className={`relative ${className}`}>
      <Image
        src={getValidImageUrl()}
        alt="Profile"
        fill
        sizes="(max-width: 768px) 100vw, 288px"
        className="object-cover"
        priority
      />
    </div>
  );
};
