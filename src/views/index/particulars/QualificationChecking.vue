<script lang="ts" setup>
import { ref } from "vue"
import { NInput } from "naive-ui"

import DataTablePanel from "@/components/data/DataTablePanel.vue"
import type { FormItems, TableProps } from "@/defined/component-prop"

const formValues = ref({
  companyName: "",
  employeeName: "",
})
const formItems = ref<FormItems>([
  {
    key: "companyName",
    label: "企业名称",
    component: NInput,
  },
  {
    key: "employeeName",
    label: "所属销售",
    component: NInput,
  },
])
const tableProps = ref<TableProps<any>>({
  columns: [
    {
      key: "companyName",
      title: "企业名称",
    },
    {
      key: "employeeName",
      title: "所属销售",
    },
    {
      key: "industry",
      title: "所属行业",
    },
    {
      key: "applyLine",
      title: "报备线路",
    },
    {
      key: "applyAt",
      title: "申请时间",
    },
    {
      key: "qualificationStatus",
      title: "资质状态",
    },
    {
      key: "qualificationReason",
      title: "资质说明",
    },
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
