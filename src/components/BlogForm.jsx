// src/components/BlogForm.jsx

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Editor } from "@tinymce/tinymce-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { compressImage } from "@/app/utils/imageUtils";
import { submitBlogPost } from "@/app/utils/fetchUtils";
import { X, Image as ImageIcon, Upload, Tag } from "lucide-react";

export function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // idle, submitting, processing, success, error
  const [isDragging, setIsDragging] = useState(false);
  const [activeSection, setActiveSection] = useState("write");
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
    await processImage(file);
  };

  const processImage = async (file) => {
    if (file) {
      const compressedImage = await compressImage(file, 2);
      setImage(compressedImage);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(compressedImage);
    }
  };

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      await processImage(file);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
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
      setSubmissionStatus("submitting");

      try {
        const token = Cookies.get("access_token");
        const formDataToSend = new FormData();

        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        formDataToSend.append("image", image);

        // Initial post submission
        const response = await submitBlogPost(
          backendBaseURL,
          formDataToSend,
          token
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSubmissionStatus("processing");

        setTimeout(() => {
          setSubmissionStatus("success");
          router.push("/");
        }, 2000);
      } catch (error) {
        console.error("Submission error:", error);
        setErrors({
          submit: "Failed to create blog post. Please try again.",
        });
        setSubmissionStatus("error");
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const getSubmitButtonContent = () => {
    switch (submissionStatus) {
      case "submitting":
        return (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Publishing...
          </>
        );
      case "processing":
        return (
          <>
            <div className="animate-pulse">Processing Content...</div>
          </>
        );
      case "success":
        return (
          <>
            <span className="text-green-500">✓</span>
            Published Successfully
          </>
        );
      case "error":
        return "Try Again";
      default:
        return (
          <>
            <Upload className="mr-2" size={20} />
            Publish Story
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
            Create Your Story
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Share your thoughts with the world
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveSection("write")}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
              activeSection === "write"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Write
          </button>
          <button
            onClick={() => setActiveSection("preview")}
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors duration-200 ${
              activeSection === "preview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Preview
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Title Input */}
          <div className="mb-8 group">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Your Story Title"
              className="w-full text-4xl font-bold border-none outline-none focus:ring-0 placeholder-gray-300 transition-all duration-300 bg-transparent"
            />
            {errors.title && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.title}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Category Input */}
          <div className="mb-8 relative">
            <div
              className="flex items-center space-x-2 p-2 
                bg-gray-50 dark:bg-gray-800 
                rounded-lg"
            >
              <Tag className="text-gray-400" size={20} />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Add category"
                className="flex-1 bg-transparent border-none outline-none focus:ring-0
                  text-gray-900 dark:text-gray-100 
                  placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            {errors.category && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.category}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Image Upload Area */}
          <div className="mb-8">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 2MB
                  </p>
                </div>
              )}
            </div>
            {errors.image && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.image}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Rich Text Editor */}
          <div className="mb-8">
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
                skin: "oxide-dark",
                content_css: "dark",
                content_style: `
                  body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
                    line-height: 1.4; 
                    background-color: #1f2937; 
                    color: #e5e7eb;
                  }
                  pre { 
                    background-color: #374151; 
                    padding: 10px; 
                    border-radius: 4px; 
                    color: #e5e7eb;
                  }
                  code { 
                    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
                    color: #e5e7eb;
                  }
                `,
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center px-6 py-3 font-medium rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
                submissionStatus === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : submissionStatus === "error"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                submissionStatus === "success"
                  ? "focus:ring-green-500"
                  : "focus:ring-blue-500"
              }`}
            >
              {getSubmitButtonContent()}
            </button>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{errors.submit}</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
}
