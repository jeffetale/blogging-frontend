'use client';

import { useState } from "react";
import { Overview } from "@/components/overview";
import { Content } from "@/components/content";

export default function Home({searchTerm}) {
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
