// src/app/about/page.js

import About from "@/components/About";

export const metadata = {
  title: "Jeff Etale - Tech Enthusiast, Software Engineer & Ethical Hacker",
  description:
    "Meet Jeff Etale, a passionate Software Engineer and Ethical Hacker. Discover his expertise in full-stack development, security auditing, and devSecOps. Get robust software solutions tailored to your needs.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <About />
      </main>
    </div>
  );
}