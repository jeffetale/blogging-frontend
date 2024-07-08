import { Navbar } from "@/components/navbar"
import { Overview } from "@/components/overview"
import { Footer } from "@/components/footer"
import { Content } from "@/components/content"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
        <Content />
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



