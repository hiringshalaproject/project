import React, { useState } from 'react';
import axios from 'axios';

function FileUploader() {
const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (event) => {
setSelectedFile(event.target.files[0]);
};

const handleUpload = () => {
  const formData = new FormData();
  formData.append('file', selectedFile);

  axios.post('http://localhost:8000/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
};


return (
<div>
<input type="file" onChange={handleFileChange} />
<button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
</div>
);
}

export default FileUploader;