import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_Ci0mos5O.mjs';
import 'piccolore';
import { $ as $$BaseLayout, s as site } from '../chunks/site_DnBBxJTs.mjs';
export { renderers } from '../renderers.mjs';

const $$Terms = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": "en", "title": "Terms of Service | RLC Professional", "description": "Terms of Service for RLC Professional Painting, Pressure Washing, and Concrete Services.", "canonical": `${site.meta}/terms`, "ogImage": site.assets.ogImage }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="mx-auto max-w-4xl px-4 py-12 text-slate-800"> <h1 class="text-3xl font-extrabold text-brand-900">Terms of Service</h1> <p class="mt-2 text-sm text-slate-600">Last updated: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</p> <section class="mt-8 space-y-4 text-sm leading-relaxed"> <p>
By using this website or requesting services from RLC Professional, you agree to the following terms.
</p> <h2 class="mt-6 text-lg font-bold">Services</h2> <p>
RLC Professional provides painting, pressure washing, concrete, and related exterior services. All quotes
        are estimates and may change after an on-site evaluation.
</p> <h2 class="mt-6 text-lg font-bold">Scheduling & Payments</h2> <p>
Appointments are subject to availability and weather conditions. Payment terms will be communicated before
        work begins. Failure to pay may result in service delays or cancellation.
</p> <h2 class="mt-6 text-lg font-bold">Liability</h2> <p>
RLC Professional is not responsible for pre-existing damage, hidden structural issues, or delays caused by
        weather, supplier issues, or circumstances beyond our control.
</p> <h2 class="mt-6 text-lg font-bold">Website Use</h2> <p>
You may not misuse this website, attempt to access restricted systems, or copy content without permission.
</p> <h2 class="mt-6 text-lg font-bold">Contact</h2> <p>
For questions, contact us at <a class="underline"${addAttribute(`mailto:${site.email}`, "href")}>${site.email}</a>.
</p> </section> </main> ` })}`;
}, "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/terms.astro", void 0);

const $$file = "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/terms.astro";
const $$url = "/terms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Terms,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
