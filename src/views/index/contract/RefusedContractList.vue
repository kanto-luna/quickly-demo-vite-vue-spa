<script lang="ts" setup>
import { NInput, NButton } from "naive-ui"
import { h, ref } from "vue"
import type { Ref } from "vue"

import DataTablePanel from "@/components/data/DataTablePanel.vue"
import type { FormItems, TableProps } from "@/defined/component-prop"
import type { RefusedContract } from "@/defined/contract"

type FormValues = {
  companyName: string
  employeeName: string
  id: string
  status: string
}

const formValues: Ref<FormValues> = ref<FormValues>({
  companyName: "",
  employeeName: "",
  id: "",
  status: "",
})
const formItems: Ref<FormItems> = ref<FormItems>([
  {
    key: "companyName",
    label: "企业名称",
    component: h(NInput, {
      placeholder: "请输入企业名称"
    })
  },
  {
    key: "employeeName",
    label: "所属销售",
    component: h(NInput, {
      placeholder: "请输入所属销售"
    })
  },
  {
    key: "id",
    label: "合同编号",
    component: h(NInput, {
      placeholder: "请输入合同编号"
    })
  },
  {
    key: "status",
    label: "合同状态",
    component: h(NInput, {
      placeholder: "请输入合同状态"
    })
  }
])
const tableProps: Ref<TableProps<RefusedContract>> = ref({
  columns: [
    {
      key: "id", title: "ID",
    },
    {
      key: "companyName", title: "企业名称",
    },
    {
      key: "industry", title: "所属行业",
    },
    {
      key: "refusedReason", title: "驳回理由",
    },
    {
      key: "refusedAt", title: "驳回时间",
    },
    {
      key: "employeeName", title: "所属销售",
    },
    {
      key: "operations", title: "操作",
      render: (row: RefusedContract) => {
        return h("div", {
          class: "flex items-center gap-2"
        }, [
          h(NButton, { type: "primary", onClick: () => { console.debug(row) } }, "查看")
        ])
      }
    }
  ],
  data: [],
  pagination: {
    page: 1,
    pageSize: 1,
    pageCount: 1,
  }
})

const handleSearch = () => {
  console.debug("search: ", formValues.value)
}

const handleReset = () => {
  formValues.value = {
    companyName: "",
    employeeName: "",
    id: "",
    status: "",
  }
}
</script>

<template>
  <div class="w-full h-full">
    <data-table-panel 
      :form-values="formValues"
      :form-items="formItems"
      :table-props="tableProps"
      @search="handleSearch"
      @reset="handleReset"
      class="h-full" 
    />
  </div>
</template>

<style scoped>
</style>