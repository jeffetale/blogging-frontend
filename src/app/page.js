/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MfY3BV08qbg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Navbar } from "@/components/navbar"
import { Overview } from "@/components/overview"
import { Footer } from "@/components/footer"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
        <div className="space-y-8">
          <article className="bg-background rounded-md shadow-sm overflow-hidden">
            <img
              src="/placeholder.svg"
              width={800}
              height={400}
              alt="Blog post image"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">The Future of Web Development: Trends and Insights</h2>
              <p className="text-muted-foreground mb-4">
                Explore the latest trends and technologies shaping the future of web development, from AI-powered tools
                to the rise of serverless architecture.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-primary hover:underline" prefetch={false}>
                Read more
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </article>
          <article className="bg-background rounded-md shadow-sm overflow-hidden">
            <img
              src="/placeholder.svg"
              width={800}
              height={400}
              alt="Blog post image"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Mastering React Hooks: A Comprehensive Guide</h2>
              <p className="text-muted-foreground mb-4">
                Dive deep into the world of React Hooks and learn how to leverage them to build more efficient and
                maintainable applications.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-primary hover:underline" prefetch={false}>
                Read more
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </article>
          <article className="bg-background rounded-md shadow-sm overflow-hidden">
            <img
              src="/placeholder.svg"
              width={800}
              height={400}
              alt="Blog post image"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Designing for Accessibility: Best Practices and Techniques</h2>
              <p className="text-muted-foreground mb-4">
                Learn how to create inclusive and accessible web experiences that cater to users with diverse needs and
                abilities.
              </p>
              <Link href="#" className="inline-flex items-center gap-2 text-primary hover:underline" prefetch={false}>
                Read more
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </div>
        <div className="space-y-8">
          <Overview />
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}



