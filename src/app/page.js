//src/app/page.js

"use client";

import { useState, useEffect } from "react";
import { Overview } from "@/components/overview";
import { Content } from "@/components/content";
import AnimatedHero from "@/components/ui/AnimatedHero";

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
      <AnimatedHero />
      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 min-h-[800px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Content searchTerm={searchTerm} selectedCategory={selectedCategory} />
          </div>
          <div className="lg:col-span-1">
            <Overview setSelectedCategory={setSelectedCategory} />
          </div>
        </div>
      </main>
    </div>
  );
}
