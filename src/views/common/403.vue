<script lang="ts" setup>
import { NResult, NButton } from "naive-ui"
import { useRouter } from "vue-router"
import { computed } from "vue"

import { useAuthStore } from "@/stores/auth-store"
import { useThemeStore } from "@/stores/theme-store"

const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore()

const token = computed(() => authStore.token)

const goHome = async () => {
  await router.push("/")
}

const goLogin = async () => {
  await router.push("/login")
}
</script>

<template>
  <div class="h-screen flex items-center justify-center" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-primary-bg-color)]' : 'bg-[var(--light-primary-bg-color)]'">
    <n-result
      status="403"
      title="403"
    >
      <template #default>
        <div class="flex flex-col">
          <span class="text-center">
            {{ token ? "您没有权限访问该页面" : "您尚未登录" }}
          </span>
          <span class="text-center">
            放轻松，总有些门是对你紧闭的
          </span>
        </div>
      </template>
      <template #footer>
        <n-button @click="() => token ? goHome() : goLogin()">
          {{ token ? "回到首页" : "前往登录" }}
        </n-button>
      </template>
    </n-result>
  </div>
</template>

<style scoped>
</style>