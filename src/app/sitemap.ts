import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.carterdockery.com';
  const now = new Date();

  const staticRoutes = [
    { url: base, priority: 1.0, changeFrequency: 'monthly' as const },
    { url: `${base}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/projects`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/skills`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/experience`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${base}/analytics`, priority: 0.6, changeFrequency: 'weekly' as const },
    { url: `${base}/resume`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${base}/contact`, priority: 0.7, changeFrequency: 'yearly' as const },
  ];

  const projectSlugs = [
    'azure-retail-pipeline',
    'casino-platform',
    'hc-it-toolkit',
    'construction-analytics',
    'robotics-ecommerce',
    'stratforge-ai',
  ];

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${base}/projects/${slug}`,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    ...route,
    lastModified: now,
  }));
}
