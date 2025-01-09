"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ProfileImageManager } from "@/components/ProfileImageManager";

export default function ProfilePage() {
  const { loggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, router]);

  if (!loggedIn) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-gray-600">Manage your profile images</p>
        </div>
        <ProfileImageManager />
      </div>
    </div>
  );
}
