import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute } from '../chunks/astro/server_Ci0mos5O.mjs';
import 'piccolore';
import { $ as $$BaseLayout, s as site } from '../chunks/site_DnBBxJTs.mjs';
export { renderers } from '../renderers.mjs';

const $$Privacy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": "en", "title": "Privacy Policy | RLC Professional", "description": "Privacy policy explaining how RLC Professional handles customer information.", "canonical": `${site.meta}/privacy`, "ogImage": site.assets.ogImage }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="mx-auto max-w-4xl px-4 py-12 text-slate-800"> <h1 class="text-3xl font-extrabold text-brand-900">Privacy Policy</h1> <section class="mt-8 space-y-4 text-sm leading-relaxed"> <p>
RLC Professional respects your privacy. We only collect information necessary to provide quotes and services.
</p> <h2 class="mt-6 text-lg font-bold">Information Collected</h2> <p>
Name, phone number, email, photos, and service details submitted through our forms.
</p> <h2 class="mt-6 text-lg font-bold">Use of Information</h2> <p>
Information is used only to respond to inquiries, provide estimates, and deliver services.
</p> <h2 class="mt-6 text-lg font-bold">Sharing</h2> <p>
We do not sell or share personal information with third parties.
</p> <h2 class="mt-6 text-lg font-bold">Contact</h2> <p>
Questions? Email <a class="underline"${addAttribute(`mailto:${site.email}`, "href")}>${site.email}</a>.
</p> </section> </main> ` })}`;
}, "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/privacy.astro", void 0);

const $$file = "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/privacy.astro";
const $$url = "/privacy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Privacy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
