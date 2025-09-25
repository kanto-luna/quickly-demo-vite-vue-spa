<script setup lang="ts">
import Upload from "@/assets/views/index/contract/upload.svg"
import Drag from "@/assets/views/index/contract/drag.svg"

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: "新增合同模板",
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
    :title="props.title" 
    :teleport="teleport"
    resize
  >
    <template #default>
      <div class="min-w-[800px] h-full">
        <n-card>
          <div class="w-full px-[10px]!">
            <div class="mb-[10px]!">
              <h2>合同模板上传</h2>
              <div class="flex items-start gap-[30px] mt-[10px]!">
                <n-upload class="w-[300px]!">
                  <div class="w-[300px] h-[200px] flex items-center justify-center rounded-[8px] border-[1px] border-[#1F63FF] border-dashed cursor-pointer bg-[rgba(212,227,252,0.32)]">
                    <img :src="Upload" alt="上传" class="w-[52px] h-[52px]">
                  </div>
                </n-upload>
                <div class="text-[#6C6C6C] text-[18px] leading-[36px]">
                  <div>文件大小不超过：20Mb</div>
                  <div>最多上传：1份</div>
                  <div>上传类型格式：.doc、.docx、.pdf</div>
                  <div>材料说明：提交确认好的合同模板</div>
                </div>
              </div>
            </div>
            <div class="section">
              <img :src="Drag" alt="拖拽">
              <h2>合同字段设置</h2>
            </div>
            <div class="section">
              <img :src="Drag" alt="拖拽">
              <h2>点击添加标题</h2>
            </div>
          </div>
        </n-card>
      </div>
    </template>
  </lay-layer>
</template>

<style scoped>
h2 {
  @apply text-[#101010] text-[16px] leading-[23px];
}

.section {
  @apply mb-[10px]! flex items-center gap-[10px];
}

.section img {
  -webkit-user-drag: none;
  @apply w-[18px] h-[18px] cursor-move;
}
</style>