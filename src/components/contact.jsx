"use client";

import { useState } from "react";

export function Contact(params) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = "Name is required.";
        if (!formData.email) tempErrors.email = "Email is required.";
        if (!formData.message) tempErrors.message = "Message is required.";
        return tempErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            try {
              const response = await fetch('http://127.0.0.1:8000/api/v1/contact', {
                method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
              });
          if (!response.ok) {
            throw new Error('Network response was not ok');

          }
          const data = await response.json()
          console.log("Response Data:", data);
          setIsSubmitted(true);
            } 
            catch (error) {
              console.error("Error submitting form:", error);

          } finally {
            setIsSubmitting(false);
          }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          {isSubmitted ? (
            <p className="text-green-500">Thank you for your message!</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
              </div>
              <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
                Submit
              </button>
            </form>
          )}
        </div>
      );
};