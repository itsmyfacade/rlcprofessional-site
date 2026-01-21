import { e as createComponent, k as renderComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_CALqXRaA.mjs';
import 'piccolore';
import { $ as $$BaseLayout, s as site } from '../chunks/site_a4MGRwbI.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Thanks = createComponent(($$result, $$props, $$slots) => {
  const canonical = `${site.meta}/thanks`;
  const title = "Request Received | RLC Professional";
  const description = "Thanks for requesting a quote. You\u2019ll be redirected to WhatsApp to confirm details.";
  const ogImage = site.assets?.ogImage ?? "/assets/og.jpg";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": "en", "title": title, "description": description, "canonical": canonical, "ogImage": ogImage }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", '<main class="mx-auto max-w-3xl px-4 py-14"> <div class="card"> <h1 id="heading" class="text-2xl font-extrabold text-brand-900">Request received \u2705</h1> <p id="subtext" class="mt-2 text-slate-700">\nWe got your request. You\u2019ll be redirected to WhatsApp to confirm details.\n</p> <div class="mt-6 rounded-2xl bg-brand-50 p-4 ring-1 ring-slate-200/60"> <p class="text-sm font-semibold text-brand-900">Service:</p> <p id="serviceLabel" class="mt-1 text-sm text-slate-700">Loading\u2026</p> </div> <p id="fallbackText" class="mt-6 text-sm text-slate-600">\nIf you\u2019re not redirected automatically, tap below:\n</p> <div class="mt-3 flex flex-col gap-3 sm:flex-row"> <a id="waFallback" class="btn btn-accent w-full sm:w-auto" href="#" target="_blank" rel="noopener">\nOpen WhatsApp\n</a> <a id="backHome" class="btn btn-outline w-full sm:w-auto" href="/">\nBack to Home\n</a> </div> <p class="mt-6 text-xs text-slate-500">\nIf WhatsApp doesn\u2019t open, you can also call us:\n<a class="underline"', ">", '</a> </p> </div> </main> <script>\n    // --- Config ---\n    const whatsappNumber = "18632585424";\n\n    // --- Read query params ---\n    const params = new URLSearchParams(window.location.search);\n    const lang = (params.get("lang") || "en").toLowerCase();\n    const rawService = params.get("service") || "";\n    const service = rawService.trim() || (lang === "es" ? "un servicio" : "a service");\n\n    // --- UI Copy ---\n    const copy = {\n      en: {\n        heading: "Request received \u2705",\n        subtext: "We got your request. You\u2019ll be redirected to WhatsApp to confirm details.",\n        fallback: "If you\u2019re not redirected automatically, tap below:",\n        wa: "Open WhatsApp",\n        back: "Back to Home",\n        homeHref: "/",\n        msg: "Hi Roman, I just requested a quote on your website for " + service + "."\n      },\n      es: {\n        heading: "Solicitud recibida \u2705",\n        subtext: "Recibimos su solicitud. Ser\xE1 redirigido a WhatsApp para confirmar detalles.",\n        fallback: "Si no se abre autom\xE1ticamente, toque aqu\xED:",\n        wa: "Abrir WhatsApp",\n        back: "Volver al inicio",\n        homeHref: "/es/",\n        msg: "Hola Roman, acabo de solicitar un presupuesto en tu web para " + service + "."\n      }\n    };\n\n    const t = copy[lang] || copy.en;\n\n    // --- DOM refs ---\n    const heading = document.getElementById("heading");\n    const subtext = document.getElementById("subtext");\n    const fallbackText = document.getElementById("fallbackText");\n    const waFallback = document.getElementById("waFallback");\n    const backHome = document.getElementById("backHome");\n    const serviceLabel = document.getElementById("serviceLabel");\n\n    // --- Update UI ---\n    if (heading) heading.textContent = t.heading;\n    if (subtext) subtext.textContent = t.subtext;\n    if (fallbackText) fallbackText.textContent = t.fallback;\n    if (waFallback) waFallback.textContent = t.wa;\n    if (backHome) {\n      backHome.textContent = t.back;\n      backHome.setAttribute("href", t.homeHref);\n    }\n    if (serviceLabel) serviceLabel.textContent = service;\n\n    // --- Build WhatsApp URL (reliable) ---\n    const waUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(t.msg);\n\n    if (waFallback) waFallback.setAttribute("href", waUrl);\n\n    // --- Auto redirect ---\n    setTimeout(() => {\n      window.location.href = waUrl;\n    }, 650);\n  <\/script> '])), maybeRenderHead(), addAttribute(`tel:${site.phoneTel}`, "href"), site.phoneDisplay) })}`;
}, "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/thanks.astro", void 0);

const $$file = "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/thanks.astro";
const $$url = "/thanks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Thanks,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
