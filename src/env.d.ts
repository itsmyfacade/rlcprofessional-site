/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_OWNER_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
