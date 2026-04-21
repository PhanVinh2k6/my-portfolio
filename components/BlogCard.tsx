import Link from "next/link";
import type { BlogPost } from "@/data/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group bg-card border border-border rounded-lg p-6 hover:border-accent transition-all duration-300 flex flex-col">
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-accent/10 text-accent rounded">
          {post.category}
        </span>
        <span className="text-xs text-muted-foreground">{post.readTime}</span>
      </div>

      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-accent transition-colors flex-1">
        {post.title}
      </h3>

      <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">{date}</span>
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-medium text-accent hover:underline"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
