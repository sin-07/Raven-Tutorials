import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/admin/', '/api/', '/dashboard/', '/test/', '/live-class/'],
      },
    ],
    sitemap: 'https://raventutorials.com/sitemap.xml',
  };
}
