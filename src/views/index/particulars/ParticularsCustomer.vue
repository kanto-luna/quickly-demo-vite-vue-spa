<script lang="ts" setup>
import { h, ref } from "vue"
import { NInput, NButton, NImage } from "naive-ui"

import DataTablePanel from "@/components/data/DataTablePanel.vue"
import ParticularsDescLayer from "./layer/ParticularsDescLayer.vue"
import ParticularsEditLayer from "./layer/ParticularsEditLayer.vue"
import type { Customer } from "@/defined/particulars"
import type { FormItems, TableProps, DataDescTimeline, DataDescSections } from "@/defined/component-prop"

const formValues = ref({
  companyName: "",
  employeeName: "",
})
const formItems = ref<FormItems>([
  {
    key: "companyName",
    label: "公司名称",
    component: NInput,
  },
  {
    key: "employeeName",
    label: "所属销售",
    component: NInput,
  },
])
const tableProps = ref<TableProps<Customer>>({
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
      render: (_row: Customer) => {
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
            onClick: () => {
              // TODO: 绑定编辑的值
              editModalShown.value = true
            }
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
  ],
  data: [
    {
      companyName: "康多公司",
      employeeName: "张三",
      industry: "电子科技",
      reportLine: "报备线路",
      status: "合作中",
      createAt: "2025-09-12",
    },
  ],
  pagination: {
    page: 1,
    pageSize: 10,
    pageCount: 1,
  },
})
const infoModalShown = ref(false)
const timeline = ref<DataDescTimeline>({
  props: {
    horizontal: true,
  },
  items: [
    {
      title: "提交资料",
      content: "张三",
      time: "2025-09-12",
      type: "success",
    },
    {
      title: "场景审核",
      content: "李四",
      time: "2025-09-12",
      type: "success",
    },
    {
      title: "资质考察",
      content: "王五",
      time: "2025-09-12",
      type: "success",
    },
    {
      title: "公司审批",
      content: "赵六",
      time: "2025-09-12",
      type: "success",
    },
    {
      title: "合同准备阶段",
      content: "孙七",
      time: "2025-09-12",
      type: "success",
    }
  ],
})
const description = ref<DataDescSections>([
  {
    content: [
      { 
        label: "客户资料", 
        key: "customer资料", 
        value: "客户资料" 
      },
      {
        label: "所属行业",
        key: "industry",
        value: "电子科技"
      },
      {
        label: "意向路线",
        key: "reportLine",
        value: "多方-苏云回拨",
        span: 2,
      },
      {
        label: "营业执照",
        key: "businessLicense",
        value: h(NImage, {
          src: "https://ts1.tc.mm.bing.net/th/id/R-C.55210eaced6fb70f651abfad1bcd9607?rik=gNykK%2f7wks562Q&riu=http%3a%2f%2fdarkroom-cdn.s3.amazonaws.com%2f2016%2f01%2fAFP_Getty-547583887.jpg&ehk=1cGylfx43Z0Kd8zvMmftdqddn3LwqlufPasunWpJsOw%3d&risl=&pid=ImgRaw&r=0",
          width: 370,
          height: 207,
          class: "z-[1000]!"
        }),
        span: 2,
      },
      {
        label: "法人身份证",
        key: "legalPersonIdCard",
        value: h("div", {
          class: "flex items-center gap-[10px]"
        }, [
          h(NImage, {
            src: "https://ts1.tc.mm.bing.net/th/id/R-C.55210eaced6fb70f651abfad1bcd9607?rik=gNykK%2f7wks562Q&riu=http%3a%2f%2fdarkroom-cdn.s3.amazonaws.com%2f2016%2f01%2fAFP_Getty-547583887.jpg&ehk=1cGylfx43Z0Kd8zvMmftdqddn3LwqlufPasunWpJsOw%3d&risl=&pid=ImgRaw&r=0",
            width: 283,
            height: 183,
            class: "z-[1000]!"
          }),
          h(NImage, {
            src: "https://ts1.tc.mm.bing.net/th/id/R-C.55210eaced6fb70f651abfad1bcd9607?rik=gNykK%2f7wks562Q&riu=http%3a%2f%2fdarkroom-cdn.s3.amazonaws.com%2f2016%2f01%2fAFP_Getty-547583887.jpg&ehk=1cGylfx43Z0Kd8zvMmftdqddn3LwqlufPasunWpJsOw%3d&risl=&pid=ImgRaw&r=0",
            width: 283,
            height: 183,
            class: "z-[1000]!"
          }),
        ]),
        span: 2,
      },
      {
        label: "话术",
        key: "script",
        value: h(NInput, {
          type: "textarea",
          rows: 10,
          value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }),
        span: 2,
      }
    ],
    title: "基本信息",
    cols: 2,
  },
  {
    content: [
      {
        label: "套餐价格",
        key: "price",
        value: "210 元/人/月",
      },
      {
        label: "支付费用",
        key: "payment",
        value: "按月度/月初",
      },
      {
        label: "合同有效期",
        key: "validityPeriod",
        value: "2025-09-12 至 2025-10-12",
        span: 2,
      },
      {
        label: "合同预览",
        key: "contractPreview",
        value: h("embed", {
          src: "https://philpapers.org/archive/sinpg",
          width: "100%",
          height: "800px",
        }),
        span: 2,
      }
    ],
    title: "合同资料",
    cols: 2,
  },
  {
    content: [

    ],
    title: "线路资料",
    cols: 2,
  }
])
const editModalShown = ref(false)
const editData = ref<ParticularCustomerFormItems | undefined>(undefined)

const handleSearchReset = () => {
  formValues.value = {
    companyName: "",
    employeeName: "",
  }
}
</script>

<template>
  <div class="w-full h-full relative" id="particulars-customer">
    <data-table-panel 
      :form-items="formItems" 
      :table-props="tableProps" 
      :form-values="formValues"
      @reset="handleSearchReset"
    >
      <template #table-header>
        <div class="w-full flex">
          <n-button type="success" @click="editModalShown = true">新增</n-button>
          <n-button class="ml-auto!">导出</n-button>
      </div>
      </template>
    </data-table-panel>
    <particulars-desc-layer 
      v-model:model-value="infoModalShown" 
      :timeline="timeline" 
      :description="description" 
      :teleport="infoModalShown ? '#particulars-customer' : 'body'"
    />
    <particulars-edit-layer 
      v-model:model-value="editModalShown"
      :edit-data="editData"
      :teleport="editModalShown ? '#particulars-customer' : 'body'"
    />
  </div>
</template>

<style scoped></style>