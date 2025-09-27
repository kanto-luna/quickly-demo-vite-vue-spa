<script setup lang="ts">
import { useThemeStore } from "@/stores/theme-store"

const themeStore = useThemeStore()
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
})
const emits = defineEmits(["close", "closeAll", "closeRight", "update:modelValue"])
</script>

<template>
  <div 
    class="absolute border border-gray-200 rounded min-w-[120px] shadow-lg py-1! z-[1000]"
    :class="[
      { 'hidden': !props.modelValue }, 
      themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)] text-[var(--dark-primary-color)]' : 'bg-[var(--light-primary-bg-color)] text-[var(--light-primary-color)]', 
    ]"
    :style="{ left: props.x + 'px', top: props.y + 'px' }"
  >
    <ul class="list-none m-0 p-0">
      <li
        @click="$emit('close')"
        class="px-4! py-2! cursor-pointer transition-colors duration-200 text-sm"
        :class="themeStore.theme === 'dark' ? 'hover:text-[var(--light-primary-color)] hover:bg-[var(--light-primary-bg-color)]' : 'hover:text-[var(--dark-primary-color)] hover:bg-[var(--dark-primary-bg-color)]'"
      >关闭</li>
      <li
        @click="$emit('closeAll')"
        class="px-4! py-2! cursor-pointer transition-colors duration-200 text-sm"
        :class="themeStore.theme === 'dark' ? 'hover:text-[var(--light-primary-color)] hover:bg-[var(--light-primary-bg-color)]' : 'hover:text-[var(--dark-primary-color)] hover:bg-[var(--dark-primary-bg-color)]'"
      >关闭全部</li>
      <li
        @click="$emit('closeRight')"
        class="px-4! py-2! cursor-pointer transition-colors duration-200 text-sm"
        :class="themeStore.theme === 'dark' ? 'hover:text-[var(--light-primary-color)] hover:bg-[var(--light-primary-bg-color)]' : 'hover:text-[var(--dark-primary-color)] hover:bg-[var(--dark-primary-bg-color)]'"
      >关闭右侧</li>
    </ul>
  </div>
</template>

<style scoped>
.hidden {
  @apply hidden;
}
</style>
