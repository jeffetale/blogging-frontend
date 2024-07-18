import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import Link from "next/link";

export function Overview() {
  return (
    <div>
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
            Welcome to my blog! I'm a passionate web developer and designer,
            sharing my insights and experiences on the latest trends and
            technologies in the industry.
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
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Web Development
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Design
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Technology
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
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
                  <h4 className="text-lg font-semibold">
                    Mastering React Hooks: A Comprehensive Guide
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Dive deep into the world of React Hooks and learn how to
                    leverage them to build more efficient and maintainable
                    applications.
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
                    Learn how to create inclusive and accessible web experiences
                    that cater to users with diverse needs and abilities.
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
                    The Future of Web Development: Trends and Insights
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Explore the latest trends and technologies shaping the
                    future of web development, from AI-powered tools to the rise
                    of serverless architecture.
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
