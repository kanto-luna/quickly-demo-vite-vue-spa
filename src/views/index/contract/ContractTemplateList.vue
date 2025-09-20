<script lang="ts" setup>
import { h, ref } from "vue"
import type { Ref } from "vue"
import { NInput, NButton } from "naive-ui"

import DataTablePanel from "@/components/data/DataTablePanel.vue"
import type { FormItems, TableProps } from "@/defined/component-prop"
import type { ContractTemplate } from "@/defined/contract"

type FormValues = {
  templateName: string
  creator: string
}

const formValues: Ref<FormValues> = ref<FormValues>({
  templateName: "",
  creator: "",
})
const formItems: Ref<FormItems> = ref<FormItems>([
  {
    key: "templateName",
    label: "模板名称",
    component: h(NInput, {
      placeholder: "请输入模板名称"
    })
  },
  {
    key: "creator",
    label: "创建人",
    component: h(NInput, {
      placeholder: "请输入创建人"
    })
  },
])
const tableProps: Ref<TableProps<ContractTemplate>> = ref({
  columns: [
    {
      key: "id", title: "编号",
    },
    {
      key: "templateName", title: "模板名称",
    },
    {
      key: "creator", title: "创建人",
    },
    {
      key: "createdAt", title: "创建时间",
    },
    {
      key: "updateAt", title: "更新时间",
    },
    {
      key: "operations", title: "操作",
      width: 250,
      render: (row: ContractTemplate) => {
        return h("div", { class: "flex items-center gap-2" }, [
          h(NButton, { type: "primary", size: "small", quaternary: true, onClick: () => { console.debug("查看", row) } }, "查看"),
          h(NButton, { type: "warning", size: "small", quaternary: true, onClick: () => { console.debug("下载", row) } }, "根据模板创建"),
          h(NButton, { type: "info", size: "small", quaternary: true, onClick: () => { console.debug("编辑", row) } }, "编辑"),
        ])
      }
    }
  ],
  data: [
    {
      id: "1",
      templateName: "模板名称",
      creator: "创建人",
      createdAt: "2025-09-12",
      companyName: "企业名称",
      industry: "行业",
      employeeName: "所属销售",
      updateAt: "2025-09-12",
    }
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    pageCount: 1,
  }
})

const handleSearch = () => {
  console.debug("search: ", formValues.value)
}

const handleReset = () => {
  formValues.value = {
    templateName: "",
    creator: "",
  }
}
</script>

<template>
  <DataTablePanel
    v-model:form-values="formValues"
    :form-items="formItems"
    :table-props="tableProps"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<style scoped>
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.gap-2 {
  gap: 0.5rem;
}
</style>
