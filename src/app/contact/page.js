// src/app/contact/page.js

import { Contact } from "@/components/contact";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <Contact />
      </main>
    </div>
  );
}
