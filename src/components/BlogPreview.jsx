import React from "react";

export const BlogPreview = ({ formData, imagePreview }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative min-h-[600px] flex flex-col">
        {/* Background Image Container */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: imagePreview ? `url(${imagePreview})` : "none",
              backgroundColor: !imagePreview ? "#1f2937" : "transparent",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/70 to-gray-900/90" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Category Tag */}
            {formData.category && (
              <span className="inline-block px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full mb-6">
                {formData.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              {formData.title || "Your Story Title"}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: formData.content }}
          />
        </div>
      </div>
    </div>
  );
};
