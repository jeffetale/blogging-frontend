// src/components/ui/ProfileImageManager.jsx

"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { compressImage } from "@/app/utils/imageUtils";

export function ProfileImageManager() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const { getAccessToken } = useAuth();

  const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = getAccessToken();
      const response = await fetch(`${backendBaseURL}/api/v1/profile/images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(data);

      const activeImage = data.find((img) => img.is_active);
      if (activeImage) {
        setSelectedImage(activeImage.id);
      }
    } catch (error) {
      setError("Error fetching images");
      console.error("Error:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const compressedImage = await compressImage(file, 2); // 2MB max size

      const formData = new FormData();
      formData.append("image", compressedImage);

      const token = getAccessToken();
      const response = await fetch(`${backendBaseURL}/api/v1/profile/images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      await fetchImages();
    } catch (error) {
      setError("Error uploading image");
      console.error("Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSetActive = async (imageId) => {
    try {
      const token = getAccessToken();
      const response = await fetch(
        `${backendBaseURL}/api/v1/profile/images/${imageId}/set-active`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to set active image");

      setSelectedImage(imageId);
      await fetchImages();
    } catch (error) {
      setError("Error setting active image");
      console.error("Error:", error);
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <input
          type="file"
          onChange={handleImageUpload}
          accept="image/*"
          disabled={isUploading}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="px-4 py-2 bg-amber-900 text-white rounded cursor-pointer hover:bg-amber-800"
        >
          {isUploading ? "Uploading..." : "Upload New Image"}
        </label>
      </div>

      {isUploading && <LoadingSpinner />}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card
            key={image.id}
            className={`cursor-pointer ${
              selectedImage === image.id ? "ring-2 ring-amber-900" : ""
            }`}
            onClick={() => handleSetActive(image.id)}
          >
            <CardContent className="p-4">
              <div className="relative w-full h-48">
                <img
                  src={image.image_url}
                  alt="Profile"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="mt-2 text-center">
                {image.is_active && (
                  <span className="text-amber-900 font-semibold">Active</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
