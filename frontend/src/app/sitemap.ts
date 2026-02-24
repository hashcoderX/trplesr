import type { MetadataRoute } from 'next'
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const host = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();
  return [
    { url: `${host}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${host}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${host}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${host}/tours`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${host}/services/hotels`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${host}/services/things-to-do`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${host}/services/restaurants`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
