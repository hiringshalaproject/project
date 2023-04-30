import React, { useState } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const seekerId = "642c63ca9af7d583d5bce8f4";
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("seekerId", seekerId);

    setLoading(true);
    axios
      .post(`${apiUrl}/api/v1/seekers/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setLoading(false);
        setSuccess(true);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <div className="flex items-center" style={{ marginTop: "20px" }}>
      <input type="file" onChange={handleFileChange} />
      {loading ? (
        <button
          className="w-52 h-[40px] bg-red-300 rounded-[8px] font-medium text-black ml-4 cursor-wait"
          disabled
        >
          Uploading...
        </button>
      ) : success ? (
        <button
          className="w-52 h-[40px] bg-green-500 rounded-[8px] font-medium text-black ml-4 cursor-not-allowed"
          disabled
        >
          Resume Uploaded &#10003;
        </button>
      ) : error ? (
        <button
          className="w-52 h-[40px] bg-red-300 rounded-[8px] font-medium text-black ml-4"
          onClick={handleUpload}
        >
          Upload Again
        </button>
      ) : (
        <button
          className="w-52 h-[40px] bg-red-300 rounded-[8px] font-medium text-black ml-4"
          onClick={handleUpload}
          disabled={!selectedFile}
        >
          Upload
        </button>
      )}
    </div>
  );
}

export default FileUploader;
