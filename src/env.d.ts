/// <reference types="vite/client" />

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare interface ImportMetaEnv {
  readonly BASE_URL: string;
}
