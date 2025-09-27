<script lang="ts" setup>
import DataDescPanel from '@/components/data/DataDescPanel.vue'
import LayerCloseBtn from '@/components/button/LayerCloseBtn.vue'
import type { DataDescTimeline, DataDescSections } from '@/defined/component-prop'
import { useThemeStore } from "@/stores/theme-store"

const themeStore = useThemeStore()
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  timeline: {
    type: Object as PropType<DataDescTimeline>,
    required: false,
    default: undefined,
  },
  descriptions: {
    type: Array as PropType<DataDescSections>,
    required: false,
    default: undefined,
  }
})
const emits = defineEmits(["update:modelValue"])
</script>

<template>
  <lay-layer 
    v-model:model-value="props.modelValue"
    @close="emits('update:modelValue', false)"
    :title-style="{ color: themeStore.theme === 'dark' ? 'var(--dark-primary-color)' : 'var(--light-primary-color)', backgroundColor: themeStore.theme === 'dark' ? 'var(--dark-secondary-bg-color)' : 'var(--light-secondary-bg-color)' }"
    :layer-classes="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]!' : 'bg-[var(--light-secondary-bg-color)]!'"
  >
    <template #default>
      <div class="min-w-[800px] w-full" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]' : 'bg-[var(--light-secondary-bg-color)]'">
        <layer-close-btn @click="emits('update:modelValue', false)" text="场景审核" />
      </div>
      <data-desc-panel :timeline="timeline" :descriptions="descriptions" />
    </template>
  </lay-layer>
</template>

<style scoped></style>