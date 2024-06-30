/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MfY3BV08qbg
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <FeatherIcon className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">Blog</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Home
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              About
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Blog
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Contact
            </Link>
          </nav>
          <div className="relative hidden md:block">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <SearchIcon className="w-4 h-4" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 pr-4 py-2 rounded-md bg-muted text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </header>
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
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">John Doe</h3>
                  <p className="text-muted-foreground">Founder, Blog Inc.</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Welcome to my blog! I'm a passionate web developer and designer, sharing my insights and experiences on
                the latest trends and technologies in the industry.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Categories</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                    Web Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                    Productivity
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Popular Posts</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <img
                      src="/placeholder.svg"
                      width={80}
                      height={80}
                      alt="Popular post image"
                      className="rounded-md"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">Mastering React Hooks: A Comprehensive Guide</h4>
                      <p className="text-sm text-muted-foreground">
                        Dive deep into the world of React Hooks and learn how to leverage them to build more efficient
                        and maintainable applications.
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <img
                      src="/placeholder.svg"
                      width={80}
                      height={80}
                      alt="Popular post image"
                      className="rounded-md"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">
                        Designing for Accessibility: Best Practices and Techniques
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Learn how to create inclusive and accessible web experiences that cater to users with diverse
                        needs and abilities.
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center gap-4 text-muted-foreground hover:text-foreground"
                    prefetch={false}
                  >
                    <img
                      src="/placeholder.svg"
                      width={80}
                      height={80}
                      alt="Popular post image"
                      className="rounded-md"
                    />
                    <div>
                      <h4 className="text-lg font-semibold">The Future of Web Development: Trends and Insights</h4>
                      <p className="text-sm text-muted-foreground">
                        Explore the latest trends and technologies shaping the future of web development, from
                        AI-powered tools to the rise of serverless architecture.
                      </p>
                    </div>
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="bg-muted py-6 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">&copy; 2024 Blog Inc. All rights reserved.</div>
      </footer>
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


function FeatherIcon(props) {
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
      <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
      <path d="M16 8 2 22" />
      <path d="M17.5 15H9" />
    </svg>
  )
}


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}