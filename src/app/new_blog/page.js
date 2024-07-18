// src/app/new_blog/page.jsx

'use client';

import { BlogForm } from '@/components/BlogForm';

export default function NewBlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create a New Blog Post</h1>
      <BlogForm />
    </div>
  );
}
