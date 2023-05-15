import React, { useState } from "react";
import axios from "axios";
import RoundButton from "../DashboardComponent/sidemenu/RoundButton";
import "./FileUploader.css";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL || "http://192.168.29.129:8000";

function FileUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = ["pdf", "doc", "docx"];

    if (
      file &&
      allowedExtensions.includes(file.name.split(".").pop().toLowerCase())
    ) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    const seekerId = Cookies.get("userId");
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

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  return (
    <div className="file-uploader">
      <div
        className="drop-zone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label htmlFor="fileInput" className="choose-file-text">
          <strong>{selectedFile ? selectedFile.name : "Drag and Drop"} </strong>
          <span> or </span>
          <a
            href="#"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Browse
          </a>
        </label>
      </div>

      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {selectedFile && (
        <RoundButton
          text={
            loading
              ? "Uploading..."
              : success
              ? "Resume Uploaded \u2713"
              : "Upload Resume"
          }
          className={`${
            loading
              ? "upload-button"
              : success
              ? "uploaded-button"
              : "uploaded-button"
          } ${selectedFile ? "has-file" : ""} ${
            error ? "has-error" : ""
          } sm:rounded`}
          onClick={handleUpload}
          disabled={loading || success}
          style={{ maxWidth: "100%" }}
        />
      )}

      {error && (
        <span className="text-red-500 ml-4">
          Upload failed. Please try again.
        </span>
      )}
    </div>
  );
}

export default FileUploader;
