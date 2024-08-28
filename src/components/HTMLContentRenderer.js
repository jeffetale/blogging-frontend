import React from 'react';
import DOMPurify from 'dompurify';

export function HTMLContentRenderer({ content }) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
    />
  );
}