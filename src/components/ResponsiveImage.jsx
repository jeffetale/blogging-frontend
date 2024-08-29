// src/components/ResponsiveImage.jsx

import React from "react";
import Image from "next/image";

export function ResponsiveImage({ post, className }) {
  return (
    <picture>
      <source media="(max-width: 640px)" srcSet={post.image_url_small} />
      <source media="(max-width: 1024px)" srcSet={post.image_url_medium} />
      <source media="(min-width: 1025px)" srcSet={post.image_url_large} />
      <Image
        src={post.image_url_large}
        alt={post.title}
        layout="responsive"
        width={800}
        height={400}
        className={className}
      />
    </picture>
  );
}
