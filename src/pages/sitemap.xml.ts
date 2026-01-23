export const prerender = true;

// ✅ Keep this simple + explicit (only real routes you have)
const pages = [
  "/",
  "/thanks",
  "/privacy",
  "/terms",
  "/owner-upload",

  "/es/",
  "/es/thanks",
  "/es/privacy",
  "/es/terms",
  "/es/owner-upload",
];

export async function GET() {
  const site = import.meta.env.SITE || "https://rlcprofessional.com";

  const urls = pages
    .map((p) => {
      const loc = new URL(p, site).toString();
      return `<url><loc>${loc}</loc></url>`;
    })
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
