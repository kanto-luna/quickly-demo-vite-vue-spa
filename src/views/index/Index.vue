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
  Sunset,
  Sunrise,
} from "@vicons/tabler"
import { FullScreenMaximize24Filled, FullScreenMinimize24Filled } from "@vicons/fluent"
import { useRoute, useRouter } from "vue-router"

import logo from "@/assets/vue.svg"
import { isFullScreen, elementFullScreen, exitFullScreen } from "@/utils/ui/fullscreen"
import type { Menu } from "@/defined/auth" 
import { useThemeStore } from "@/stores/theme-store"

const _m = useMessage()
const route = useRoute()
const router = useRouter()
const themeStore = useThemeStore()

const sideIsCollapsed = ref(false)
const userDropdownOptions = ref([
  { label: "个人信息", key: "info" },
  { label: "退出登录", key: "logout" },
])
const menuOptions = ref<Menu[]>([
  { label: "工作台", key: "home", path: "/home", name: "home", component: "/src/views/index/home/Home.vue" },
  {
    label: "数据概览",
    key: "dataview",
    path: "/dataview",
    name: "dataview",
    component: "/src/views/index/dataview/DataCenter.vue",
    children: [
      { label: "数据中心", key: "dataview-data-center", path: "/dataview/data-center", name: "DataCenter", component: "/src/views/index/dataview/DataCenter.vue" },
    ]
  },
  { 
    label: "资料管理", 
    key: "particulars", 
    path: "/particulars",
    name: "particulars",
    component: "/src/views/index/particulars/Particulars.vue",
    children: [
      { label: "客户资料", key: "particulars-customer", path: "/particulars/customer", name: "ParticularsCustomer", component: "/src/views/index/particulars/ParticularsCustomer.vue" },
      { label: "申请资料", key: "particulars-applying", path: "/particulars/applying", name: "ParticularsApplying", component: "/src/views/index/particulars/ParticularsApplying.vue" },
      { label: "驳回资料", key: "particulars-refused-applying", path: "/particulars/refused-applying", name: "RefusedParticularsApplying", component: "/src/views/index/particulars/RefusedParticularsApplying.vue" },
      { label: "场景审核", key: "particulars-scene-checking", path: "/particulars/scene-checking", name: "SceneChecking", component: "/src/views/index/particulars/SceneChecking.vue" },
      { label: "资质审核", key: "particulars-qualification-checking", path: "/particulars/qualification-checking", name: "QualificationChecking", component: "/src/views/index/particulars/QualificationChecking.vue" },
      { label: "公司审核", key: "particulars-company-checking", path: "/particulars/company-checking", name: "CompanyChecking", component: "/src/views/index/particulars/CompanyChecking.vue" },
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
      { label: "上传合同", key: "contract-pre-upload-list", path: "/contract/pre-upload-list", name: "PreUploadContractList", component: "/src/views/index/contract/PreUploadContractList.vue" },
      { label: "审核合同", key: "contract-pre-censored-list", path: "/contract/pre-censored-list", name: "PreCensoredContractList", component: "/src/views/index/contract/PreCensoredContractList.vue" },
      { label: "签批合同", key: "contract-pre-confirmed-list", path: "/contract/pre-confirmed-list", name: "PreConfirmedContractList", component: "/src/views/index/contract/PreConfirmedContractList.vue" },
      { label: "签署合同", key: "contract-pre-signed-list", path: "/contract/pre-signed-list", name: "PreSignedContractList", component: "/src/views/index/contract/PreSignedContractList.vue" },
      { label: "合同模板", key: "contract-template-list", path: "/contract/template-list", name: "ContractTemplateList", component: "/src/views/index/contract/ContractTemplateList.vue" },
    ],
  },
])
const currentTab = ref("home")
const activateTabPanes = ref<Menu[]>([])
const rootRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const contextMenuShown = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const contextMenuKey = ref("")

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

const handleFullScreenToggle = async () => {
  if (!contentRef.value) {
    return
  }
  if (isFullScreen()) {
    await exitFullScreen()
  } else {
    elementFullScreen(contentRef.value)
  }
}

const handleTabChange = async (key: string) => {
  currentTab.value = key
  const tab = activateTabPanes.value.find(tab => tab.key === key)
  if (tab) {
    await router.push(tab.path)
  }
}

const handleTabContextmenu = (e: MouseEvent, key: string) => {
  e.preventDefault()
  contextMenuX.value = e.clientX
  contextMenuY.value = e.clientY
  contextMenuShown.value = true
  contextMenuKey.value = key
  const closeContextMenu = () => {
    contextMenuShown.value = false
    contextMenuKey.value = ""
    rootRef.value?.removeEventListener("click", closeContextMenu)
  }
  rootRef.value?.addEventListener("click", closeContextMenu)
}

const handleContextMenuCloseTab = async () => {
  await handleTabClose(contextMenuKey.value).catch(() => {})
}

const handleContextMenuCloseAll = async () => {
  activateTabPanes.value = []
  activateTabPanes.value.push({ key: "home", title: "工作台", name: "Home", path: "/home", component: "/src/views/index/home/Home.vue" })
  currentTab.value = "home"
  router.push("/home")
}

const handleContextMenuCloseRight = async () => {
  let tabIdx = -1
  let currentTabIdx = -1
  activateTabPanes.value.forEach((tab, index) => {
    if (tab.key === contextMenuKey.value) {
      tabIdx = index
    }
    if (tab.key === currentTab.value) {
      currentTabIdx = index
    }
  })
  if (tabIdx !== -1) {
    activateTabPanes.value.splice(tabIdx + 1)
    console.debug(currentTabIdx, tabIdx, activateTabPanes.value)
    if (currentTabIdx >= tabIdx) {
      currentTab.value = activateTabPanes.value[tabIdx].key as string
      console.debug(activateTabPanes.value[tabIdx])
      router.push(activateTabPanes.value[tabIdx].path)
    }
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
  <div class="h-screen" ref="rootRef">
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
          <n-icon class="ml-[16px]! cursor-pointer" size="24px" v-show="isFullScreen" @click="handleFullScreenToggle">
            <FullScreenMaximize24Filled />
          </n-icon>
          <n-icon class="ml-[16px]! cursor-pointer" size="24px" v-show="!isFullScreen" @click="handleFullScreenToggle">  
            <FullScreenMinimize24Filled />
          </n-icon>
          <!-- <n-icon class="ml-[16px]!" size="24px">
            <Backpack />
          </n-icon> -->
          <n-icon class="ml-[16px]! cursor-pointer" size="24px" @click="themeStore.theme = themeStore.theme === 'light' ? 'dark' : 'light'">
            <Sunset v-if="themeStore.theme === 'light'" />
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
              @contextmenu="(e: MouseEvent) => handleTabContextmenu(e, tab.key as string)"
            />
          </n-tabs>
          <div class="flex-grow-1 overflow-hidden" ref="contentRef">
            <router-view v-slot="{ Component }">
              <keep-alive :max="10" :include="activateTabPanes.map(tab => tab.name)">
                <component :is="Component" :key="route.fullPath" />
              </keep-alive>
            </router-view>
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <context-menu
      v-model:model-value="contextMenuShown"
      :x="contextMenuX"
      :y="contextMenuY"
      @close="handleContextMenuCloseTab"
      @close-all="handleContextMenuCloseAll"
      @close-right="handleContextMenuCloseRight"
    />
  </div>
</template>

<style scoped>
:deep(.n-layout-scroll-container) {
  @apply flex flex-col;
}
</style>