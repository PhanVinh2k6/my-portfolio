export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "nextjs-performance",
    title: "Optimizing Next.js Performance for Production",
    excerpt: "A deep dive into performance optimization techniques for Next.js applications, including code splitting, image optimization, and caching strategies.",
    date: "2024-12-15",
    readTime: "8 min read",
    category: "Performance",
    slug: "nextjs-performance",
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for Scalable Apps",
    excerpt: "Learn how to leverage TypeScript's type system to write more maintainable and scalable applications.",
    date: "2024-11-28",
    readTime: "6 min read",
    category: "Development",
    slug: "typescript-best-practices",
  },
  {
    id: "ai-future",
    title: "The Future of AI in Web Development",
    excerpt: "Exploring how AI is transforming web development with new tools, frameworks, and possibilities for developers.",
    date: "2024-11-10",
    readTime: "10 min read",
    category: "AI & Tech",
    slug: "ai-future",
  },
];
