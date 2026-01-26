import type { APIRoute } from "astro";
import site from "../content/site.json";

export const prerender = true;

function normalizeBase(url: string) {
  const u = (url || "").trim().replace(/\/+$/, "");
  if (!u) return "https://www.rlcprofessional.com";
  const withProto = u.startsWith("http") ? u : `https://${u}`;
  const forcedWww = withProto.replace(/^https?:\/\/(?!www\.)/i, "https://www.");
  return forcedWww.replace(/\/+$/, "");
}

function iso(d = new Date()) {
  return d.toISOString();
}

export const GET: APIRoute = async () => {
  const base = normalizeBase(site.url);
  const lastmod = iso();

  // Add only real public pages you want indexed
  const urls = [
    `${base}/`,
    `${base}/privacy`,
    `${base}/terms`,
    `${base}/thanks`,
    `${base}/es/`,
    `${base}/es/privacy`,
    `${base}/es/terms`,
    `${base}/es/thanks`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};
