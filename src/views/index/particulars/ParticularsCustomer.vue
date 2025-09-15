<script lang="ts" setup>
import { ArrowBackUp } from "@vicons/tabler"
import { 
  NCard,
  NButton,
  NInput,
  NForm,
  NFormItem,
  NDataTable,
  NModal,
  NIcon,
  type DataTableColumn,
  type PaginationProps,
} from "naive-ui"
import { h, ref } from "vue";

type Customer = {
  companyName: string,
  industry: string,
  reportLine: string,
  employeeName: string,
  status: string,
  createAt: string,
}

const formData = ref<{ companyName: string, employeeName: string }>({
  companyName: "",
  employeeName: "",
})
const columns = ref<DataTableColumn<Customer>[]>([
  {
    title: "公司名称",
    key: "companyName",
  },
  {
    title: "所属行业",
    key: "industry",
  },
  {
    title: "报备线路",
    key: "reportLine",
  },
  {
    title: "所属销售",
    key: "employeeName"
  },
  {
    title: "合作情况",
    key: "status"
  },
  {
    title: "创建时间",
    key: "createAt"
  },
  {
    title: "操作",
    key: "operation",
    width: 220,
    render: (row) => {
      return h("div", {
        class: "flex items-center gap-[10px]"
      }, [
        h(NButton, {
          type: "info",
          quaternary: true,
          size: "small",
          onClick: () => {
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
        h(NButton, {
          type: "error",
          quaternary: true,
          size: "small",
        }, {
          default: () => "上传"
        }),
      ])
    }
  }
])
const data = ref<Customer[]>([
  {
    companyName: "康多公司",
    employeeName: "张三",
    industry: "电子科技",
    reportLine: "报备线路",
    status: "合作中",
    createAt: "2025-09-12",
  },
])
const pagination = ref<PaginationProps>({
  page: 1,
  pageSize: 10,
  pageCount: 1,
})
const infoModalShown = ref(false)
const additionModalShown = ref(false)
</script>

<template>
  <div class="h-full flex flex-col p-[10px] gap-[10px] bg-[#F7F8FA]">
    <n-card>
      <div class="w-full flex items-center">
        <n-form :model="formData" label-placement="left" inline>
          <n-form-item label="企业名称" path="companyName">
            <n-input v-model:value="formData.companyName" />
          </n-form-item>
          <n-form-item label="所属销售" path="employeeName">
            <n-input v-model:value="formData.employeeName" />
          </n-form-item>
        </n-form>
        <div class="flex items-center gap-[10px]">
          <n-button type="primary">搜索</n-button>
          <n-button>重置</n-button>
        </div>
      </div>
    </n-card>
    <n-card class="flex-grow-1">
      <div class="h-full flex flex-col gap-[10px]">
        <div class="w-full flex items-center justify-between">
          <n-button type="primary">新增</n-button>
          <n-button>导出</n-button>
        </div>
        <n-data-table :columns="columns" :data="data" :pagination="pagination" class="flex-grow-1" />
      </div>
    </n-card>
    <n-modal v-model:show="additionModalShown" draggable>
      <template #default="{ draggableClass }">
        <div class="w-[600px]">
          <n-card>
            <div class="w-full flex items-center gap-[10px]" :class="draggableClass">
              <n-icon class="cursor-pointer" @click="additionModalShown = false">
                <ArrowBackUp />
              </n-icon>
              <span class="text-[#4E5969] cursor-pointer" @click="additionModalShown = false">返回</span>
            </div>
          </n-card>
        </div>
      </template>
    </n-modal>
    <n-modal v-model:show="infoModalShown" draggable>
      <template #default="{ draggableClass }">
        <div class="w-[600px]">
          <n-card>
            <div class="w-full flex items-center gap-[10px]" :class="draggableClass">
              <n-icon class="cursor-pointer" @click="infoModalShown = false">
                <ArrowBackUp />
              </n-icon>
              <span class="text-[#4E5969] cursor-pointer" @click="infoModalShown = false">返回</span>
            </div>
          </n-card>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<style scoped></style>