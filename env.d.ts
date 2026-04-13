/// <reference types="vite/client" />
/// <reference types="node" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="node_modules/vue-i18n/dist/vue-i18n.d.ts" />
declare module 'vue-i18n'
declare module 'ramda'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, unknown>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_DONATE_USDT_ADDRESS?: string
  readonly VITE_TAX_FREE_THRESHOLD_UAH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}