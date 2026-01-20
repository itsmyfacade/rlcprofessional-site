export const prerender = true;

const pages = [
  "/", 
  "/thanks",
  "/es/",
];

export async function GET() {
  const site = import.meta.env.SITE || "https://rlcprofessional.com";
  const urls = pages
    .map((p) => `<url><loc>${new URL(p, site).toString()}</loc></url>`)
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}