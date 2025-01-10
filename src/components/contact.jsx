//src/components/contact.jsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, User, Mail, MessageSquare } from "lucide-react";

export function Contact() {
  const nameInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get email from localStorage when component mounts
    const savedEmail = localStorage.getItem("contactEmail");
    if (savedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: savedEmail,
      }));
      // Clear the stored email
      localStorage.removeItem("contactEmail");
      // Focus on the name input
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";
    if (!formData.message) tempErrors.message = "Message is required";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${backendBaseURL}/api/v1/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setIsSubmitted(true);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? I&apos;d love to hear from
            you. Drop me a message and I&apos;ll get back to you as soon as
            possible.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Send className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-400 mb-2">
              Message Sent!
            </h3>
            <p className="text-gray-600">
              Thank you for reaching out. I&apos;ll get back to you shortly.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-200 dark:text-gray-200 mb-1 block">
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    ref={nameInputRef}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-gray-100 
                    placeholder-gray-500 dark:placeholder-gray-400
                    border ${
                      errors.name
                        ? "border-red-300"
                        : "border-gray-300 dark:border-gray-600"
                    }
                    rounded-lg 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                    transition duration-150 ease-in-out`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-200 dark:text-gray-200 mb-1 block">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-3 
                      bg-white dark:bg-gray-800 
                      text-gray-900 dark:text-gray-100 
                      placeholder-gray-500 dark:placeholder-gray-400
                      border ${
                        errors.email
                          ? "border-red-300"
                          : "border-gray-300 dark:border-gray-600"
                      }
                      rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition duration-150 ease-in-out`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Message Input */}
              <div className="relative">
                <label className="text-sm font-medium text-gray-200 mb-1 block">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`block w-full pl-10 pr-3 py-3 
                      bg-gray-800 text-gray-100 placeholder-gray-400
                      border ${
                        errors.message ? "border-red-300" : "border-gray-600"
                      }
                      rounded-lg 
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                      transition duration-150 ease-in-out`}
                    placeholder="Your message here..."
                  />
                </div>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
