<script lang="ts" setup>
import { h, ref } from "vue"
import { NInput, NButton } from "naive-ui"

import DataTablePanel from "@/components/data/DataTablePanel.vue"
import type { FormItems, TableProps } from "@/defined/component-prop"
import type { RefusedParticularApplying } from "@/defined/particulars"

const formValues = ref({
  companyName: "",
  employeeName: "",
  refusedStage: "",
})
const formItems = ref<FormItems>([
  {
    key: "companyName",
    label: "公司名称",
    component: NInput,
  },
  {
    key: "refusedStage",
    label: "驳回阶段",
    component: NInput,
  },
  {
    key: "employeeName",
    label: "所属销售",
    component: NInput,
  },
])
const tableProps = ref<TableProps<RefusedParticularApplying>>({
  columns: [
    {
      title: "公司名称",
      key: "companyName",
    },
    {
      title: "所属行业",
      key: "industry",
    },
    {
      title: "驳回阶段",
      key: "refusedStage"
    },
    {
      title: "驳回原因",
      key: "refusedReason"
    },
    {
      title: "驳回时间",
      key: "refusedAt"
    },
    {
      title: "所属销售",
      key: "employeeName"
    },
    {
      title: "操作",
      key: "operation",
      width: 180,
      render: (_row) => {
        return h("div", {
          class: "flex items-center gap-[10px]"
        }, [
          h(NButton, {
            type: "info",
            quaternary: true,
            size: "small",
            onClick: () => {
              console.debug(_row)
              infoModalShown.value = true
            }
          }, {
            default: () => "查看"
          }),
          h(NButton, {
            type: "warning",
            quaternary: true,
            size: "small",
          }, {
            default: () => "编辑"
          }),
        ])
      }
    }
  ],
  data: [
    {
      companyName: "康多公司",
      employeeName: "张三",
      industry: "电子科技",
      refusedStage: "已驳回",
      refusedReason: "驳回原因",
      refusedAt: "2025-09-12",
    },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    pageCount: 1,
  },
})
const infoModalShown = ref(false)
</script>

<template>
  <div class="w-full h-full relative">
    <data-table-panel :form-items="formItems" :table-props="tableProps" :form-values="formValues" />
  </div>
</template>

<style scoped></style>
