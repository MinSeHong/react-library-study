'use client';

import React, { useState, useEffect } from 'react';
import Header from '../_components/header';

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
    <>
      <Header />

      <div style={{ textAlign: 'center', paddingTop: '40px' }}>
        <h1>파일 선택 및 미리보기 만들기</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && (
          <div
            style={{
              border: '2px solid black',
              width: '600px',
              margin: 'auto',
              marginTop: '20px',
            }}
          >
            <h2>미리보기</h2>
            <img
              src={previewUrl}
              alt="미리보기"
              style={{ maxWidth: '500px' }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageUploader;
