<script lang="ts" setup>
import type { PropType } from "vue"
import { LayLayer } from "@layui/layer-vue"
import DataDescPanel from "@/components/data/DataDescPanel.vue"
import type { DataDescTimeline, DataDescSections } from "@/defined/component-prop"

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
    resize
  >
    <template #default>
      <div class="min-w-[800px] w-full">
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
