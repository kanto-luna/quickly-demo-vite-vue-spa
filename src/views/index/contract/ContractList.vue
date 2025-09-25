<script lang="ts" setup>
import {
  NTabs,
  NTabPane,
  NButton,
  NInput,
} from "naive-ui"
import {h, shallowRef} from "vue"
import { onMounted, ref } from "vue"

import DataTablePanel from "@/components/data/DataTablePanel.vue"
import ContractDescLayer from "./layer/ContractDescLayer.vue"
import type { Contract } from "@/defined/contract"
import type { FormItems, TableProps } from "@/defined/component-prop"

const availableContractsFormItems = shallowRef<FormItems>([
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
  {
    key: "code",
    label: "合同编号",
    component: NInput,
  }
])
const runningContractsFormItems = ref<FormItems>([
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
  {
    key: "status",
    label: "合同状态",
    component: NInput,
  }
])
const close2expiredContractsFormItems = ref<FormItems>([
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
  {
    key: "status",
    label: "合同状态",
    component: NInput,
  }
])
const expiredContractsFormItems = ref<FormItems>([
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
  {
    key: "status",
    label: "合同状态",
    component: NInput,
  }
])
const availableContractsTableProps = ref<TableProps<Contract>>({
  columns: [
    { key: "companyName", title: "企业名称" },
    { key: "employeeName", title: "所属销售" },
    { key: "code", title: "合同编号" },
    { key: "industry", title: "行业" },
    { key: "startAt", title: "开始时间" },
    { key: "expiredAt", title: "到期时间" },
    {
      key: "operations",
      title: "操作",
      render(row: Contract) {
        return h("div", {
          class: "flex items-center gap-2"
        }, [
          h(NButton, {
            type: "info",
            quaternary: true,
            size: "small",
            onClick: () => {
              console.debug(row)
              infoModalShown.value = true
            }
          }, {
            default: () => "查看"
          }),
        ])
      }
    }
  ],
  data: [
    {
      id: "1",
      companyName: "康多公司",
      employeeName: "张三",
      industry: "电子科技",
      code: "C202509120001",
      startAt: "2025-09-12",
      expiredAt: "2025-10-12",
    },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    pageCount: 1,
  },
})
const runningContractsTableProps = ref<TableProps<Contract>>({
  columns: [
    { key: "companyName", title: "企业名称" },
    { key: "employeeName", title: "所属销售" },
    { key: "industry", title: "行业" },
    { key: "code", title: "合同编号" },
    { key: "status", title: "合同状态" },
    {
      key: "operations",
      title: "操作",
      render(row: Contract) {
        return h("div", {
          class: "flex items-center gap-2"
        }, [
          h(NButton, {
            type: "info",
            quaternary: true,
            size: "small",
            onClick: () => {
              console.debug(row)
              infoModalShown.value = true
            }
          }, {
            default: () => "查看"
          }),
        ])
      }
    }
  ],
  data: [
    
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    pageCount: 1,
  },
})
const close2expiredContractsTableProps = ref<TableProps<Contract>>({
  columns: [
    { key: "companyName", title: "企业名称" },
    { key: "employeeName", title: "所属销售" },
    { key: "code", title: "合同编号" },
    { key: "status", title: "合同状态" },
    { key: "startAt", title: "开始时间" },
    { key: "expiredAt", title: "到期时间" },
    {
      key: "operations",
      title: "操作",
      render(row: Contract) {
        return h("div", {
          class: "flex items-center gap-2"
        }, [
          h(NButton, {
            type: "info",
            quaternary: true,
            size: "small",
            onClick: () => {
              console.debug(row)
              infoModalShown.value = true
            }
          }, {
            default: () => "查看"
          }),
        ])
      }
    }
  ],
  data: [
    {
      id: "1",
      companyName: "企业名称",
      employeeName: "所属销售",
      industry: "行业",
      code: "合同编号",
      status: "合同状态",
      startAt: "开始时间",
      expiredAt: "到期时间",
    },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    pageCount: 1,
  },
})
const expiredContractsTableProps = ref<TableProps<Contract>>({
  columns: [
    { key: "companyName", title: "企业名称" },
    { key: "employeeName", title: "所属销售" },
    { key: "code", title: "合同编号" },
    { key: "status", title: "合同状态" },
    { key: "startAt", title: "开始时间" },
    { key: "expiredAt", title: "到期时间" },
    {
      key: "operations",
      title: "操作",
      render(row: Contract) {
        return h("div", {
          class: "flex items-center gap-2"
        }, [
          h(NButton, {
            type: "info",
            quaternary: true,
            size: "small",
            onClick: () => {
              console.debug(row)
              infoModalShown.value = true
            }
          }, {
            default: () => "查看"
          }),
        ])
      }
    }
  ],
  data: [
    {
      id: "1",
      companyName: "企业名称",
      employeeName: "所属销售",
      industry: "行业",
      code: "合同编号",
      status: "合同状态",
      startAt: "开始时间",
      expiredAt: "到期时间",
    },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    pageCount: 1,
  },
})
const infoModalShown = ref(false)
const infoModalDescription = ref<{ label: string, key: string, value: string | number }[]>([
  { label: "合同编号", key: "id", value: "康多公司" },
  { label: "有效期", key: "expiredAt", value: "2025-10-12 至 2025-10-12" },
  { label: "套餐价格", key: "price", value: "210 元/人/月" },
  { label: "费用支付", key: "payment", value: "按月度/月初" }
])
const timeline = ref<{ type: "success" | "error" | "warning" | "info", title: string, content?: string, time?: string }[]>([
  { type: "success", title: "合同资料上传", content: "张三", time: "2024-07-20 15:26:31" },
  { type: "success", title: "合同审批", content: "李四", time: "2024-07-21 15:26:31" },
  { type: "success", title: "合同签署", content: "李四", time: "2024-07-21 15:35:12" },
  { type: "success", title: "正式合作" },
])  

const loadData = () => {
  // TODO: 加载数据
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <!-- 标签只切换表单，表格使用数据源和列源来控制 -->
  <div id="contract-list" class="h-full relative flex flex-col gap-[10px] p-[10px]! bg-[#F7F8FA]">
    <n-tabs>
      <n-tab-pane name="available" tab="有效合同">
        <data-table-panel 
          :table-props="availableContractsTableProps"
          :form-items="availableContractsFormItems"
        />
      </n-tab-pane>
      <n-tab-pane name="running" tab="运行中合同">
        <data-table-panel 
          :table-props="runningContractsTableProps" 
          :form-items="runningContractsFormItems"
        />
      </n-tab-pane>
      <n-tab-pane name="close2expired" tab="即将到期合同">
        <data-table-panel 
          :table-props="close2expiredContractsTableProps" 
          :form-items="close2expiredContractsFormItems" 
        />
      </n-tab-pane>
      <n-tab-pane name="expired" tab="已到期合同">
        <data-table-panel 
          :table-props="expiredContractsTableProps" 
          :form-items="expiredContractsFormItems" 
        />
      </n-tab-pane>
    </n-tabs>
    <contract-desc-layer
      v-model:model-value="infoModalShown"
      :description="infoModalDescription"
      :timeline="timeline"
    />
  </div>
</template>

<style scoped>
:deep(.n-tabs) {
  @apply h-full flex-grow-1;
}

:deep(.n-tabs-nav) {
  @apply pl-[10px]! select-none;
}

:deep(.n-tab-pane) {
  @apply h-full flex-grow-1 pt-[0]!;
}
</style>