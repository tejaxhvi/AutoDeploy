import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // 1. Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // 2. Handle Form Submission
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    // 3. Create FormData object
    // Browsers use this to format data as "multipart/form-data"
    const formData = new FormData();
    formData.append('file', file); // The key 'file' must match the backend middleware

    try {
      // 4. Send the request
      // Note: We do NOT need to manually set 'Content-Type': 'multipart/form-data'.
      // The browser/fetch sets the correct boundary automatically when using FormData.
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
	console.log("Response from backend",data)
      
      if (response.ok) {
        setMessage(`Success: ${data.filename} uploaded!`);
      } else {
        setMessage('Upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
	    console.log(error)
      setMessage('Server error occurred.');
    }
  };

  return (
    <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center'}}>
      <div style={{ padding: '40px', border: '1px solid #ccc', maxWidth: '400px' }}>
        <h2>File Upload</h2>
        
        <input type="file" onChange={handleFileChange} />
        
        <button 
          onClick={handleUpload} 
          style={{ marginTop: '10px', display: 'block' }}
        >
          Upload
        </button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default FileUpload;
