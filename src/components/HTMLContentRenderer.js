// src/components/HTMLContentRenderer.js

import React, { useEffect, useRef } from 'react';
import DOMPurify from 'dompurify';
import Prism from 'prismjs';
import '../styles/prism-okaidia-custom.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';

export function HTMLContentRenderer({ content }) {
  const containerRef = useRef(null);
  const sanitizedContent = DOMPurify.sanitize(content);

  useEffect(() => {
    if (containerRef.current) {
      const codeBlocks = containerRef.current.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        Prism.highlightElement(block);
      });
    }
  }, [content]);

  return (
    <div
      ref={containerRef}
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}