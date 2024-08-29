// src/components/Logout.jsx

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/signin");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
