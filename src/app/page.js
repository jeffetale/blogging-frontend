//src/app/page.js

"use client";

import { useState, useEffect } from "react";
import { Overview } from "@/components/overview";
import { Content } from "@/components/content";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const handleSearchChange = (e) => {
      setSearchTerm(e.detail);
    };
    window.addEventListener("searchChange", handleSearchChange);
    return () => {
      window.removeEventListener("searchChange", handleSearchChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center">
        <div className="text-center space-y-4 z-10">
          <h1 className="text-5xl font-bold">Welcome to Our Blog</h1>
          <p className="text-xl">Discover amazing stories and insights</p>
          <Button variant="secondary" size="lg">
            Start Reading
          </Button>
        </div>
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 pe-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Section (2/3 width on large screens) */}
          <div className="lg:col-span-2">
            <Content searchTerm={searchTerm} selectedCategory={selectedCategory} />
          </div>

          {/* Overview Section (1/3 width on large screens) */}
          <div className="lg:col-span-1">
            <Overview setSelectedCategory={setSelectedCategory} />
          </div>
        </div>
      </main>
    </div>
  );
}
