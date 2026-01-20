export type GalleryItem = {
  id: string;
  createdAt?: string;

  serviceType?: string;
  city?: string;
  caption?: string;

  beforeUrl?: string;
  afterUrl?: string;
  videoUrl?: string;

  // Public link (Drive/Photos/etc.)
  publicLink?: string;
  publicEmbedUrl?: string;
  publicEmbedKind?: "image" | "video";

  // multiple photos
  morePhotoUrls?: string[];
};

type AnyRecord = Record<string, any>;

/** Normalize labels/keys to make matching resilient. */
function normKey(s: unknown) {
  return String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[_-]+/g, " ")
    .replace(/[^\w\s/]+/g, ""); // keep "/" for labels like "City / ZIP"
}

/** Pull any http(s) URLs out of a string (works for JSON-in-cell, newlines, etc.) */
function findUrlsInString(s: string): string[] {
  if (!s) return [];
  const matches = s.match(/https?:\/\/[^\s"'<>]+/g);
  if (!matches) return [];
  return matches
    .map((u) => u.replace(/[),.\]]+$/g, "")) // trim trailing punctuation
    .map((u) => u.replace(/^"+|"+$/g, "")) // trim quotes
    .filter((u) => u.startsWith("http"));
}

/**
 * ✅ NEW: Detect raw Google Drive file IDs (what you see in Network: "17VSeX...")
 * Typical Drive IDs are 20–120 chars of A-Z a-z 0-9 _ -
 */
function looksLikeDriveId(v?: string) {
  if (!v) return false;
  const s = v.trim();
  return /^[a-zA-Z0-9_-]{20,120}$/.test(s) && !s.includes("/") && !s.includes(" ");
}

/** Extract a best-effort URL from common Tally file upload shapes. */
function extractUrl(v: any): string | undefined {
  if (!v) return undefined;

  if (typeof v === "string") {
    const s = v.trim();
    if (!s) return undefined;

    // ✅ FIX: If it's a raw Drive ID, keep it (we’ll proxy it later)
    if (looksLikeDriveId(s)) return s;

    if (s.startsWith("http")) return s;

    // JSON-in-cell / multiple URLs
    const urls = findUrlsInString(s);
    return urls[0];
  }

  if (Array.isArray(v)) {
    for (const item of v) {
      const u = extractUrl(item);
      if (u) return u;
    }
    return undefined;
  }

  if (typeof v === "object") {
    const maybe =
      v.url ||
      v.href ||
      v.fileUrl ||
      v.file_url ||
      v.publicUrl ||
      v.public_url ||
      v.downloadUrl ||
      v.download_url ||
      v.src;

    if (typeof maybe === "string") {
      const s = maybe.trim();
      if (!s) return undefined;

      // ✅ FIX: allow raw Drive IDs embedded here too
      if (looksLikeDriveId(s)) return s;

      if (s.startsWith("http")) return s;
    }

    if (v.file) return extractUrl(v.file);
    if (v.value) return extractUrl(v.value);
  }

  return undefined;
}

function extractUrls(v: any): string[] {
  if (!v) return [];

  if (typeof v === "string") {
    const s = v.trim();
    if (!s) return [];

    // ✅ FIX: allow raw Drive IDs in multi fields (rare, but safe)
    if (looksLikeDriveId(s)) return [s];

    const urls = findUrlsInString(s);
    if (urls.length) return urls;
    return s.startsWith("http") ? [s] : [];
  }

  if (Array.isArray(v)) return v.map(extractUrl).filter(Boolean) as string[];

  if (typeof v === "object") {
    if (Array.isArray(v.value)) return v.value.map(extractUrl).filter(Boolean) as string[];
    if (typeof v.value === "string") {
      const s = v.value.trim();
      if (looksLikeDriveId(s)) return [s];
      const urls = findUrlsInString(s);
      if (urls.length) return urls;
    }
    const u = extractUrl(v);
    return u ? [u] : [];
  }

  return [];
}

/**
 * Flatten Tally-style submissions into a plain object:
 * { "Field Label": value, ... }
 */
function flattenRecord(raw: AnyRecord): AnyRecord {
  if (!raw || typeof raw !== "object") return {};

  const out: AnyRecord = { ...raw };

  const candidates = [raw.fields, raw.answers, raw.data, raw.responses, raw.items].filter(Boolean);

  for (const c of candidates) {
    if (!Array.isArray(c)) continue;

    for (const entry of c) {
      if (!entry || typeof entry !== "object") continue;

      const label = entry.label || entry.name || entry.key || entry.title;
      const value = entry.value ?? entry.answer ?? entry.response ?? entry.data ?? entry.file ?? entry.files;

      if (typeof label === "string" && label.trim().length) {
        out[label] = value;
      }
    }
  }

  if (raw.submission && typeof raw.submission === "object") {
    return { ...out, ...flattenRecord(raw.submission) };
  }
  if (raw.payload && typeof raw.payload === "object") {
    return { ...out, ...flattenRecord(raw.payload) };
  }

  return out;
}

/** Resilient field getter */
function pick(record: AnyRecord, keys: string[]): any {
  const nk = new Map<string, string>();
  for (const k of Object.keys(record)) nk.set(normKey(k), k);

  for (const key of keys) {
    const exact = record[key];
    if (exact !== undefined) return exact;

    const found = nk.get(normKey(key));
    if (found && record[found] !== undefined) return record[found];
  }

  return undefined;
}

/** Robust CSV parser (handles quoted cells containing commas/newlines). */
function parseCsv(text: string): AnyRecord[] {
  const rows: string[][] = [];
  let cur = "";
  let row: string[] = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (ch === '"') {
      const next = text[i + 1];
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      row.push(cur);
      cur = "";
      continue;
    }

    if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cur);
      cur = "";
      if (row.some((c) => c.trim().length)) rows.push(row);
      row = [];
      continue;
    }

    cur += ch;
  }

  row.push(cur);
  if (row.some((c) => c.trim().length)) rows.push(row);

  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim().replace(/^"|"$/g, ""));
  const out: AnyRecord[] = [];

  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r];
    const obj: AnyRecord = {};
    headers.forEach((h, idx) => {
      const raw = cells[idx] ?? "";
      obj[h] = typeof raw === "string" ? raw.replace(/^"|"$/g, "") : raw;
    });
    out.push(obj);
  }

  return out;
}

/** Try to parse unknown feed formats into an array of plain objects. */
async function fetchAsRecords(feedUrl: string): Promise<AnyRecord[]> {
  if (!feedUrl) return [];

  const res = await fetch(feedUrl);
  if (!res.ok) return [];

  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json") || feedUrl.includes(".json")) {
    const data = await res.json();

    if (Array.isArray(data)) return data as AnyRecord[];

    if (data?.submissions && Array.isArray(data.submissions)) return data.submissions;
    if (data?.data && Array.isArray(data.data)) return data.data;
    if (data?.rows && Array.isArray(data.rows)) return data.rows;

    return [];
  }

  const text = await res.text();
  return parseCsv(text);
}

function safeString(v: any): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  return s.length ? s : undefined;
}

/** Extract Drive FILE id from common link formats OR raw ID */
function driveFileIdFromUrl(u: string): string | undefined {
  const url = (u || "").trim();
  if (!url) return undefined;

  // ✅ raw ID
  if (looksLikeDriveId(url)) return url;

  // file/d/<id>
  const m1 = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (m1?.[1]) return m1[1];

  // open?id=<id> or ...?id=<id>
  const m2 = url.match(/[?&]id=([^&]+)/i);
  if (m2?.[1]) return m2[1];

  // ✅ uc?export=download&id=<id>
  const m3 = url.match(/\/uc\?(?:[^#]*&)?id=([^&]+)/i);
  if (m3?.[1]) return m3[1];

  return undefined;
}

function isDriveLink(u?: string): boolean {
  if (!u) return false;
  const s = u.trim();
  if (!s) return false;

  // ✅ treat raw IDs as Drive too
  if (looksLikeDriveId(s)) return true;

  return /drive\.google\.com/i.test(s);
}

/**
 * ✅ PRODUCTION: For Drive, ALWAYS use your local proxy stream endpoint.
 * Your route: /api/drive-video/[id].ts (prerender=false)
 */
function driveProxyUrl(publicLinkOrId: string): string | undefined {
  const id = driveFileIdFromUrl(publicLinkOrId);
  if (!id) return undefined;
  return `/api/drive-video/${id}`;
}

/**
 * ✅ Derive embed info for "Public Media Link"
 * - Drive => stream via proxy as a real <video> source
 */
function deriveEmbed(publicLink?: string): { publicEmbedUrl?: string; publicEmbedKind?: "image" | "video" } {
  if (!publicLink) return {};
  const url = publicLink.trim();

  if (isDriveLink(url)) {
    const prox = driveProxyUrl(url);
    if (!prox) return {};
    return {
      publicEmbedUrl: prox,
      publicEmbedKind: "video",
    };
  }

  return {};
}

/**
 * ✅ Build item from your exact EN/ES field names.
 * NOTE:
 * - If "Video" is Drive link OR raw ID => normalize to proxy
 * - If "Public Media Link" is Drive link OR raw ID => also normalize
 */
function buildItem(rawRecord: AnyRecord, i: number): GalleryItem {
  const record = flattenRecord(rawRecord);

  const serviceType = safeString(pick(record, ["Service Type", "Tipo de Servicio", "Tipo de servicio"]));

  const city = safeString(pick(record, ["City", "Ciudad (o ZIP)", "Ciudad (o Zip)", "Ciudad", "ZIP"]));

  const caption = safeString(
    pick(record, [
      "Caption",
      "Descripcion / Notas (opcional)",
      "Descripción / Notas (opcional)",
      "Descripcion / Notas",
      "Descripción / Notas",
    ])
  );

  const beforeRaw = pick(record, ["Before Photo", "Foto de Antes"]);
  const afterRaw = pick(record, ["After Photo", "Foto de Despues", "Foto de Después"]);
  const videoRaw = pick(record, ["Video", "Vídeo"]);

  const linkRaw = pick(record, [
    "Public Media Link (Google Photos / Drive)",
    "Public Media Link",
    "Enlace Publico (Google Fotos / Drive)",
    "Enlace Público (Google Fotos / Drive)",
    "Enlace Publico",
    "Enlace público",
  ]);

  const multiRaw = pick(record, ["Single Photo / Multiple Photos", "Una Foto / Varias Fotos"]);

  const beforeUrl = extractUrl(beforeRaw);
  const afterUrl = extractUrl(afterRaw);

  // raw values from feed (can be URL OR raw Drive ID)
  const rawVideoUrl = extractUrl(videoRaw);
  const rawPublicLink = extractUrl(linkRaw) || safeString(linkRaw);

  // multi upload urls
  let morePhotoUrls = extractUrls(multiRaw);

  // If uploads didn't provide usable URLs, fallback to URLs inside publicLink
  if (rawPublicLink) {
    const linkUrls = findUrlsInString(rawPublicLink);
    if ((!morePhotoUrls || morePhotoUrls.length === 0) && linkUrls.length > 0) {
      morePhotoUrls = linkUrls;
    }
  }

  const createdAt =
    safeString(pick(record, ["createdAt", "Created at", "Created At", "timestamp", "Timestamp", "Fecha"])) || undefined;

  const id = safeString(pick(record, ["id", "ID", "submissionId", "Submission ID"])) || `${Date.now()}-${i}`;

  let videoUrl = rawVideoUrl;
  let publicLink = rawPublicLink;

  // ✅ If the Video field is Drive link OR raw ID => force proxy
  if (videoUrl && isDriveLink(videoUrl)) {
    const prox = driveProxyUrl(videoUrl);
    if (prox) {
      // keep an openable share link if publicLink missing
      if (!publicLink) {
        publicLink = looksLikeDriveId(videoUrl) ? `https://drive.google.com/file/d/${videoUrl}/view` : videoUrl;
      }
      videoUrl = prox;
    }
  }

  // ✅ If no videoUrl but publicLink is Drive link OR raw ID => treat it as the video source via proxy
  if (!videoUrl && publicLink && isDriveLink(publicLink)) {
    const prox = driveProxyUrl(publicLink);
    if (prox) {
      videoUrl = prox;
    }
  }

  const embed = deriveEmbed(publicLink);

  return {
    id,
    createdAt,
    serviceType,
    city,
    caption,
    beforeUrl,
    afterUrl,
    videoUrl,
    publicLink,
    publicEmbedUrl: embed.publicEmbedUrl,
    publicEmbedKind: embed.publicEmbedKind,
    morePhotoUrls: morePhotoUrls.length ? morePhotoUrls : undefined,
  };
}

export async function fetchGalleryFeed(feedUrl: string, limit = 18): Promise<GalleryItem[]> {
  const records = await fetchAsRecords(feedUrl);
  if (!records.length) return [];

  const items = records.map(buildItem);

  items.sort((a, b) => {
    const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
    const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
    return tb - ta;
  });

  return items.slice(0, limit);
}