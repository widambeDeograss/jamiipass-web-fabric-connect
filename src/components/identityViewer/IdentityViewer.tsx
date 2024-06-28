import React, { useEffect, useState } from 'react';

interface DocumentViewerProps {
  documentBase64: any;
}

// Utility function to convert base64 to Blob
const base64ToBlob = (base64: string, contentType: string = ''): Blob => {
  const byteCharacters = atob(base64);
  const byteArrays: Uint8Array[] = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
};

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentBase64 }) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
 
  useEffect(() => {
    if (documentBase64) {
      try {
        const byteString = atob(documentBase64);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const newBlob = new Blob([ia], { type: "application/pdf" });
        const url = window.URL.createObjectURL(newBlob);
        setBlobUrl(url);
      } catch (error) {
        console.error('Error processing document:', error);
      }
    }
  }, [documentBase64]);
  console.log('====================================');
  console.log(blobUrl);
  console.log('====================================');

  return (
    <div>
      {blobUrl ? (
        <iframe src={blobUrl} width="100%" height="600px" />
      ) : (
        <p>Loading document...</p>
      )}
    </div>
  );
};

export default DocumentViewer;
