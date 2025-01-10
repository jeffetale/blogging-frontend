// src/components/navbar.jsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./Logout";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export function Navbar() {
  const { loggedIn } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const NavLink = ({ href, children, onClick }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        prefetch={false}
        onClick={onClick}
        className={`relative py-2 transition-colors duration-300
          ${
            isActive
              ? "text-primary font-medium"
              : "text-muted-foreground hover:text-foreground"
          }
          group text-lg
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
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-[100] w-full border-b shadow-sm">
      <div className="container mx-auto px-4 py-4 md:py-6 flex items-center">
        {/* Logo  */}
        <div className="w-48">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            prefetch={false}
          >
            <FeatherIcon className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">Blog</span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center justify-center gap-8 flex-grow">
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

        {/* Empty div for symmetry - Fixed width on the right */}
        <div className="w-48 flex justify-end relative z-[110]">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors bg-background/80 backdrop-blur-sm rounded-lg"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            fixed inset-y-0 right-0 w-72 transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
            md:hidden
            flex flex-col
            z-[105]
            bg-zinc-900/95 
            backdrop-blur-md
            border-l border-zinc-800
            shadow-2xl
          `}
          style={{ top: "72px" }}
        >
          <nav className="flex flex-col px-6 py-6 gap-6">
            {/* NavLink Component for Mobile */}
            <div className="space-y-6">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className={`block transition-colors duration-200 ${
                  pathname === "/"
                    ? "text-primary font-medium"
                    : "text-zinc-100 hover:text-primary"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className={`block transition-colors duration-200 ${
                  pathname === "/about"
                    ? "text-primary font-medium"
                    : "text-zinc-100 hover:text-primary"
                }`}
              >
                About
              </Link>
              <Link
                href="/new_blog"
                onClick={() => setIsOpen(false)}
                className={`block transition-colors duration-200 ${
                  pathname === "/new_blog"
                    ? "text-primary font-medium"
                    : "text-zinc-100 hover:text-primary"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className={`block transition-colors duration-200 ${
                  pathname === "/contact"
                    ? "text-primary font-medium"
                    : "text-zinc-100 hover:text-primary"
                }`}
              >
                Contact
              </Link>
              {loggedIn && (
                <>
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className={`block transition-colors duration-200 ${
                      pathname === "/admin"
                        ? "text-primary font-medium"
                        : "text-zinc-100 hover:text-primary"
                    }`}
                  >
                    Profile
                  </Link>
                  <div className="text-zinc-100">
                    <LogoutButton />
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/80 md:hidden z-[101] backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            style={{ top: "72px" }}
          />
        )}
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
