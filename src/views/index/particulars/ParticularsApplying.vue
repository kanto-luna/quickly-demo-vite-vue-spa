<script setup lang="ts">
import { ref } from 'vue'
import { NInput } from 'naive-ui'

import DataTablePanel from '@/components/data/DataTablePanel.vue'
import type { FormItems, TableProps } from '@/defined/component-prop'
import type { ParticularApplying } from '@/defined/particulars'

const formValues = ref({
  companyName: '',
  employeeName: '',
  status: '',
})
const formItems = ref<FormItems>([
  {
    key: 'name',
    label: '姓名',
    component: NInput,
  },
  {
    key: 'employeeName',
    label: '所属销售',
    component: NInput,
  },
  {
    key: 'status',
    label: '状态',
    component: NInput,
  }
])
const tableProps = ref<TableProps<ParticularApplying>>({
  columns: [
    { key: 'companyName', title: '企业名称' },
    { key: 'employeeName', title: '所属销售' },
    { key: 'industry', title: '行业' },
    { key: 'status', title: '状态' },
    { key: 'createAt', title: '创建时间' },
    { key: 'operations', title: '操作' },
  ],
  data: [],
  pagination: {
    page: 1,
    pageSize: 10,
    pageCount: 1,
  },
})
</script>

<template>
  <div class="w-full h-full relative">
    <data-table-panel :form-items="formItems" :table-props="tableProps" :form-values="formValues" />
  </div>
</template>

<style scoped>
</style>
