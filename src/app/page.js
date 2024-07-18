//src/app/page.js

'use client'


import { useState, useEffect } from "react";
import { Overview } from "@/components/overview";
import { Content } from "@/components/content";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleSearchChange = (e) => {
      setSearchTerm(e.detail);
    };
    window.addEventListener('searchChange', handleSearchChange);
    return () => {
      window.removeEventListener('searchChange', handleSearchChange);
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
        <Content searchTerm={searchTerm} />
        <div className="space-y-8">
          <Overview />
        </div>
      </main>
    </div>
  );
}

