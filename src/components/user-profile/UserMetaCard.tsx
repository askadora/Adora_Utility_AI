"use client";
import React from "react";
import Image from "next/image";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { uploadImage, getSignedUrl, updateAvatarUrl, refreshAvatarUrl } from "@/utils/avatarUtils";

export default function UserMetaCard() {
  const { profile, loading, error } = useUserProfile();
  const { session } = useAuth();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [signedImageUrl, setSignedImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const refreshSignedUrl = async () => {
      if (session?.user?.user_metadata?.avatar_url) {
        const newSignedUrl = await refreshAvatarUrl(session.user.user_metadata.avatar_url, session.user.id);
        setSignedImageUrl(newSignedUrl);
      }
    };

    refreshSignedUrl();
    const interval = setInterval(refreshSignedUrl, 50 * 60 * 1000);
    return () => clearInterval(interval);
  }, [session?.user?.user_metadata?.avatar_url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile data found</div>;
  }

  const imageUrl = (previewUrl || profile.image || signedImageUrl || "/images/user/blank_image.jpg") === "NULL" 
    ? "/images/user/blank_image.jpg" 
    : (previewUrl || profile.image || signedImageUrl || "/images/user/blank_image.jpg");

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please select a valid image file (JPEG, PNG, GIF, WebP, BMP, or SVG)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);

      // Show preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      if (!session?.user) {
        throw new Error('Please sign in to upload an image');
      }

      // Upload image and get file path
      const filePath = await uploadImage(file, session.user.id);

      // Get signed URL
      const signedUrl = await getSignedUrl(session.user.id, filePath);
      if (!signedUrl) throw new Error('Failed to get signed URL');

      // Update user's avatar URL
      await updateAvatarUrl(signedUrl);

      // Reload the page to show the new image
      window.location.reload();
    } catch (err) {
      console.error('Error uploading image:', err);
      setUploadError(err instanceof Error ? err.message : 'Failed to upload image');
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
          <div className="relative flex items-end" style={{ height: 80 }}>
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800 bg-white">
              <Image
                width={80}
                height={80}
                src={imageUrl}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="object-cover"
              />
            </div>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.webp,.bmp,.svg"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <button
              type="button"
              onClick={handleUploadClick}
              disabled={isUploading}
              className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              title={isUploading ? "Uploading..." : "Edit profile image"}
            >
              {isUploading ? (
                <svg className="w-4 h-4 text-gray-700 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              )}
            </button>
          </div>
          {uploadError && (
            <div className="text-sm text-red-600 dark:text-red-400 mt-2">
              {uploadError}
            </div>
          )}
          <div className="order-3 xl:order-2">
            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
              {profile.firstName} {profile.lastName}
            </h4>
          </div>
          <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
            {profile.facebook && (
              <a        
                target="_blank"
                rel="noreferrer" 
                href={`https://${profile.facebook.replace(/^https?:\/\//, '')}`}
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6666 11.2503H13.7499L14.5833 7.91699H11.6666V6.25033C11.6666 5.39251 11.6666 4.58366 13.3333 4.58366H14.5833V1.78374C14.3118 1.7477 13.2858 1.66699 12.2023 1.66699C9.94025 1.66699 8.33325 3.04771 8.33325 5.58342V7.91699H5.83325V11.2503H8.33325V18.3337H11.6666V11.2503Z"
                    fill=""
                  />
                </svg>
              </a>
            )}

            {profile.x && (
              <a 
                href={`https://${profile.x.replace(/^https?:\/\//, '')}`}
                target="_blank"
                rel="noreferrer"  
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.1708 1.875H17.9274L11.9049 8.75833L18.9899 18.125H13.4424L9.09742 12.4442L4.12578 18.125H1.36745L7.80912 10.7625L1.01245 1.875H6.70078L10.6283 7.0675L15.1708 1.875ZM14.2033 16.475H15.7308L5.87078 3.43833H4.23162L14.2033 16.475Z"
                    fill=""
                  />
                </svg>
              </a>
            )}

            {profile.linkedin && (
              <a 
                href={`https://${profile.linkedin.replace(/^https?:\/\//, '')}`}
                target="_blank"
                rel="noreferrer" 
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.78381 4.16645C5.78351 4.84504 5.37181 5.45569 4.74286 5.71045C4.11391 5.96521 3.39331 5.81321 2.92083 5.32613C2.44836 4.83904 2.31837 4.11413 2.59216 3.49323C2.86596 2.87233 3.48886 2.47942 4.16715 2.49978C5.06804 2.52682 5.78422 3.26515 5.78381 4.16645ZM5.83381 7.06645H2.50048V17.4998H5.83381V7.06645ZM11.1005 7.06645H7.78381V17.4998H11.0672V12.0248C11.0672 8.97475 15.0422 8.69142 15.0422 12.0248V17.4998H18.3338V10.8914C18.3338 5.74978 12.4505 5.94145 11.0672 8.46642L11.1005 7.06645Z"
                    fill=""
                  />
                </svg>
              </a>
            )}

            {profile.instagram && (
              <a 
                href={`https://${profile.instagram.replace(/^https?:\/\//, '')}`}
                target="_blank"
                rel="noreferrer" 
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    fill=""
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}