import React, { useState } from "react";
import axios from "axios";

interface FileUploadProps {
  setImageUrl: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setImageUrl }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("upload_preset", "Snapstyle");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dgsbnmnfu/image/upload`,
          formData
        );
        setImageUrl(response.data.secure_url);
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <label
        htmlFor="file-upload"
        className={`cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ${
          isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isUploading ? "Uploading..." : "Upload Image"}
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
};

export default FileUpload;
