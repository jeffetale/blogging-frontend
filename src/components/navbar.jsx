// src/components/navbar.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./Logout";
import { useAuth } from "@/context/AuthContext";

export function Navbar({ setSearchTerm }) {
  const { loggedIn } = useAuth();
  const pathname = usePathname();

  const NavLink = ({ href, children }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        prefetch={false}
        className={`relative py-2 transition-colors duration-300
          ${
            isActive
              ? "text-primary font-medium"
              : "text-muted-foreground hover:text-foreground"
          }
          group
        `}
      >
        {children}
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300
            ${isActive ? "scale-x-100" : "scale-x-0"}
            group-hover:scale-x-100
          `}
        />
      </Link>
    );
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          prefetch={false}
        >
          <FeatherIcon className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold">Blog</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/new_blog">Blog</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          {loggedIn && (
            <>
              <NavLink href="/admin">Profile</NavLink>
              <LogoutButton />
            </>
          )}
        </nav>

        <div className="relative hidden md:block">
          {/* Search functionality commented out as in original */}
        </div>
      </div>
    </header>
  );
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
  );
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
  );
}
