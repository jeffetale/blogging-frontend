// src/components/ProfileImageManager.jsx

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Trash2,
  X,
  Upload,
  Check,
  ImagePlus,
  AlertTriangle,
} from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { compressImage } from "@/app/utils/imageUtils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function ProfileImageManager() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
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
        preview: reader.result,
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

  const handleDeleteImage = async (imageId) => {
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

  const handleModalBackgroundClick = (e) => {
    // Only close if clicking the backdrop, not the modal content
    if (e.target === e.currentTarget) {
      setExpandedImage(null);
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
    return <LoadingSpinner message="Loading your images..." />;
  }

  const handleCardClick = (image) => {
    setExpandedImage(image);
  };

  const handleDeleteConfirm = async () => {
    if (!imageToDelete) return;
    await handleDeleteImage(imageToDelete.id);
    setImageToDelete(null);
    setExpandedImage(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Upload Section */}
      <div className="flex flex-col items-center space-y-4">
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
          className="group relative inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-lg shadow-lg cursor-pointer hover:from-amber-600 hover:to-amber-800 transition-all duration-300 overflow-hidden"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-600 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <ImagePlus className="w-5 h-5 mr-2 relative z-10" />
          <span className="relative z-10">Upload Image</span>
        </label>
      </div>

      {/* Preview Section */}
      {previewImage && (
        <div className="mb-6 relative transform transition-all duration-300 hover:scale-[1.02]">
          <div className="relative w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl">
            <img
              src={previewImage.preview}
              alt="Preview"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 opacity-0 hover:opacity-100">
              <button
                onClick={cancelPreview}
                className="absolute top-4 right-4 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={handleImageUpload}
              disabled={isUploading}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isUploading ? (
                <>
                  <LoadingSpinner size="small" message="" className="w-5 h-5 mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Image Grid */}
      {images.length === 0 && !previewImage ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
          <ImagePlus className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No profile images uploaded yet.</p>
          <p className="text-gray-400 text-sm">
            Upload an image to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <Card
              key={image.id}
              className={`group cursor-pointer relative transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${
                selectedImage === image.id
                  ? "ring-2 ring-green-500 shadow-lg shadow-green-100"
                  : ""
              }`}
              onClick={() => handleCardClick(image)}
            >
              <CardContent className="p-0 relative">
                <div className="relative w-full h-48">
                  <img
                    src={image.image_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm">
                        Click to view options
                      </span>
                    </div>
                  </div>
                </div>
                {image.is_active && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    Active
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleModalBackgroundClick}
        >
          <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl transform transition-all">
            <div className="relative">
              <img
                src={expandedImage.image_url}
                alt="Expanded view"
                className="w-full h-96 object-cover"
              />
              <button
                onClick={() => setExpandedImage(null)}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Image Options</h3>
                <span className="text-sm text-gray-500">
                  Uploaded:{" "}
                  {new Date(expandedImage.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex space-x-4">
                {!expandedImage.is_active && (
                  <button
                    onClick={() => {
                      handleSetActive(expandedImage.id);
                      setExpandedImage(null);
                    }}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Set as Active
                  </button>
                )}
                <button
                  onClick={() => setImageToDelete(expandedImage)}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Image
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!imageToDelete}
        onOpenChange={() => setImageToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleDeleteImage(imageToDelete.id);
                setImageToDelete(null);
                setExpandedImage(null);
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ProfileImageManager;
