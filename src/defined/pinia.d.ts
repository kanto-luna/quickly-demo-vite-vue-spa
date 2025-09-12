import "pinia-plugin-persistedstate-2"

declare module "pinia" {
  export interface DefineStoreOptionsBase {
    persist?: boolean | object
  }
}