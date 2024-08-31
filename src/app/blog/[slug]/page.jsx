// src/app/blog/[slug]/page.jsx

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaClock, FaUser, FaEye } from "react-icons/fa";
import { HTMLContentRenderer } from "@/components/HTMLContentRenderer";
import { Editor } from "@tinymce/tinymce-react";

const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL; 

async function getBlogPost(slug) {
  console.log(`Fetching blog post with slug: ${slug}`);
  const res = await fetch(`${backendBaseURL}/api/v1/blog_posts/${slug}`);
  if (!res.ok) return undefined;
  return res.json();
}

async function checkOwnership(postId, token) {
  console.log(`Checking ownership for post ID: ${postId}`);
  const res = await fetch(
    `${backendBaseURL}/api/v1/blog_posts/${postId}/is_owner`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) return false;
  const data = await res.json();
  console.log(`Ownership check result: ${data.is_owner}`);
  return data.is_owner;
}

async function updateBlogPost(postId, token, updatedData) {
  const res = await fetch(
    `${backendBaseURL}/api/v1/blog_posts/${postId}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    }
  );
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

async function deleteBlogPost(postId, token) {
  const res = await fetch(
    `${backendBaseURL}/api/v1/blog_posts/${postId}/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to delete post");
}

export default function BlogPost() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [error, setError] = useState(null);
  const [viewUpdated, setViewUpdated] = useState(false);
  const { loggedIn, getAccessToken } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    console.log(`useEffect triggered with slug: ${slug}`);
    let didCancel = false;

    if (slug && !viewUpdated) {
      const fetchData = async () => {
        try {
          const data = await getBlogPost(slug);
          if (!data) {
            setError("Blog post not found");
          } else {
            if (!didCancel) {
              setPost(data);
              console.log(`Updating view count for slug: ${slug}`);
              await fetch(
                `${backendBaseURL}/api/v1/blog_posts/${slug}/update_view_count/`,
                {
                  method: "POST",
                }
              );
              setViewUpdated(true);

              if (loggedIn) {
                console.log(
                  `User is logged in, checking ownership for post ID: ${data.id}`
                );
                const token = getAccessToken();
                const ownerStatus = await checkOwnership(data.id, token);
                setIsOwner(ownerStatus);
              } else {
                console.log("User is not logged in, skipping ownership check");
              }
            }
          }
        } catch (error) {
          if (!didCancel) {
            console.error("Error fetching blog post:", error);
            setError("Failed to load blog post");
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
      console.error("Error updating post:", error);
      setError("Failed to update post");
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = getAccessToken();
      await deleteBlogPost(post.id, token);
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post");
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  if (error) {
    return (
      <div className="text-center text-red-600 text-2xl mt-10">{error}</div>
    );
  }

  if (!post) {
    return <div className="text-center text-2xl mt-10">Loading...</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative mb-16 pb-8">
        <img
          src={`${backendBaseURL}${post.image_url_medium}`}
          alt="Blog post cover"
          className="w-full h-96 object-none rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-10 -mt-32 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
        <div className="flex flex-wrap items-center text-gray-600 mb-8 space-x-4">
          <span className="flex items-center">
            <FaUser className="mr-2" /> {post.user?.username || "Anonymous"}
          </span>
          <span className="flex items-center">
            <FaClock className="mr-2" /> Published:{" "}
            {formatDate(post.created_at)}
          </span>
          {post.updated_at !== post.created_at && (
            <span className="flex items-center">
              <FaClock className="mr-2" /> Updated:{" "}
              {formatDate(post.updated_at)}
            </span>
          )}
          <span className="flex items-center">
            <FaEye className="mr-2" /> {post.view_count} views
          </span>
        </div>

        {isEditing ? (
          <div className="mt-8">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-2 mb-4 text-2xl font-bold border-b-2 border-gray-300 focus:border-blue-500 outline-none"
            />
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={editedContent}
              onEditorChange={(content) => setEditedContent(content)}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                  "codesample",
                  "lists",
                  "lists advlist",
                  "fullscreen",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | code codesample | help | bullist numlist | fullscreen",
                codesample_languages: [
                  { text: "HTML/XML", value: "markup" },
                  { text: "JavaScript", value: "javascript" },
                  { text: "CSS", value: "css" },
                  { text: "PHP", value: "php" },
                  { text: "Ruby", value: "ruby" },
                  { text: "Python", value: "python" },
                  { text: "Java", value: "java" },
                  { text: "C", value: "c" },
                  { text: "C#", value: "csharp" },
                  { text: "C++", value: "cpp" },
                ],
                content_style: `
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.4; }
                  pre { background-color: #f4f4f4; padding: 10px; border-radius: 4px; }
                  code { font-family: Menlo, Monaco, Consolas, 'Courier New', monospace; }
                `,
              }}
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <div className="prose prose-lg max-w-none">
              <HTMLContentRenderer content={post.content} />
            </div>
            {isOwner && (
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={handleEdit}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <FaEdit className="mr-2" /> Edit Post
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <FaTrash className="mr-2" /> Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Delete
              </button>
              <button
                onClick={handleDeleteCancel}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
