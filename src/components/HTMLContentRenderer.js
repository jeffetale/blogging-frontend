import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // You can choose a different theme
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';

export function HTMLContentRenderer({ content }) {
  const sanitizedContent = DOMPurify.sanitize(content);

  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
    />
  );
}