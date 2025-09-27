<script lang="ts" setup>
import { computed } from "vue"
import { 
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider, 
  NLoadingBarProvider,
  NModalProvider,
  zhCN, 
  dateZhCN,
  darkTheme
} from "naive-ui"
import { RouterView } from "vue-router"
import { useThemeStore } from "@/stores/theme-store"

const themeStore = useThemeStore()

const theme = computed(() => themeStore.theme === "dark" ? darkTheme : undefined)
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="theme"
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <n-notification-provider>
          <n-modal-provider>
            <router-view />
          </n-modal-provider>
        </n-notification-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
