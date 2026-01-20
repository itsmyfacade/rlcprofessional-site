export { renderers } from '../../../renderers.mjs';

const prerender = false;
const DRIVE_UC = (id, extra = "") => `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}${extra}`;
function pickCookie(setCookie) {
  if (!setCookie?.length) return "";
  return setCookie.map((c) => c.split(";")[0]).join("; ");
}
function headerGetSetCookie(res) {
  const anyHeaders = res.headers;
  return anyHeaders?.getSetCookie?.() || void 0;
}
async function isHtmlLike(res) {
  const ct = (res.headers.get("content-type") || "").toLowerCase();
  if (ct.includes("text/html")) return true;
  const len = Number(res.headers.get("content-length") || "0");
  if (len && len > 25e4) return false;
  try {
    const clone = res.clone();
    const buf = await clone.arrayBuffer();
    const head = new TextDecoder("utf-8").decode(buf.slice(0, 2048)).trimStart().toLowerCase();
    return head.startsWith("<!doctype html") || head.startsWith("<html") || head.includes("confirm=") || head.includes("download_warning");
  } catch {
    return false;
  }
}
async function extractConfirmToken(html) {
  const m = html.match(/confirm=([0-9A-Za-z_]+)&/i) || html.match(/name="confirm"\s+value="([^"]+)"/i);
  return m?.[1] ? m[1] : void 0;
}
const tokenCache = /* @__PURE__ */ new Map();
const TOKEN_TTL_MS = 10 * 60 * 1e3;
function getCached(id) {
  const e = tokenCache.get(id);
  if (!e) return void 0;
  if (Date.now() - e.ts > TOKEN_TTL_MS) {
    tokenCache.delete(id);
    return void 0;
  }
  return e;
}
function setCached(id, cookie, confirm) {
  tokenCache.set(id, { cookie, confirm, ts: Date.now() });
}
function baseHeaders() {
  return {
    "User-Agent": "Mozilla/5.0",
    Accept: "*/*",
    // Keeps Drive handshake responses predictable
    "Accept-Encoding": "identity"
  };
}
async function fetchUpstream(url, cookie, range) {
  const h = baseHeaders();
  if (cookie) h.Cookie = cookie;
  if (range) h.Range = range;
  return fetch(url, {
    redirect: "follow",
    headers: h
  });
}
async function fetchDriveStream(id, range) {
  const cached = getCached(id);
  if (cached) {
    const url = cached.confirm ? DRIVE_UC(id, `&confirm=${encodeURIComponent(cached.confirm)}`) : DRIVE_UC(id);
    const r = await fetchUpstream(url, cached.cookie, range);
    if (!await isHtmlLike(r)) return r;
    tokenCache.delete(id);
  }
  {
    const r = await fetchUpstream(DRIVE_UC(id), void 0, range);
    if (!await isHtmlLike(r)) return r;
  }
  const r1 = await fetchUpstream(DRIVE_UC(id), void 0, void 0);
  const sc1 = headerGetSetCookie(r1);
  const cookie = pickCookie(sc1);
  if (!await isHtmlLike(r1)) {
    setCached(id, cookie, void 0);
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
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }
  return r2;
}
const GET = async ({ params, request }) => {
  const id = params.id;
  if (!id) return new Response("Missing id", { status: 400 });
  const range = request.headers.get("range") || void 0;
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
    status: upstream.status,
    // 200 or 206
    headers
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
