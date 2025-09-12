<script lang="ts" setup>
import { NResult, NButton } from "naive-ui"
import { useRouter } from "vue-router"

const router = useRouter()

const goHome = async () => {
  await router.push("/")
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
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