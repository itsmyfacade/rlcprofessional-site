import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CALqXRaA.mjs';
import 'piccolore';
import { $ as $$BaseLayout, s as site } from '../../chunks/site_a4MGRwbI.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Thanks = createComponent(($$result, $$props, $$slots) => {
  const canonical = `${site.meta}/es/thanks`;
  const title = "Solicitud Recibida | RLC Professional";
  const description = "Gracias por solicitar un presupuesto. Ser\xE1 redirigido a WhatsApp para confirmar detalles.";
  const ogImage = site.assets?.ogImage ?? "/assets/og.jpg";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": "es", "title": title, "description": description, "canonical": canonical, "ogImage": ogImage }, { "default": ($$result2) => renderTemplate(_a || (_a = __template(['  <script>\n    {`\n      const url = new URL(window.location.href);\n      url.pathname = "/thanks";\n      if (!url.searchParams.get("lang")) url.searchParams.set("lang", "es");\n      window.location.replace(url.toString());\n    `}\n  <\/script> ', '<main class="mx-auto max-w-3xl px-4 py-14"> <div class="card"> <h1 class="text-2xl font-extrabold text-brand-900">Solicitud recibida \u2705</h1> <p class="mt-2 text-slate-700">Redirigiendo a WhatsApp\u2026</p> <p class="mt-4 text-sm text-slate-600">\nSi no se abre autom\xE1ticamente, vuelva atr\xE1s y use el bot\xF3n de WhatsApp.\n</p> </div> </main> '], ['  <script>\n    {\\`\n      const url = new URL(window.location.href);\n      url.pathname = "/thanks";\n      if (!url.searchParams.get("lang")) url.searchParams.set("lang", "es");\n      window.location.replace(url.toString());\n    \\`}\n  <\/script> ', '<main class="mx-auto max-w-3xl px-4 py-14"> <div class="card"> <h1 class="text-2xl font-extrabold text-brand-900">Solicitud recibida \u2705</h1> <p class="mt-2 text-slate-700">Redirigiendo a WhatsApp\u2026</p> <p class="mt-4 text-sm text-slate-600">\nSi no se abre autom\xE1ticamente, vuelva atr\xE1s y use el bot\xF3n de WhatsApp.\n</p> </div> </main> '])), maybeRenderHead()) })}`;
}, "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/es/thanks.astro", void 0);

const $$file = "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/es/thanks.astro";
const $$url = "/es/thanks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Thanks,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
