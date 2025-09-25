<script lang="ts" setup>
import { 
  NCard,
  NButton,
  NDataTable,
  NForm,
  NFormItem,
} from "naive-ui"
import type { PropType } from "vue"
import type { FormItems, TableProps } from "@/defined/component-prop"

const props = defineProps({
  formValues: {
    type: Object as PropType<any>,
    required: false,
    default: () => ({})
  },
  formItems: {
    type: Array as PropType<FormItems>,
    required: false,
    default: () => ([])
  },
  tableProps: {
    type: Object as PropType<TableProps<any>>,
    required: false,
    default: () => ({
      columns: [],
      data: [],
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 1,
      },
    })
  },
})
const emits = defineEmits(["search", "reset"])

const handleSearch = () => {
  emits("search")
}

const handleReset = () => {
  emits("reset")
}
</script>

<template>
  <div class="w-full h-full flex flex-col gap-[10px] p-[10px]! bg-[#F7F8FA]">
    <!-- 数据表单 -->
    <n-card>
      <div class="w-full flex items-center gap-[10px]">
        <n-form label-placement="left" class="flex-grow-1 flex-wrap" inline>
          <n-form-item v-for="item in props.formItems" :key="`form-item-${item.label}`" :label="item.label" class="flex-grow-1 flex-shrink-0 min-w-[100px] max-w-[30%]">
            <component :is="item.component" v-model:value="props.formValues[item.key as string]" />
          </n-form-item>
        </n-form>
        <div class="flex-shrink-0 flex gap-[10px] min-w-[100px]">
          <n-button type="primary" @click="handleSearch">查询</n-button>
          <n-button @click="handleReset">重置</n-button>
        </div>
      </div>
    </n-card>
    <n-card class="flex-grow-1">
      <div class="h-full flex flex-col gap-[10px]">
        <div class="flex-shrink-0">
          <slot name="table-header" />
        </div>
        <div class="flex-grow-1">
          <n-data-table :columns="tableProps.columns" :data="tableProps.data" :pagination="tableProps.pagination" class="h-full" />
        </div>
      </div>
    </n-card>
  </div>
</template>

<style scoped>
</style>