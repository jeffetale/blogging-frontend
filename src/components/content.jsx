import Link from "next/link"

export function Content() {
  return (
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
  );
}

function ArrowRightIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>)
  );
}


