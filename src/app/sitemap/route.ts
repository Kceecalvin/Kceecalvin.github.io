import { readdir } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

function siteBaseUrl() {
  const configured = process.env.DOMAIN || 'http://localhost:3000';
  return configured.startsWith('http') ? configured : `https://${configured}`;
}

async function insightRoutes() {
  const insightsPath = path.join(process.cwd(), 'src', 'app', 'insights');
  try {
    const entries = await readdir(insightsPath, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => `/insights/${entry.name}`);
  } catch {
    return [];
  }
}

export async function GET() {
  const baseUrl = siteBaseUrl();
  const routes = ['/', '/store', '/cv', '/insights', '/proof', ...(await insightRoutes())];
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((route) => `  <url><loc>${baseUrl}${route}</loc><lastmod>${now}</lastmod></url>`)
    .join('\n')}\n</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
