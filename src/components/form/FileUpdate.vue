<script lang="ts" setup>
// import Upload from "@/assets/views/index/contract/upload.svg"
</script>

<template>
  <div class="mb-[10px]!">
    <div class="flex items-start gap-[30px] mt-[10px]!">
      <n-upload class="w-[300px]!">
        <div class="w-[300px] h-[200px] flex items-center justify-center rounded-[8px] border-[1px] border-[#1F63FF] border-dashed cursor-pointer bg-[rgba(212,227,252,0.32)]">
          <img src="@/assets/views/index/contract/upload.svg" alt="上传" class="w-[52px] h-[52px]">
        </div>
      </n-upload>
      <slot name="description">
        <div class="text-[#6C6C6C] text-[18px] leading-[36px]">
          <div>文件大小不超过：20Mb</div>
          <div>最多上传：1份</div>
          <div>上传类型格式：.doc、.docx、.pdf</div>
          <div>材料说明：提交确认好的合同模板</div>
          <slot name="extraDescription" />
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped>

</style>