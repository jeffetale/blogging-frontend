// src/components/BlogForm.jsx

'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export  function BlogForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image_url: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = "Title is required.";
    if (!formData.content) tempErrors.content = "Content is required.";
    if (!formData.category) tempErrors.category = "Category is required.";
    if (!formData.image_url) tempErrors.image_url = "Image URL is required.";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const token = Cookies.get('access_token');
        const response = await fetch('http://127.0.0.1:8000/api/v1/blog_posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Response Data:", data);
        setIsSubmitted(true);
        setFormData({
          title: '',
          content: '',
          category: '',
          image_url: '',
        });
        router.push("/");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          name="content"
          id="content"
          rows="5"
          value={formData.content}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          name="image_url"
          id="image_url"
          value={formData.image_url}
          onChange={handleChange}
          className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
        {errors.image_url && <p className="text-red-500 text-xs mt-1">{errors.image_url}</p>}
      </div>
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      {isSubmitted && <p className="text-green-500 text-xs mt-1">Blog post submitted successfully!</p>}
    </form>
  );
}
