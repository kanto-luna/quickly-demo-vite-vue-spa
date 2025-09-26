<script lang="ts" setup>
import { ArrowBackUp } from "@vicons/tabler"

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
      <span class="text-[#4E5969]">{{ props.text }}</span>
    </slot>
  </div>
</template>

<style scoped>

</style>