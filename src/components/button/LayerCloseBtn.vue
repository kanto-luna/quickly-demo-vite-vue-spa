<script lang="ts" setup>
import { ArrowBackUp } from "@vicons/tabler"
import { useThemeStore } from "@/stores/theme-store"

const themeStore = useThemeStore()
const props = defineProps({
  text: {
    type: String,
    required: false,
    default: "返回"
  }
})
const emits = defineEmits(["click"])
</script>

<template>
  <div class="flex items-center gap-[10px] cursor-pointer" @click="emits('click')">
    <n-icon>
      <arrow-back-up />
    </n-icon>
    <slot name="default">
      <span :class="themeStore.theme === 'dark' ? 'text-[var(--dark-primary-color)]' : 'text-[var(--light-primary-color)]'">{{ props.text }}</span>
    </slot>
  </div>
</template>

<style scoped>

</style>