// @lucide/vue ships its type declarations at dist/lucide-vue.d.ts but does not
// declare a `types`/`exports` field, so TypeScript cannot resolve them from the
// bare specifier. Re-export them here so `import { Menu } from '@lucide/vue'`
// type-checks while Vite still bundles the runtime via the package `module` field.
declare module '@lucide/vue' {
  export * from '@lucide/vue/dist/lucide-vue'
}
