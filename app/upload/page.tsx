'use client';

import React, { useState, useEffect } from 'react';

const ImageUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <div>
          <h3>미리보기:</h3>
          <img src={previewUrl} alt="미리보기" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;