import type { MetadataRoute } from 'next';
import { posts, projects } from '@/lib/content';

const baseUrl = 'https://phanvinh.id.vn';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: baseUrl, changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${baseUrl}/blog`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/play`, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];
  const projectRoutes = projects.map((project) => ({ url: `${baseUrl}/projects/${project.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 }));
  const postRoutes = posts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, changeFrequency: 'yearly' as const, priority: 0.6 }));
  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
