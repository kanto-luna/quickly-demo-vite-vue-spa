<script lang="ts" setup>
import { NInput } from 'naive-ui'
import { h, ref } from 'vue'
import type { Ref } from 'vue'

import DataTablePanel from '@/components/data/DataTablePanel.vue'
import type { FormItems } from '@/defined/component-prop'

const formItems: Ref<FormItems> = ref<FormItems>([
  {
    label: "企业名称",
    component: h(NInput, {
      placeholder: "请输入企业名称"
    })
  },
  {
    label: "所属销售",
    component: h(NInput, {
      placeholder: "请输入所属销售"
    })
  },
  {
    label: "合同编号",
    component: h(NInput, {
      placeholder: "请输入合同编号"
    })
  },
  {
    label: "合同状态",
    component: h(NInput, {
      placeholder: "请输入合同状态"
    })
  }
])
</script>

<template>
  <div class="w-full h-full">
    <data-table-panel :form-items="formItems" class="h-full" />
  </div>
</template>

<style scoped>
</style>