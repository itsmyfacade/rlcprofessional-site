import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_CALqXRaA.mjs';
import 'piccolore';
import { $ as $$BaseLayout, s as site } from '../../chunks/site_a4MGRwbI.mjs';
export { renderers } from '../../renderers.mjs';

const $$Terms = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "lang": "es", "title": "T\xE9rminos de Servicio | RLC Professional", "description": "T\xE9rminos de servicio de RLC Professional para pintura, lavado a presi\xF3n y concreto.", "canonical": `${site.meta}/es/terms`, "ogImage": site.assets.ogImage }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="mx-auto max-w-4xl px-4 py-12 text-slate-800"> <h1 class="text-3xl font-extrabold text-brand-900">Términos de Servicio</h1> <p class="mt-2 text-sm text-slate-600">Última actualización: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</p> <section class="mt-8 space-y-4 text-sm leading-relaxed"> <p>
Al usar este sitio web o solicitar servicios de RLC Professional, usted acepta los siguientes términos.
</p> <h2 class="mt-6 text-lg font-bold">Servicios</h2> <p>
RLC Professional ofrece servicios de pintura, lavado a presión, concreto y servicios exteriores relacionados.
        Todas las cotizaciones son estimadas y pueden cambiar después de una evaluación en sitio.
</p> <h2 class="mt-6 text-lg font-bold">Programación y Pagos</h2> <p>
Las citas están sujetas a disponibilidad y condiciones climáticas. Los términos de pago se comunicarán antes
        de comenzar el trabajo.
</p> <h2 class="mt-6 text-lg font-bold">Responsabilidad</h2> <p>
RLC Professional no se hace responsable por daños preexistentes, problemas estructurales ocultos o retrasos
        causados por clima u otras circunstancias fuera de nuestro control.
</p> <h2 class="mt-6 text-lg font-bold">Uso del Sitio</h2> <p>
No está permitido el uso indebido del sitio ni la copia de contenido sin autorización.
</p> <h2 class="mt-6 text-lg font-bold">Contacto</h2> <p>
Para preguntas, contáctenos en <a class="underline"${addAttribute(`mailto:${site.email}`, "href")}>${site.email}</a>.
</p> </section> </main> ` })}`;
}, "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/es/terms.astro", void 0);

const $$file = "C:/Users/Badte/Desktop/ML/Projects/Client Projects/RLC/src/pages/es/terms.astro";
const $$url = "/es/terms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Terms,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
