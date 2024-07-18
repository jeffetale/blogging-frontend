import { notFound } from 'next/navigation';

async function getBlogPost(slug) {
  const res = await fetch(`http://127.0.0.1:8000/api/v1/blog_posts/${slug}`);
  if (!res.ok) return undefined;
  return res.json();
}

export default async function BlogPost({ params }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <div>
        <img
            src={post.image_url}
            width={800}
            height={800}
            alt="Blog post image"
            className="w-full h-64 object-cover"
          />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}