import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Kyf_cGGA.mjs';
import { manifest } from './manifest_X1_MDp9W.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/drive-video/_id_.astro.mjs');
const _page2 = () => import('./pages/es/privacy.astro.mjs');
const _page3 = () => import('./pages/es/terms.astro.mjs');
const _page4 = () => import('./pages/es/thanks.astro.mjs');
const _page5 = () => import('./pages/es.astro.mjs');
const _page6 = () => import('./pages/privacy.astro.mjs');
const _page7 = () => import('./pages/sitemap.xml.astro.mjs');
const _page8 = () => import('./pages/terms.astro.mjs');
const _page9 = () => import('./pages/thanks.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/drive-video/[id].ts", _page1],
    ["src/pages/es/privacy.astro", _page2],
    ["src/pages/es/terms.astro", _page3],
    ["src/pages/es/thanks.astro", _page4],
    ["src/pages/es/index.astro", _page5],
    ["src/pages/privacy.astro", _page6],
    ["src/pages/sitemap.xml.ts", _page7],
    ["src/pages/terms.astro", _page8],
    ["src/pages/thanks.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "ca9fd74f-ba93-4c4c-b824-6e5b28132cd5",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
