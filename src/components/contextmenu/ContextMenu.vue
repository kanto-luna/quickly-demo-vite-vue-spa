<script setup lang="ts">
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
    class="absolute bg-white border border-gray-200 rounded min-w-[120px] shadow-lg py-1! z-[1000]"
    :class="{ 'hidden': !props.modelValue }"
    :style="{ left: props.x + 'px', top: props.y + 'px' }"
  >
    <ul class="list-none m-0 p-0">
      <li
        @click="$emit('close')"
        class="px-4! py-2! cursor-pointer transition-colors duration-200 text-sm hover:bg-gray-100"
      >关闭</li>
      <li
        @click="$emit('closeAll')"
        class="px-4! py-2! cursor-pointer transition-colors duration-200 text-sm hover:bg-gray-100"
      >关闭全部</li>
      <li
        @click="$emit('closeRight')"
        class="px-4! py-2! cursor-pointer transition-colors duration-200 text-sm hover:bg-gray-100"
      >关闭右侧</li>
    </ul>
  </div>
</template>

<style scoped>
.hidden {
  @apply hidden;
}
</style>
