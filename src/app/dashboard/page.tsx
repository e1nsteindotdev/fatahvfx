"use client"

import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Trash2, Plus, Upload, LogOut, Video, Folder } from "lucide-react";

export default function DashboardPage() {
  const categories = useQuery(api.categories.listPublic);
  const createCategory = useMutation(api.categories.create);
  const removeCategory = useMutation(api.categories.remove);
  const generateUploadUrl = useMutation(api.video.generateUploadUrl);
  const createVideo = useMutation(api.video.create);
  const removeVideo = useMutation(api.video.remove);

  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [uploadingCategoryId, setUploadingCategoryId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ categoryId: string, progress: number, stage: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateCategory = async () => {
    if (!newCategoryTitle.trim()) {
      toast.error("Please enter a category title");
      return;
    }

    try {
      setIsCreatingCategory(true);
      await createCategory({
        title: newCategoryTitle.trim(),
      });
      toast.success("Category created successfully!");
      setNewCategoryTitle("");
    } catch (error) {
      toast.error("Failed to create category");
      console.error(error);
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const handleDeleteCategory = async (categoryId: Id<"categories">, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This will also delete all videos in this category.`)) {
      return;
    }

    try {
      await removeCategory({ categoryId });
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete category");
      console.error(error);
    }
  };

  const handleFileUpload = async (categoryId: Id<"categories">, file: File) => {
    try {
      setUploadingCategoryId(categoryId);
      setUploadProgress({ categoryId, progress: 10, stage: "Preparing upload..." });

      // Get upload URL from Convex
      const uploadUrl = await generateUploadUrl();
      setUploadProgress({ categoryId, progress: 30, stage: "Uploading video..." });

      // Upload file to Convex storage
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const { storageId } = await response.json();
      setUploadProgress({ categoryId, progress: 70, stage: "Creating record..." });

      // Create video record in database
      await createVideo({
        categoryId,
        storageId,
        title: file.name,
      });

      setUploadProgress({ categoryId, progress: 100, stage: "Complete!" });
      toast.success("Video uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload video");
      console.error(error);
    } finally {
      setUploadingCategoryId(null);
      setTimeout(() => setUploadProgress(null), 1000);
    }
  };

  const handleDeleteVideo = async (videoId: Id<"videos">) => {
    if (!confirm("Are you sure you want to delete this video?")) {
      return;
    }

    try {
      await removeVideo({ videoId });
      toast.success("Video deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete video");
      console.error(error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("dashboard_auth");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Folder className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Content Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Category Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Section</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Section title (e.g., UGC, Long Form Content)"
              value={newCategoryTitle}
              onChange={(e) => setNewCategoryTitle(e.target.value)}
              className="flex-1 text-black"
            />
            <Button
              onClick={handleCreateCategory}
              disabled={isCreatingCategory}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              {isCreatingCategory ? "Creating..." : "Add Section"}
            </Button>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Your Sections</h2>

          {!categories ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading sections...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <Folder className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No sections yet</p>
              <p className="text-sm text-gray-500">Create your first section above to get started</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  onDelete={() => handleDeleteCategory(category._id, category.title)}
                  onUpload={(file) => handleFileUpload(category._id, file)}
                  onDeleteVideo={handleDeleteVideo}
                  isUploading={uploadingCategoryId === category._id}
                  uploadProgress={uploadProgress?.categoryId === category._id ? uploadProgress : null}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function CategoryCard({
  category,
  onDelete,
  onUpload,
  onDeleteVideo,
  isUploading,
  uploadProgress,
}: {
  category: any;
  onDelete: () => void;
  onUpload: (file: File) => void;
  onDeleteVideo: (videoId: Id<"videos">) => void;
  isUploading: boolean;
  uploadProgress: { categoryId: string, progress: number, stage: string } | null;
}) {
  const videos = useQuery(api.video.listByCategory, { categoryId: category._id });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        toast.error("Please upload a video file");
        return;
      }
      onUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Category Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*"
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="gap-2 text-black"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                {uploadProgress?.stage || "Uploading..."}
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-black" />
                <p className="text-black">
                  Add Video

                </p>
              </>
            )}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onDelete}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Section
          </Button>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="p-6 bg-gray-50">
        {isUploading && uploadProgress && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900">{uploadProgress.stage}</span>
              <span className="text-sm text-blue-700">{uploadProgress.progress}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        {!videos ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">No videos yet</p>
            <p className="text-xs text-gray-500">Click &quot;Add Video&quot; to upload</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video: any) => (
              <VideoCard
                key={video._id}
                video={video}
                onDelete={() => onDeleteVideo(video._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function VideoCard({
  video,
  onDelete,
}: {
  video: any;
  onDelete: () => void;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group">
      <div className="aspect-video bg-gray-900 relative">
        <video
          src={video.url}
          className="w-full h-full object-cover"
          controls
          preload="metadata"
        />
      </div>
      <div className="p-3 flex items-center justify-between">
        <p className="text-sm text-gray-700 truncate flex-1 mr-2">
          {video.title || "Untitled Video"}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
