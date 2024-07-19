// src/app/blog/[slug]/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

async function getBlogPost(slug) {
  console.log(`Fetching blog post with slug: ${slug}`);
  const res = await fetch(`http://127.0.0.1:8000/api/v1/blog_posts/${slug}`);
  if (!res.ok) return undefined;
  return res.json();
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [viewUpdated, setViewUpdated] = useState(false);

  useEffect(() => {
    console.log(`useEffect triggered with slug: ${slug}`);
    let didCancel = false;

    if (slug && !viewUpdated) {
      const fetchData = async () => {
        try {
          const data = await getBlogPost(slug);
          if (!data) {
            setError('Blog post not found');
          } else {
            if (!didCancel) {
              setPost(data);
              console.log(`Updating view count for slug: ${slug}`);
              await fetch(`http://127.0.0.1:8000/api/v1/blog_posts/${slug}/update_view_count/`, {
                method: 'POST',
              });
              setViewUpdated(true);
            }
          }
        } catch (error) {
          if (!didCancel) {
            setError('Failed to load blog post');
          }
        }
      };
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [slug, viewUpdated]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={post.image_url}
        width={800}
        height={800}
        alt="Blog post image"
        className="w-full h-64 object-cover"
      />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
