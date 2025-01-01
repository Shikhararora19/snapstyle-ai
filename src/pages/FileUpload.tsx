import React from "react";
import axios from "axios";

interface FileUploadProps {
  setImageUrl: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setImageUrl }) => {
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
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
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Upload Image
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
