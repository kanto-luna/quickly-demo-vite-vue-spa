<script lang="ts" setup>
import { type PropType } from "vue"
import type { DataDescSections, DataDescTimeline } from "@/defined/component-prop"

const props = defineProps({
  timeline: {
    type: Object as PropType<DataDescTimeline | undefined>,
    required: false,
    default: undefined,
  },
  descriptions: {
    type: Array as PropType<DataDescSections>,
    required: true,
  }
})
</script>

<template>
  <div class="w-full h-full flex flex-col p-[20px]!">
    <slot name="timeline">
      <n-timeline v-if="props.timeline" v-bind="props.timeline?.props">
        <n-timeline-item v-for="item in props.timeline?.items" v-bind="item" />
      </n-timeline>
    </slot>
    <div class="w-full flex flex-col mt-[20px]!">
      <div v-for="(description, descIndex) in props.descriptions" :key="`description-${descIndex}`" class="w-full flex flex-col">
        <h3 v-if="description.title" class="text-lg font-bold">{{ description.title }}</h3>
        <div 
          class="w-full grid grid-rows-auto gap-[20px] my-[20px]!"
          :class="description.cols ? `grid-cols-${description.cols}` : 'grid-cols-2'"
        >
          <div
            v-for="(descDetail, index) in description.content"
            :key="`description-${descIndex}-${index}`"
            class="flex description"
            :class="descDetail.span ? `col-span-${descDetail.span}` : ''"
          >
            <label v-if="descDetail.label">{{ descDetail.label }}</label>
            <component v-if="descDetail.value && typeof descDetail.value === 'object'" :is="descDetail.value" />
            <span v-else>{{ descDetail.value }}</span>
          </div>
        </div>
      </div>
      <slot name="extraDescription" />
    </div>
  </div>
</template>

<style scoped>
.description label {
  @apply text-[#4E5969] w-[5rem] select-none;
}

.description span {
  @apply flex-grow-1 border-b border-[#D9D9D9] select-none;
}

.col-span-2 {
  @apply col-span-2;
}

.col-span-3 {
  @apply col-span-3;
}

.col-span-4 {
  @apply col-span-4;
}
</style>