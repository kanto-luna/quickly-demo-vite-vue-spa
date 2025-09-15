import "vfonts/FiraCode.css"
import "@layui/layer-vue/lib/index.css"
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css"
import ContextMenu from "@imengyu/vue3-context-menu"
import Layer from "@layui/layer-vue"
import { createApp } from "vue"
import { createPinia } from "pinia"
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2"

import "@/style.css"
import App from "@/App.vue"
import router from "@/routes"

const persistedStatePlugin = createPersistedStatePlugin({
  storage: localStorage
})
const pinia = createPinia()
const app = createApp(App)
pinia.use(persistedStatePlugin)
app.use(pinia)
app.use(router)
app.use(ContextMenu)
app.use(Layer)
app.mount("#app")
