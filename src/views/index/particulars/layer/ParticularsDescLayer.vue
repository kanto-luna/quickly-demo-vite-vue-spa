<script lang="ts" setup>
import type { PropType } from "vue"
import { LayLayer } from "@layui/layer-vue"

import DataDescPanel from "@/components/data/DataDescPanel.vue"
import LayerCloseBtn from "@/components/button/LayerCloseBtn.vue"
import type { DataDescTimeline, DataDescSections } from "@/defined/component-prop"
import { useThemeStore } from "@/stores/theme-store"

const themeStore = useThemeStore()
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: "企业详情",
  },
  timeline: {
    type: Object as PropType<DataDescTimeline>,
    required: false,
    default: undefined,
  },
  description: {
    type: Array as PropType<DataDescSections>,
    required: true,
  },
  teleport: {
    type: String,
    required: false,
    default: "body",
  },
  zIndex: {
    type: Number,
    required: false,
    default: 500,
  },
})
const emits = defineEmits(["update:modelValue"])
</script>

<template>
  <lay-layer 
    v-model:model-value="props.modelValue"
    @close="emits('update:modelValue', false)"
    :title="title" 
    :teleport="teleport"
    :z-index="zIndex"
    :area="['100%', '100%']"
    :title-style="{ color: themeStore.theme === 'dark' ? 'var(--dark-primary-color)' : 'var(--light-primary-color)', backgroundColor: themeStore.theme === 'dark' ? 'var(--dark-secondary-bg-color)' : 'var(--light-secondary-bg-color)' }"
    :layer-classes="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]!' : 'bg-[var(--light-secondary-bg-color)]!'"
    resize
  >
    <template #default>
      <div class="min-w-[800px] w-full" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]' : 'bg-[var(--light-secondary-bg-color)]'">
        <layer-close-btn class="m-[10px]!" @click="emits('update:modelValue', false)" />
        <data-desc-panel :timeline="timeline" :descriptions="description" />
      </div>
    </template>  
  </lay-layer>
</template>

<style scoped>
.description label {
  @apply text-[#4E5969] w-[5rem] select-none;
}

.description span {
  @apply flex-grow-1 border-b border-[#D9D9D9] select-none;
}

:deep(.n-timeline-item) {
  flex: 1;
}
</style>
