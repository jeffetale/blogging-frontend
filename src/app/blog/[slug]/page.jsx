// src/app/blog/[slug]/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

async function getBlogPost(slug) {
  console.log(`Fetching blog post with slug: ${slug}`);
  const res = await fetch(`http://127.0.0.1:8000/api/v1/blog_posts/${slug}`);
  if (!res.ok) return undefined;
  return res.json();
}

async function checkOwnership(postId, token) {
  console.log(`Checking ownership for post ID: ${postId}`);
  const res = await fetch(`http://127.0.0.1:8000/api/v1/blog_posts/${postId}/is_owner`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) return false;
  const data = await res.json();
  console.log(`Ownership check result: ${data.is_owner}`);
  return data.is_owner;
}

async function updateBlogPost(postId, token, updatedData) {
  const res = await fetch(`http://127.0.0.1:8000/api/v1/blog_posts/${postId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState(null);
  const [viewUpdated, setViewUpdated] = useState(false);
  const { loggedIn, getAccessToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

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

              if (loggedIn) {
                console.log(`User is logged in, checking ownership for post ID: ${data.id}`);
                const token = getAccessToken(); // Get token from AuthContext
                const ownerStatus = await checkOwnership(data.id, token);
                setIsOwner(ownerStatus);
              } else {
                console.log('User is not logged in, skipping ownership check');
              }
            }
          }
        } catch (error) {
          if (!didCancel) {
            console.error('Error fetching blog post:', error);
            setError('Failed to load blog post');
          }
        }
      };
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [slug, viewUpdated, loggedIn, getAccessToken]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const token = getAccessToken();
      const updatedPost = await updateBlogPost(post.id, token, {
        title: editedTitle,
        content: editedContent,
      });
      setPost(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post');
    }
  };

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
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            rows="10"
          />
          <button
            onClick={handleSave}
            className="mr-2 text-white bg-green-500 hover:bg-green-700 p-2 rounded"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="text-white bg-red-500 hover:bg-red-700 p-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          {isOwner && (
            <button
              onClick={handleEdit}
              className="mt-4 text-white bg-blue-500 hover:bg-blue-700 p-2 rounded"
            >
              Edit Post
            </button>
          )}
        </div>
      )}
    </div>
  );
}
