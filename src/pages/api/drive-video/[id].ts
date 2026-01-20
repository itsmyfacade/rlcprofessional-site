export const prerender = false;

import type { APIRoute } from "astro";

const DRIVE_UC = (id: string, extra = "") =>
  `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}${extra}`;

function pickCookie(setCookie: string[] | null | undefined) {
  if (!setCookie?.length) return "";
  return setCookie.map((c) => c.split(";")[0]).join("; ");
}

function headerGetSetCookie(res: Response): string[] | undefined {
  const anyHeaders = res.headers as any;
  return (anyHeaders?.getSetCookie?.() as string[] | undefined) || undefined;
}

async function isHtmlLike(res: Response): Promise<boolean> {
  const ct = (res.headers.get("content-type") || "").toLowerCase();
  if (ct.includes("text/html")) return true;

  // If content-type is missing or weird, sniff a tiny prefix (safe for small bodies).
  const len = Number(res.headers.get("content-length") || "0");
  if (len && len > 250_000) return false;

  try {
    const clone = res.clone();
    const buf = await clone.arrayBuffer();

    // ✅ FIX: avoid Node Buffer typings; use TextDecoder (works in Astro runtime)
    const head = new TextDecoder("utf-8")
      .decode(buf.slice(0, 2048))
      .trimStart()
      .toLowerCase();

    return (
      head.startsWith("<!doctype html") ||
      head.startsWith("<html") ||
      head.includes("confirm=") ||
      head.includes("download_warning")
    );
  } catch {
    return false;
  }
}

async function extractConfirmToken(html: string): Promise<string | undefined> {
  const m =
    html.match(/confirm=([0-9A-Za-z_]+)&/i) ||
    html.match(/name="confirm"\s+value="([^"]+)"/i);
  return m?.[1] ? m[1] : undefined;
}

/**
 * ✅ In-memory cache so Range requests don’t re-handshake every time.
 * TTL keeps it safe and avoids stale cookies.
 */
type TokenCacheEntry = { cookie: string; confirm?: string; ts: number };
const tokenCache = new Map<string, TokenCacheEntry>();
const TOKEN_TTL_MS = 10 * 60 * 1000; // 10 minutes

function getCached(id: string): TokenCacheEntry | undefined {
  const e = tokenCache.get(id);
  if (!e) return undefined;
  if (Date.now() - e.ts > TOKEN_TTL_MS) {
    tokenCache.delete(id);
    return undefined;
  }
  return e;
}

function setCached(id: string, cookie: string, confirm?: string) {
  tokenCache.set(id, { cookie, confirm, ts: Date.now() });
}

function baseHeaders(): Record<string, string> {
  return {
    "User-Agent": "Mozilla/5.0",
    Accept: "*/*",
    // Keeps Drive handshake responses predictable
    "Accept-Encoding": "identity",
  };
}

async function fetchUpstream(url: string, cookie?: string, range?: string) {
  const h = baseHeaders();
  if (cookie) h.Cookie = cookie;
  if (range) h.Range = range;

  return fetch(url, {
    redirect: "follow",
    headers: h,
  });
}

/**
 * ✅ Best effort:
 * 1) If we have cached cookie/confirm -> stream immediately.
 * 2) Otherwise, try stream directly (especially for Range) — sometimes it works without confirm.
 * 3) If HTML returned -> do handshake once, cache, retry stream.
 */
async function fetchDriveStream(id: string, range?: string): Promise<Response> {
  const cached = getCached(id);

  // A) If cached tokens exist, try using them first
  if (cached) {
    const url = cached.confirm
      ? DRIVE_UC(id, `&confirm=${encodeURIComponent(cached.confirm)}`)
      : DRIVE_UC(id);
    const r = await fetchUpstream(url, cached.cookie, range);
    if (!(await isHtmlLike(r))) return r;
    tokenCache.delete(id);
  }

  // B) Try direct stream without confirm/cookie (often works for public files)
  {
    const r = await fetchUpstream(DRIVE_UC(id), undefined, range);
    if (!(await isHtmlLike(r))) return r;
  }

  // C) Handshake once to get confirm token + cookie
  const r1 = await fetchUpstream(DRIVE_UC(id), undefined, undefined);
  const sc1 = headerGetSetCookie(r1);
  const cookie = pickCookie(sc1);

  if (!(await isHtmlLike(r1))) {
    setCached(id, cookie, undefined);
    return r1;
  }

  const html = await r1.text();
  const confirm = await extractConfirmToken(html);

  setCached(id, cookie, confirm);

  const url2 = confirm ? DRIVE_UC(id, `&confirm=${encodeURIComponent(confirm)}`) : DRIVE_UC(id);
  const r2 = await fetchUpstream(url2, cookie, range);

  if (await isHtmlLike(r2)) {
    return new Response("Drive did not return a streamable file (quota/permission/interstitial).", {
      status: 502,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  return r2;
}

export const GET: APIRoute = async ({ params, request }) => {
  const id = params.id;
  if (!id) return new Response("Missing id", { status: 400 });

  const range = request.headers.get("range") || undefined;

  const upstream = await fetchDriveStream(id, range);

  if (upstream.status === 502) return upstream;

  const headers = new Headers();

  const pass = ["content-type", "content-length", "content-range", "accept-ranges", "etag", "last-modified"];
  for (const k of pass) {
    const v = upstream.headers.get(k);
    if (v) headers.set(k, v);
  }

  const ct = (headers.get("content-type") || "").toLowerCase();
  if (!ct || ct.includes("application/octet-stream")) {
    headers.set("content-type", "video/mp4");
  }

  headers.set("content-disposition", 'inline; filename="video.mp4"');

  if (!headers.get("accept-ranges")) headers.set("accept-ranges", "bytes");

  headers.set("cache-control", "public, max-age=86400, s-maxage=86400");
  headers.set("vary", "Range");

  headers.set("cross-origin-resource-policy", "same-origin");

  return new Response(upstream.body, {
    status: upstream.status, // 200 or 206
    headers,
  });
};


