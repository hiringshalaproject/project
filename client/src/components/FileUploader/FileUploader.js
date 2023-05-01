import React, { useState } from "react";
import axios from "axios";
import RoundButton from "../DashboardComponent/sidemenu/RoundButton";
import "./FileUploader.css";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const seekerId = "642c639872a7d2eca068e799";
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("seekerId", seekerId);

    setLoading(true);
    axios
      .post("http://localhost:8000/api/v1/seekers/upload", formData, {
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
    <div className="file-uploader">
      <label htmlFor="fileInput" className="choose-file-button">
        {selectedFile ? selectedFile.name : "Choose File"}
      </label>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <RoundButton
        text={
          loading
            ? "Uploading..."
            : success
            ? "Resume Uploaded \u2713"
            : "Upload/update Resume"
        }
        className={
          loading
            ? "upload-button"
            : success
            ? "uploaded-button"
            : "uploaded-button"
        }
        onClick={handleUpload}
        disabled={!selectedFile || loading || success}
      />

      {error && (
        <span className="text-red-500 ml-4">
          Upload failed. Please try again.
        </span>
      )}
    </div>
  );
}

export default FileUploader;
