import type { APIRoute } from "astro";
import site from "../content/site.json";

export const prerender = true;

function normalizeBase(url: string) {
  // Force HTTPS + www for consistency
  const u = (url || "").trim().replace(/\/+$/, "");
  if (!u) return "https://www.rlcprofessional.com";
  const withProto = u.startsWith("http") ? u : `https://${u}`;
  const forcedWww = withProto.replace(/^https?:\/\/(?!www\.)/i, "https://www.");
  return forcedWww.replace(/\/+$/, "");
}

export const GET: APIRoute = async () => {
  const base = normalizeBase(site.url);

  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${base}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};