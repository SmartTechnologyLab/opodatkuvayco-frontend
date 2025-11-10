/// <reference types="vite/client" />
/// <reference types="node" />
/// <reference path="node_modules/vue-i18n/dist/vue-i18n.d.ts" />
declare module 'vue-i18n'
declare module 'ramda'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}