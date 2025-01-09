// src/components/ProfileImageManager.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Trash2, X } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { compressImage } from "@/app/utils/imageUtils";

export function ProfileImageManager() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { getAccessToken } = useAuth();

  const backendBaseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const token = getAccessToken();
      const response = await fetch(`${backendBaseURL}/api/v1/profile/images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 404) {
        setImages([]);
        return;
      }
      
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage({
        file,
        preview: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async () => {
    if (!previewImage) return;

    try {
      setIsUploading(true);
      setError(null);
      const compressedImage = await compressImage(previewImage.file, 2); // 2MB max size

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Upload failed");
      }

      await fetchImages();
      setPreviewImage(null); // Clear preview after successful upload
    } catch (error) {
      setError(error.message || "Error uploading image");
      console.error("Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const cancelPreview = () => {
    setPreviewImage(null);
  };

  const handleSetActive = async (imageId) => {
    try {
      setError(null);
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

  const handleDeleteImage = async (imageId, e) => {
    e.stopPropagation();
    
    try {
      setError(null);
      const token = getAccessToken();
      const response = await fetch(
        `${backendBaseURL}/api/v1/profile/images/${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete image");

      await fetchImages();
    } catch (error) {
      setError("Error deleting image");
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <input
          type="file"
          onChange={handleImageSelect}
          accept="image/*"
          disabled={isUploading}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="px-4 py-2 bg-amber-900 text-white rounded cursor-pointer hover:bg-amber-800"
        >
          Select Image
        </label>
      </div>

      {previewImage && (
        <div className="mb-6 relative">
          <div className="relative w-full max-w-md mx-auto">
            <img
              src={previewImage.preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded"
            />
            <button
              onClick={cancelPreview}
              className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={handleImageUpload}
              disabled={isUploading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </div>
      )}

      {isUploading && <LoadingSpinner />}

      {images.length === 0 && !previewImage ? (
        <div className="text-center py-8 text-gray-500">
          No profile images uploaded yet. Select an image above to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <Card
              key={image.id}
              className={`cursor-pointer relative ${
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
                  <button
                    onClick={(e) => handleDeleteImage(image.id, e)}
                    className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
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
      )}
    </div>
  );
}

export default ProfileImageManager;
