<script lang="ts" setup>
import type { PropType } from "vue"
import { LayLayer } from "@layui/layer-vue"
import {
  NCard,
  NTimeline,
  NTimelineItem,
  NIcon,
} from "naive-ui"
import { ArrowBackUp } from "@vicons/tabler"

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: "合同详情",
  },
  description: {
    type: Array as PropType<{ label: string, key: string, value: string | number }[]>,
    required: false,
    default: () => ([]),
  },
  timeline: {
    type: Array as PropType<{ 
      type: "success" | "error" | "warning" | "info", 
      title: string, 
      content?: string, 
      time?: string 
    }[]>,
    required: false,
    default: () => ([]),
  },
  teleport: {
    type: String,
    required: false,
    default: "body",
  }
})
const emits = defineEmits(["update:modelValue"])
</script>

<template>
  <lay-layer 
    v-model:model-value="props.modelValue"
    @close="emits('update:modelValue', false)"
    :title="title" 
    :teleport="teleport"
    resize
  >
    <template #default>
      <div class="min-w-[800px] w-full">
        <n-card>
          <div class="w-full flex items-center gap-[10px]">
            <n-icon class="cursor-pointer" @click="emits('update:modelValue', false)">
              <ArrowBackUp />
            </n-icon>
            <span class="text-[#4E5969] cursor-pointer" @click="emits('update:modelValue', false)">返回</span>
          </div>
          <n-timeline class="w-full mt-[20px]! select-none" horizontal>
            <n-timeline-item 
              v-for="item in props.timeline"
              :key="item.title"
              :type="item.type"
              :title="item.title"
              :content="item.content"
              :time="item.time"
            />
          </n-timeline>
          <div class="w-full grid grid-cols-2 grid-rows-2 gap-[20px] my-[20px]!">
            <div 
              v-for="(desc, index) in props.description"
              :key="desc.key"
              :class="`col-start-${(index % 2) + 1} col-end-${(index % 2) + 2} row-start-${Math.floor(index / 2) + 1} row-end-${Math.floor(index / 2) + 2}`"
              class="flex description"
            >
              <label>{{ desc.label }}</label>
              <span>{{ desc.value }}</span>
            </div>
          </div>
          <div class="flex min-h-[400px] h-auto description">
            <label>合同内容</label>
            <embed class="flex-grow-1" src="https://philpapers.org/archive/sinpg" />
          </div>
        </n-card>
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