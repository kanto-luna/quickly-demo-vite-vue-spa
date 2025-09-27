<script lang="ts" setup>
import { NResult, NButton } from "naive-ui"
import { useRouter } from "vue-router"

import { useThemeStore } from "@/stores/theme-store"

const router = useRouter()
const themeStore = useThemeStore()

const goHome = async () => {
  await router.push("/")
}
</script>

<template>
  <div class="h-screen flex items-center justify-center" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-primary-bg-color)]' : 'bg-[var(--light-primary-bg-color)]'">
    <n-result
      status="404"
      title="404"
    >
      <template #default>
        <span class="text-center">
          您似乎走错路了，该页面不存在
        </span>
      </template>
      <template #footer>
        <n-button @click="goHome">
          回到首页
        </n-button>
      </template>
    </n-result>
  </div>
</template>

<style scoped>
</style>