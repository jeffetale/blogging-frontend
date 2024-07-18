import { Section } from "lucide-react";

export function About(params) {
  return (
    <>
      <section className="flex justify-around gap-5 bg-gray-100 py-11 rounded-lg">
        <article>
          <h2 className="text-purple-400 text-3xl font-bold">Who am I</h2>
          <p className="text-muted-foreground">
            Welcome to my blog! I'm a passionate web developer, designer and
            ethical hacker, sharing my insights and experiences on the latest
            trends and technologies in the industry.
          </p>
        </article>
      </section>
    </>
  );
}
