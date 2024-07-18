// src/app/about/page.js

import { About } from "@/components/about";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <About />
      </main>
    </div>
  );
}