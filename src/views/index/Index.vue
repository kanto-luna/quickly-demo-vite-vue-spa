<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { 
  NLayout, 
  NLayoutSider, 
  NLayoutContent, 
  NLayoutHeader, 
  NIcon,
  NInput,
  NInputGroup,
  NButton,
  NDropdown,
  NMenu,
  NTabs,
  NTab,
  useMessage,
} from "naive-ui"
import { 
  LayoutSidebarLeftCollapse, 
  LayoutSidebarRightCollapse,
  Backpack,
  Sunset,
  Sunrise,
} from "@vicons/tabler"
import { useRoute, useRouter } from "vue-router"

import logo from "@/assets/vue.svg"
import type { Menu } from "@/defined/auth" 

const _m = useMessage()
const route = useRoute()
const router = useRouter()

const sideIsCollapsed = ref(false)
const theme = ref("light")
const userDropdownOptions = ref([
  { label: "个人信息", key: "info" },
  { label: "退出登录", key: "logout" },
])
const menuOptions = ref<Menu[]>([
  { label: "工作台", key: "home", path: "/home", name: "home", component: "/src/views/index/home/Home.vue" },
  { 
    label: "资料管理", 
    key: "particulars", 
    path: "/particulars",
    name: "particulars",
    component: "/src/views/index/particulars/Particulars.vue",
    children: [
      { label: "客户资料", key: "particulars-customer", path: "/particulars/customer", name: "ParticularsCustomer", component: "/src/views/index/particulars/ParticularsCustomer.vue" },
    ],
  },
  {
    label: "合同管理",
    key: "contract",
    path: "/contract",
    name: "contract",
    component: "/src/views/index/contract/Contract.vue",
    children: [
      { label: "合同列表", key: "contract-list", path: "/contract/list", name: "ContractList", component: "/src/views/index/contract/ContractList.vue" },
      { label: "驳回合同", key: "contract-refused-list", path: "/contract/refused-list", name: "RefusedContractList", component: "/src/views/index/contract/RefusedContractList.vue" },
    ],
  },
])
const currentTab = ref("home")
const activateTabPanes = ref<Menu[]>([])

const handleUserDropdownSelect = async (key: string) => {
  switch (key) {
    case "info":
      break
    case "logout":
    default:
      localStorage.removeItem("auth")
      await router.push("/login")
      break
  }
}

const recursivelyFindTabFromMenuOpts = (sources: Menu[], key: string, whichCol: string = "key"): Menu | null => {
  if (!sources) {
    return null
  }
  for (const menu of sources) {
    if (menu[whichCol] === key) {
      return menu
    }
    if (menu.children) {
      const result = recursivelyFindTabFromMenuOpts(menu.children, key, whichCol)
      if (result) {
        return result
      }
    }
  }
  return null
}

const handleMenuSelect = async (key: string) => {
  const activateTab = activateTabPanes.value.find(tab => tab.key === key)
  if (activateTab) {
    currentTab.value = key
    await router.push(activateTab.path)
    return
  }
  const menu = recursivelyFindTabFromMenuOpts(menuOptions.value, key)
  if (menu) {
    activateTabPanes.value.push({
      title: menu.label || menu.name,
      ...menu,
    })
    await router.push(menu.path)
  }
  currentTab.value = key
}

const handleTabClose = async (key: string) => {
  console.debug(key)
  if (activateTabPanes.value.length === 1) {
    _m.warning("至少保留一个标签页")
    return
  }
  activateTabPanes.value = activateTabPanes.value.filter(tab => tab.key !== key)
  const tab = activateTabPanes.value[activateTabPanes.value.length - 1]
  currentTab.value = tab.key as string
  await router.push(tab.path)
}

const handleTabChange = async (key: string) => {
  currentTab.value = key
  const tab = activateTabPanes.value.find(tab => tab.key === key)
  if (tab) {
    await router.push(tab.path)
  }
}

const initPage = () => {
  console.debug(route.fullPath)
  const tab = recursivelyFindTabFromMenuOpts(menuOptions.value, route.fullPath, "path")
  if (tab) {
    activateTabPanes.value.push({ ...tab, title: tab.label || tab.name })
    currentTab.value = tab.key as string
    return
  }
  activateTabPanes.value.push({ key: "home", title: "工作台", name: "Home", path: "/home", component: "/src/views/index/home/Home.vue" })
  currentTab.value = "home"
}

onMounted(() => {
  initPage()
})
</script>

<template>
  <div class="h-screen">
    <n-layout class="h-full">
      <n-layout-header class="h-[60px]" bordered>
        <div class="h-full flex items-center">
          <img :src="logo" alt="logo" class="my-[14px]! ml-[16px]!" />
          <div class="ml-[16px]! text-xl font-[600] select-none">
            Vue3 后台管理系统
          </div>
          <n-icon class="ml-[16px]! cursor-pointer" size="24px" @click="sideIsCollapsed = !sideIsCollapsed" >  
            <LayoutSidebarLeftCollapse v-if="!sideIsCollapsed" />
            <LayoutSidebarRightCollapse v-else />
          </n-icon>
          <div class="ml-auto! select-none">
            <n-input-group>
              <n-input placeholder="请输入搜索内容" />
              <n-button>搜索</n-button>
            </n-input-group>
          </div>
          <n-icon class="ml-[16px]!" size="24px">
            <Backpack />
          </n-icon>
          <n-icon class="ml-[16px]! cursor-pointer" size="24px" @click="theme = theme === 'light' ? 'dark' : 'light'">
            <Sunset v-if="theme === 'light'" />
            <Sunrise v-else />
          </n-icon>
          <n-dropdown trigger="click" :options="userDropdownOptions" @select="handleUserDropdownSelect">
            <div class="mx-[16px]! text-md cursor-pointer select-none">
              Kanto Luna
            </div>
          </n-dropdown>
        </div>
      </n-layout-header>
      <n-layout class="h-[calc(100%-60px)]" has-sider>
        <n-layout-sider 
          :width="240"
          :collapsed-width="0"
          :collapsed="sideIsCollapsed"
          collapse-mode="width"
          bordered
        >
          <div class="h-full static select-none">
            <n-menu v-model:value="currentTab" :options="menuOptions" :on-update:value="handleMenuSelect" />
          </div>
        </n-layout-sider>
        <n-layout-content class="flex flex-col">
          <n-tabs class="select-none" v-model:value="currentTab" type="card" :on-update:value="handleTabChange" :on-close="handleTabClose" closable>
            <n-tab 
              v-for="tab in activateTabPanes" 
              :key="tab.key as string" 
              :name="tab.key as string" 
              :tab="tab.title as string" 
            />
          </n-tabs>
          <div class="flex-grow-1 overflow-hidden">
            <router-view v-slot="{ Component }">
              <keep-alive :max="10" :include="activateTabPanes.map(tab => tab.name)">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </router-view>
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped>
:deep(.n-layout-scroll-container) {
  @apply flex flex-col;
}
</style>