/// <reference types="vite/client" />
/// <reference types="pinia-plugin-persistedstate-2" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<unknown, unknown, unknown>
  export default component
}
