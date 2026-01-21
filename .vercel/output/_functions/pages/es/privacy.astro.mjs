import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_CALqXRaA.mjs';
import 'piccolore';
import { $ as $$BaseLayout, s as site } from '../../chunks/site_a4MGRwbI.mjs';
export { renderers } from '../../renderers.mjs';

const $$Privacy = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": "es", "title": "Pol\xEDtica de Privacidad | RLC Professional", "description": "Pol\xEDtica de privacidad de RLC Professional.", "canonical": `${site.meta}/es/privacy`, "ogImage": site.assets.ogImage }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="mx-auto max-w-4xl px-4 py-12 text-slate-800"> <h1 class="text-3xl font-extrabold text-brand-900">Política de Privacidad</h1> <section class="mt-8 space-y-4 text-sm leading-relaxed"> <p>
RLC Professional respeta su privacidad. Solo recopilamos información necesaria para brindar cotizaciones y servicios.
</p> <h2 class="mt-6 text-lg font-bold">Información Recopilada</h2> <p>
Nombre, teléfono, correo electrónico, fotos y detalles del servicio enviados por formularios.
</p> <h2 class="mt-6 text-lg font-bold">Uso de la Información</h2> <p>
Usamos la información únicamente para responder consultas y brindar servicios.
</p> <h2 class="mt-6 text-lg font-bold">Compartición</h2> <p>
No vendemos ni compartimos información personal.
</p> <h2 class="mt-6 text-lg font-bold">Contacto</h2> <p>
Para preguntas, escriba a <a class="underline"${addAttribute(`mailto:${site.email}`, "href")}>${site.email}</a>.
</p> </section> </main> ` })}`;
}, "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/es/privacy.astro", void 0);

const $$file = "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/es/privacy.astro";
const $$url = "/es/privacy";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Privacy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
