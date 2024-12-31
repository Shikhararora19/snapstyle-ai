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
          formData.append("upload_preset", "Snapstyle"); // Replace with your actual preset name
      
          try {
            const response = await axios.post(
              `https://api.cloudinary.com/v1_1/dgsbnmnfu/image/upload`, // Replace with your cloud name
              formData
            );
            setImageUrl(response.data.secure_url); // Set the uploaded image URL
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.error("Cloudinary upload error:", error.response?.data || error.message);
            } else {
              console.error("Cloudinary upload error:", error);
            }
          }
        }
      };
      
  return (
    <div>
      <input type="file" onChange={handleUpload} accept="image/*" />
    </div>
  );
};

export default FileUpload;
