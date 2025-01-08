// src/components/BlogForm.jsx

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Editor } from "@tinymce/tinymce-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { compressImage } from "@/app/utils/imageUtils";
import { submitBlogPost } from "@/app/utils/fetchUtils";
import LoadingSpinner from "./ui/LoadingSpinner";

export function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content, editor) => {
    setFormData({ ...formData, content });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressedImage = await compressImage(file, 2); // 2MB max size
      setImage(compressedImage);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = "Title is required.";
    if (!formData.content) tempErrors.content = "Content is required.";
    if (!formData.category) tempErrors.category = "Category is required.";
    if (!image) tempErrors.image = "Image is required.";
    return tempErrors;
  };

  const checkSummaryStatus = async (postId) => {
    try {
      const response = await fetch(
        `${backendBaseURL}/api/v1/blog_posts/id/${postId}`
      );
      const post = await response.json();

      if (post.summary && post.short_summary) {
        // Summaries are ready, redirect to home
        router.push("/");
      } else {
        // Check again in 1 second
        setTimeout(() => checkSummaryStatus(postId), 1000);
      }
    } catch (error) {
      console.error("Error checking summary status:", error);
      // If there's an error, just redirect to home after 5 seconds as fallback
      setTimeout(() => router.push("/"), 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const token = Cookies.get("access_token");
        const formDataToSend = new FormData();

        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        formDataToSend.append("image", image);

        const response = await submitBlogPost(
          backendBaseURL,
          formDataToSend,
          token
        );
        const data = await response.json();
        setPublishedPostId(data.id);

        // Start checking for summary completion
        checkSummaryStatus(data.id);
      } catch (error) {
        console.error("Detailed error:", {
          message: error.message,
          stack: error.stack,
          response: error.response,
        });
        setErrors({
          submit:
            error.message || "Failed to create blog post. Please try again.",
        });
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Create Your Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your captivating title"
            className="w-full py-3 px-4 border-b-2 border-gray-300 focus:border-indigo-500 transition-colors duration-300 outline-none text-xl font-semibold"
          />
          {errors.title && (
            <Alert variant="destructive" className="mt-2">
              <AlertDescription>{errors.title}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* <div className="relative">
          <input
            type="text"
            name="subtitle"
            id="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Add a subtitle (optional)"
            className="w-full py-2 px-4 border-b-2 border-gray-300 focus:border-indigo-500 transition-colors duration-300 outline-none text-lg"
          />
        </div> */}

        <div className="relative">
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
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
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | code codesample | help | bullist numlist",
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
                { text: "SQL", value: "sql" },
                { text: "XML", value: "xml" },
                { text: "JSON", value: "json" },
              ],
              content_style: `
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; line-height: 1.4; }
                  pre { background-color: #f4f4f4; padding: 10px; border-radius: 4px; }
                  code { font-family: Menlo, Monaco, Consolas, 'Courier New', monospace; }
                `,
            }}
            onEditorChange={handleEditorChange}
          />
          {errors.content && (
            <Alert variant="destructive" className="mt-2">
              <AlertDescription>{errors.content}</AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:border-indigo-500 transition-colors duration-300 outline-none"
            />
            {errors.category && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.category}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="flex-1">
            <input
              type="file"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleImageChange}
              accept="image/*"
              className="w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:border-indigo-500 transition-colors duration-300 outline-none"
            />
            {errors.image && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.image}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting && <LoadingSpinner /> ? "Publishing..." : "Publish Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
