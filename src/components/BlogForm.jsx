import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Editor } from "@tinymce/tinymce-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    image_url: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content, editor) => {
    setFormData({ ...formData, content });
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
        const token = Cookies.get("access_token");
        const response = await fetch(
          "http://127.0.0.1:8000/api/v1/blog_posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
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

        <div className="relative">
          <input
            type="text"
            name="subtitle"
            id="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="Add a subtitle (optional)"
            className="w-full py-2 px-4 border-b-2 border-gray-300 focus:border-indigo-500 transition-colors duration-300 outline-none text-lg"
          />
        </div>

        <div className="relative">
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "codesample"
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | code | help",
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
              type="text"
              name="image_url"
              id="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:border-indigo-500 transition-colors duration-300 outline-none"
            />
            {errors.image_url && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{errors.image_url}</AlertDescription>
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
            {isSubmitting ? "Publishing..." : "Publish Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
