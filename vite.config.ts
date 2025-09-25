import path from "path"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { defineConfig } from "vite"
import { fileURLToPath } from "url"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  base: "/quickly-demo-vite-vue-spa/",
  plugins: [
    vue(), 
    tailwindcss(),
    AutoImport({
      imports: [
        "vue",
        {
          "naive-ui": [
            "useMessage",
            "useDialog",
            "useLoadingBar",
            "useNotification",
          ]
        }
      ]
    }),
    Components({
      resolvers: [
        NaiveUiResolver()
      ]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  }
})
