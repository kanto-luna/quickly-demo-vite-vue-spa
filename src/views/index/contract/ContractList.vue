<script lang="ts" setup>
import { ArrowBackUp } from "@vicons/tabler"
import {
  NDataTable,
  NTabs,
  NTabPane,
  NButton,
  NCard,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NTimeline,
  NTimelineItem,
  NIcon,
  type DataTableColumns,
  type PaginationProps,
} from "naive-ui"
import { h } from "vue"
import { onMounted, ref } from "vue"

type ContractBase = {
  id: string
  companyName: string
  industry: string
  employeeName: string
}
type ContractAvailable = ContractBase & {
  code: string
  startAt: string
  expiredAt: string
}
type ContractRunning = ContractBase & {
  status: string
}
type ContractClose2Expired = ContractAvailable
type ContractExpired = ContractAvailable
type Contract = ContractBase | ContractAvailable | ContractRunning | ContractClose2Expired | ContractExpired

const currentTab = ref<string>("available")
const form = ref<{[key: string]: string}>({
  companyName: "",
  employeeName: "",
  contractId: "",
  contractStatus: "",
})
const columns = ref<DataTableColumns<Contract>>([])
const availableContractsColumns = ref<DataTableColumns<Contract>>([
  { key: "companyName", title: "企业名称" },
  { key: "employeeName", title: "所属销售" },
  { key: "code", title: "合同编号" },
  { key: "industry", title: "行业" },
  { key: "startAt", title: "开始时间" },
  { key: "expiredAt", title: "到期时间" },
  {
    key: "operations",
    title: "操作",
    render(row: Contract, _index: number) {
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
])
const runningContractsColumns = ref<DataTableColumns<Contract>>([
  { key: "companyName", title: "企业名称" },
  { key: "employeeName", title: "所属销售" },
  { key: "industry", title: "行业" },
  { key: "code", title: "合同编号" },
  { key: "status", title: "合同状态" },
  {
    key: "operations",
    title: "操作",
    render(row: Contract, _index: number) {
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
])
const close2expiredContractsColumns = ref<DataTableColumns<Contract>>([
  { key: "companyName", title: "企业名称" },
  { key: "employeeName", title: "所属销售" },
  { key: "code", title: "合同编号" },
  { key: "status", title: "合同状态" },
  { key: "startAt", title: "开始时间" },
  { key: "expiredAt", title: "到期时间" },
  {
    key: "operations",
    title: "操作",
    render(row: Contract, _index: number) {
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
])
const expiredContractsColumns = ref<DataTableColumns<Contract>>([
  { key: "companyName", title: "企业名称" },
  { key: "employeeName", title: "所属销售" },
  { key: "code", title: "合同编号" },
  { key: "status", title: "合同状态" },
  { key: "startAt", title: "开始时间" },
  { key: "expiredAt", title: "到期时间" },
  {
    key: "operations",
    title: "操作",
    render(row: Contract, _index: number) {
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
])
const data = ref<Contract[]>([])
const availableContractsData = ref<Contract[]>([
  {
    id: "1",
    companyName: "康多公司",
    employeeName: "张三",
    industry: "电子科技",
    code: "C202509120001",
    startAt: "2025-09-12",
    expiredAt: "2025-10-12",
  },
])
const runningContractsData = ref<Contract[]>([
  {
    id: "1",
    companyName: "企业名称",
    employeeName: "所属销售",
    industry: "行业",
    code: "合同编号",
    status: "合同状态",
  },
])
const close2expiredContractsData = ref<Contract[]>([
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
])
const expiredContractsData = ref<Contract[]>([
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
])
const pagination = ref<PaginationProps>({
  page: 1,
  pageSize: 10,
  pageCount: 1,
})
const infoModalShown = ref(false)

const loadData = () => {
  // TODO: 加载数据
  columns.value = availableContractsColumns.value
  data.value = availableContractsData.value
}

const handleTabUpdate = (key: string) => {
  currentTab.value = key
  switch (key) {
    case "available":
      columns.value = availableContractsColumns.value
      data.value = availableContractsData.value
      break;
    case "running":
      columns.value = runningContractsColumns.value
      data.value = runningContractsData.value
      break;
    case "close2expired":
      columns.value = close2expiredContractsColumns.value
      data.value = close2expiredContractsData.value
      break;
    case "expired":
    default:
      columns.value = expiredContractsColumns.value
      data.value = expiredContractsData.value
      break;
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <!-- 标签只切换表单，表格使用数据源和列源来控制 -->
  <div class="h-full flex flex-col gap-[10px] p-[10px] bg-[#F7F8FA]">
    <n-card>
      <n-tabs v-model:value="currentTab" :on-update:value="handleTabUpdate" animated>
        <n-tab-pane name="available" tab="有效合同">
          <div class="flex min-w-0">
            <n-form :model="form" class="flex-grow-1 flex-shrink-0" label-placement="left" inline>
              <n-form-item label="企业名称" path="companyName">
                <n-input v-model="form.companyName" />
              </n-form-item>
              <n-form-item label="所属销售" path="employeeName">
                <n-input v-model="form.employeeName" />
              </n-form-item>
              <n-form-item label="合同编号" path="contractId">
                <n-input v-model="form.contractId" />
              </n-form-item>
            </n-form>
            <div class="flex-shrink-0 flex gap-[10px] min-w-[150px]">
              <n-button type="primary">查询</n-button>
              <n-button>重置</n-button>
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="running" tab="在途合同">
          <div class="flex min-w-0">
            <n-form :mode="form" class="flex-grow-1 flex-shrink-0" label-placement="left" inline>
              <n-form-item label="企业名称" path="companyName">
                <n-input v-model="form.companyName" />
              </n-form-item>
              <n-form-item label="所属销售" path="employeeName">
                <n-input v-model="form.employeeName" />
              </n-form-item>
              <n-form-item label="合同状态" path="contractStatus">
                <n-input v-model="form.contractStatus" />
              </n-form-item>
            </n-form>
            <div class="flex-shrink-0 flex gap-[10px] min-w-[150px]">
              <n-button type="primary">查询</n-button>
              <n-button>重置</n-button>
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="close2expired" tab="将到期合同">
          <div class="flex min-w-0">
            <n-form :model="form" class="flex-grow-1 flex-shrink-0" label-placement="left" inline>
              <n-form-item label="企业名称" path="companyName">
                <n-input v-model="form.companyName" />
              </n-form-item>
              <n-form-item label="所属销售" path="employeeName">
                <n-input v-model="form.employeeName" />
              </n-form-item>
              <n-form-item label="合同状态" path="contractStatus">
                <n-input v-model="form.contractStatus" />
              </n-form-item>
            </n-form>
            <div class="flex-shrink-0 flex gap-[10px] min-w-[150px]">
              <n-button type="primary">查询</n-button>
              <n-button>重置</n-button>
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="expired" tab="过期合同">
          <div class="flex min-w-0">
            <n-form :model="form" class="flex-grow-1 flex-shrink-0" label-placement="left" inline>
              <n-form-item label="企业名称" path="companyName">
                <n-input v-model="form.companyName" />
              </n-form-item>
              <n-form-item label="所属销售" path="employeeName">
                <n-input v-model="form.employeeName" />
              </n-form-item>
              <n-form-item label="合同状态" path="contractStatus">
                <n-input v-model="form.contractStatus" />
              </n-form-item>
            </n-form>
            <div class="flex-shrink-0 flex gap-[10px] min-w-[150px]">
              <n-button type="primary">查询</n-button>
              <n-button>重置</n-button>
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
    <n-card class="flex-grow-1">
      <n-data-table :columns="columns" :data="data" :pagination="pagination" class="h-full" />
    </n-card>
    <n-modal v-model:show="infoModalShown" draggable>
      <template #default="{ draggableClass }">
        <div class="w-[800px]">
          <n-card>
            <div class="w-full flex items-center gap-[10px]" :class="draggableClass">
              <n-icon class="cursor-pointer" @click="infoModalShown = false">
                <ArrowBackUp />
              </n-icon>
              <span class="text-[#4E5969] cursor-pointer" @click="infoModalShown = false">返回</span>
            </div>
            <n-timeline class="w-full mt-[20px] select-none" horizontal>
              <n-timeline-item 
                type="success"
                title="合同资料上传"
                content="张三"
                time="2024-07-20 15:26:31"
              />
              <n-timeline-item 
                type="success"
                title="合同审批"
                content="李四"
                time="2024-07-21 15:26:31"
              />
              <n-timeline-item 
                type="success"
                title="合同签署"
                content="李四"
                time="2024-07-21 15:35:12"
              />
              <n-timeline-item 
                type="success"
                title="正式合作"
                />
            </n-timeline>
            <div class="w-full grid grid-cols-2 grid-rows-2 gap-[20px] my-[20px]">
              <div class="col-start-1 col-end-2 row-start-1 row-end-2 flex description">
                <label>合同编码</label>
                <span>C202509120001</span>
              </div>
              <div class="col-start-2 col-end-3 row-start-1 row-end-2 flex description">
                <label>有效期</label>
                <span>2025-09-12 至 2025-10-12</span>
              </div>
              <div class="col-start-1 col-end-2 row-start-2 row-end-3 flex description">
                <label>套餐价格</label>
                <span>210元/人/月</span>
              </div>
              <div class="col-start-2 col-end-3 row-start-2 row-end-3 flex description">
                <label>费用支付</label>
                <span>按月度/月初</span>
              </div>
            </div>
            <div class="flex min-h-[400px] h-auto description">
              <label>合同内容</label>
              <embed class="flex-grow-1" src="https://philpapers.org/archive/sinpg" />
            </div>
          </n-card> 
        </div>
      </template>
    </n-modal>
  </div>
</template>

<style scoped>
.description label {
  @apply text-[#4E5969] w-[5rem] select-none;
}

.description span {
  @apply flex-grow-1 border-b border-[#D9D9D9] select-none;
}

:deep(.n-form--inline) {
  width: auto !important;
}

:deep(.n-form-item) {
  min-width: 350px;
}

:deep(.n-timeline-item) {
  flex: 1;
}
</style>