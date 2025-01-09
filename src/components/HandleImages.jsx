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
    <div className="space-y-0.5">
      {/* Image container */}
      <div className="relative w-full h-[400px]">
        <Image
          src={imageUrl}
          alt="Blog post cover"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>
      <div className="relative mx-auto px-4 -mt-24">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <span className="flex items-center">
              <FaUser className="mr-2" />
              {post.user?.username || "Anonymous"}
            </span>
            <span className="flex items-center">
              <FaClock className="mr-2" />
              Published: {formatDate(post.created_at)}
            </span>
            {post.updated_at !== post.created_at && (
              <span className="flex items-center">
                <FaClock className="mr-2" />
                Updated: {formatDate(post.updated_at)}
              </span>
            )}
            <span className="flex items-center">
              <FaEye className="mr-2" />
              {post.view_count} views
            </span>
          </div>
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
