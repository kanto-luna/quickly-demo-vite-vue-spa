<script lang="ts" setup>
import { ref, watch } from "vue"
import type { FormRules } from "naive-ui"
import type { PropType } from "vue"
import { ChevronUp16Filled } from "@vicons/fluent"

import FileUpdate from "@/components/form/FileUpdate.vue"
import LayerCloseBtn from "@/components/button/LayerCloseBtn.vue"
import type { ParticularCustomerFormItems } from "@/defined/particulars"

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: false,
    default: "编辑客户资料",
  },
  editData: {
    type: Object as PropType<ParticularCustomerFormItems>,
    required: false,
    default: undefined,
  },
  teleport: {
    type: String,
    required: false,
    default: "body",
  },
})
const emits = defineEmits(['update:model-value'])

const editLayerRef = ref<HTMLElement | null>(null)
// 基本信息
const baseFormValues = ref({
  companyName: "",
  reportLine: "",
  industry: "",
  operatingLiscense: "",
  legalPersonIdCard: "",
  script: "",
})
const baseFormRules = ref<FormRules>({
  companyName: [
    { required: true, message: "请输入公司名称" },
  ],
  reportLine: [
    { required: true, message: "请输入报备线路" },
  ],
  industry: [
    { required: true, message: "请输入所属行业" },
  ],
  operatingLiscense: [
    { required: true, message: "请输入营业执照" },
  ],
  legalPersonIdCard: [
    { required: true, message: "请输入法人身份证" },
  ],
  script: [
    { required: true, message: "请输入话术" },
  ],
})
// 合同资料
const contractFormValues = ref({
  price: "",
  payment: "",
  preparedContract: "",
})
const contractFormRules = ref<FormRules>({
  price: [
    { required: true, message: "请输入套餐价格" },
  ],
  payment: [
    { required: true, message: "请输入支付费用" },
  ],
  preparedContract: [
    { required: true, message: "请输入合同预览" },
  ],
})
// 线路资料（复数）
const lineParticularsFormValueList = ref([
  {
    lineName: "",
    lineFile: "",
  },
])
const lineParticularsFormRules = ref<FormRules>({
  lineName: [
    { required: true, message: "请输入线路名称" },
  ],
  lineFile: [
    { required: true, message: "请输入线路文件" },
  ],
})

const scrollToTop = () => {
  editLayerRef.value?.parentElement?.parentElement?.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

watch(() => props.modelValue, () => {
  if (props.editData) {
    baseFormValues.value = props.editData.base
    contractFormValues.value = props.editData.contract
    lineParticularsFormValueList.value = props.editData.lines
  }
}, { immediate: true })
</script>

<template>
  <lay-layer
    v-model:model-value="props.modelValue"
    @close="emits('update:model-value', false)"
    :area="['100%', '100%']"
    :teleport="teleport"
    title="客户资料编辑"
  >
    <template #default>
      <div class="w-full h-full box-border p-[10px]! flex flex-col relative" ref="editLayerRef">
        <layer-close-btn class="my-[10px]! ml-[40px]!" @click="emits('update:model-value', false)" />
        <div class="flex-grow-1 overflow-y-auto">
          <div class="section">
            <h3 class="ml-[40px]!">基本信息</h3>
            <div class="w-full">
              <n-form 
                label-placement="left" 
                label-align="right" 
                label-width="200px"
                :rules="baseFormRules"
              >
                <n-form-item label="公司名称" path="companyName">
                  <n-input v-model:value="baseFormValues.companyName" />
                </n-form-item>
                <n-form-item label="报备线路" path="reportLine">
                  <n-input v-model:value="baseFormValues.reportLine" />
                </n-form-item>
                <n-form-item label="所属行业" path="industry">
                  <n-input v-model:value="baseFormValues.industry" />
                </n-form-item>
                <n-form-item label="营业执照" path="operatingLiscense">
                  <n-input v-model:value="baseFormValues.operatingLiscense" />
                </n-form-item>
                <n-form-item label="法人身份证" path="legalPersonIdCard">
                  <n-input v-model:value="baseFormValues.legalPersonIdCard" />
                </n-form-item>
                <n-form-item label="话术" path="script">
                  <n-input v-model:value="baseFormValues.script" type="textarea" />
                </n-form-item>
              </n-form>
            </div>
          </div>
          <div class="section">
            <h3 class="ml-[40px]!">合同资料</h3>
            <div class="w-full">
              <n-form label-placement="left" label-align="right" label-width="200px" :rules="contractFormRules">
                <n-form-item label="套餐价格" path="price">
                  <n-input v-model:value="contractFormValues.price" />
                </n-form-item>
                <n-form-item label="支付费用" path="payment">
                  <n-input v-model:value="contractFormValues.payment" />
                </n-form-item>
                <n-form-item label="合同预览" path="preparedContract">
                  <file-update v-model:value="contractFormValues.preparedContract" />
                </n-form-item>
              </n-form>
            </div>
          </div>
          <div v-for="(item, index) in lineParticularsFormValueList" :key="`line-particulars-${index}`" class="section">
            <h3 class="ml-[40px]!">线路资料</h3>
            <div class="w-full">
              <n-form label-placement="left" label-align="right" label-width="200px" :rules="lineParticularsFormRules">
                <n-form-item label="线路名称" path="lineName">
                  <n-input v-model:value="item.lineName" />
                </n-form-item>
                <n-form-item label="线路文件" path="lineFile">
                  <file-update v-model:value="item.lineFile" />
                </n-form-item>
              </n-form>
            </div>
          </div>
        </div>
        <div class="w-full mt-[10px]! flex-shrink-0 flex justify-center">
          <n-button type="primary">保存</n-button>
        </div>
        <div class="sticky w-[43px] h-[43px] rounded-[50%] left-[100%] bottom-[30px] bg-[#409EFF] flex items-center justify-center cursor-pointer" @click="scrollToTop">
          <n-icon size="20" color="#FFFFFF">
            <chevron-up-16-filled />
          </n-icon>
        </div>
      </div>
    </template>
  </lay-layer>
</template>

<style scoped>
.section {
  @apply w-full;
}

h3 {
  @apply text-[#101010] text-[16px] leading-[23px];
}
</style>