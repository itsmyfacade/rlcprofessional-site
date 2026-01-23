import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_Ci0mos5O.mjs';
import 'piccolore';
import { $ as $$BaseLayout, s as site } from '../chunks/site_DnBBxJTs.mjs';
import { $ as $$Nav } from '../chunks/Nav_VhNE4QVf.mjs';
import { $ as $$WhatsAppFab, a as $$Footer, b as $$GalleryLive, c as $$QuotesForm, d as $$Services, e as $$Hero, g as getT } from '../chunks/GalleryLive_8brZ_Ia5.mjs';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const lang = "es";
  const t = getT(lang);
  const canonical = "https://RLCprofessional.com/es/";
  const title = "Pintores en Haines City | RLC Professional";
  const description = "Pintura interior/exterior, pressure washing y reparaci\xF3n de goteras en Haines City, Kissimmee y Davenport. Estimados r\xE1pidos.";
  ({
    "name": site.brandName,
    "image": `https://RLCprofessional.com${site.assets.ogImage}`,
    "telephone": site.phoneTel});
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": lang, "title": title, "description": description, "canonical": canonical, "ogImage": site.assets.ogImage }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", " ", " ", " ", " ", " ", " ", ' <script type="application/ld+json">\n    {JSON.stringify(schema)}\n  <\/script> '])), renderComponent($$result2, "Nav", $$Nav, { "t": t, "site": site, "lang": lang }), renderComponent($$result2, "Hero", $$Hero, { "t": t, "site": site }), renderComponent($$result2, "Services", $$Services, { "t": t }), renderComponent($$result2, "QuotesForm", $$QuotesForm, { "t": t, "formUrl": site.tallyFormUrlEs }), renderComponent($$result2, "GalleryLive", $$GalleryLive, { "t": t, "site": site, "lang": lang }), renderComponent($$result2, "Footer", $$Footer, { "site": site, "t": t }), renderComponent($$result2, "WhatsAppFab", $$WhatsAppFab, { "site": site })) })}`;
}, "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/es/index.astro", void 0);

const $$file = "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/es/index.astro";
const $$url = "/es";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
