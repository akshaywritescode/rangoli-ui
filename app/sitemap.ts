import { MetadataRoute } from 'next';
import { components } from '@/lib/components';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rangoli.vercel.app';

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // Component pages
  const componentRoutes: MetadataRoute.Sitemap = components.map((component) => ({
    url: `${baseUrl}/component/${component.id}`,
    lastModified: new Date(component.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...componentRoutes];
}
