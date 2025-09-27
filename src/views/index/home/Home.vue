<script lang="ts" setup>
import { 
  NCard,
  NDataTable,
} from "naive-ui"
import { onMounted, onUnmounted, ref } from "vue"
import { useThemeStore } from "@/stores/theme-store"

// off-duty time
const offDutyTime = new Date() 
offDutyTime.setHours(18, 0, 0, 0)
const offDutyCountDown = ref("00:00:00")
let timer: number | undefined = undefined
const themeStore = useThemeStore()
// total count
const totalCounts = ref([
  { label: "在用客户", key: "userCount", value: 10 },
  { label: "坐席总数", key: "seatCount", value: 100 },
  { label: "在途客户", key: "onTheWayCount", value: 10 },
  { label: "待办合同", key: "pendingContractCount", value: 10 },
  { label: "提交工单", key: "submitOrderCount", value: 10 },
  { label: "引入客户", key: "introduceCount", value: 10 },
])
// contract list
const contractColumns = ref([
  { key: "contractName", title: "合同名称" },
  { key: "contractType", title: "合同类型" },
  { key: "contractStatus", title: "合同状态" },
  { key: "contractAmount", title: "合同金额" },
  { key: "contractDate", title: "合同日期" },
])
const contractData = ref([
  { contractName: "合同1", contractType: "合同类型1", contractStatus: "合同状态1", contractAmount: 100, contractDate: "2021-01-01" },
  { contractName: "合同2", contractType: "合同类型2", contractStatus: "合同状态2", contractAmount: 200, contractDate: "2021-01-02" },
  { contractName: "合同3", contractType: "合同类型3", contractStatus: "合同状态3", contractAmount: 300, contractDate: "2021-01-03" },
  { contractName: "合同4", contractType: "合同类型4", contractStatus: "合同状态4", contractAmount: 400, contractDate: "2021-01-04" },
  { contractName: "合同5", contractType: "合同类型5", contractStatus: "合同状态5", contractAmount: 500, contractDate: "2021-01-05" },
])
// customer list
const customerColumns = ref([
  { key: "customerName", title: "客户名称" },
  { key: "customerType", title: "客户类型" },
  { key: "customerStatus", title: "客户状态" },
  { key: "customerAmount", title: "客户金额" },
  { key: "customerDate", title: "客户日期" },
])
const customerData = ref([
  { customerName: "客户1", customerType: "客户类型1", customerStatus: "客户状态1", customerAmount: 100, customerDate: "2021-01-01" },
  { customerName: "客户2", customerType: "客户类型2", customerStatus: "客户状态2", customerAmount: 200, customerDate: "2021-01-02" },
  { customerName: "客户3", customerType: "客户类型3", customerStatus: "客户状态3", customerAmount: 300, customerDate: "2021-01-03" },
  { customerName: "客户4", customerType: "客户类型4", customerStatus: "客户状态4", customerAmount: 400, customerDate: "2021-01-04" },
  { customerName: "客户5", customerType: "客户类型5", customerStatus: "客户状态5", customerAmount: 500, customerDate: "2021-01-05" },
])
// message list
const messageColumns = ref([
  { key: "messageDetail", title: "消息详情" },
  { key: "alertTime", title: "提醒时间" },
])
const messageData = ref([
  { messageDetail: "消息详情1", alertTime: "2021-01-01" },
  { messageDetail: "消息详情2", alertTime: "2021-01-02" },
  { messageDetail: "消息详情3", alertTime: "2021-01-03" },
  { messageDetail: "消息详情4", alertTime: "2021-01-04" },
  { messageDetail: "消息详情5", alertTime: "2021-01-05" },
])

const initCountDown = () => {
  timer = setInterval(() => {
    const now = new Date()
    const diff = offDutyTime.getTime() - now.getTime()
    if (diff <= 0) {
      clearInterval(timer)
      return
    }
    const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, "0")
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0")
    const seconds = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, "0")
    offDutyCountDown.value = `${hours}:${minutes}:${seconds}`
  }, 1000)
}

onMounted(() => {
  initCountDown()
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="h-full overflow-y-auto overflow-x-hidden scrollbar-hide" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-primary-bg-color)]' : 'bg-[var(--light-primary-bg-color)]'">
    <!-- 纵向布局流 -->
    <div class="w-full box-border flex flex-col p-[10px]! gap-[10px]">
      <!-- Slogen 和 下班时间 横向布局流 -->
      <div class="min-w-0 flex gap-[10px]">
        <n-card class="flex-grow-2 min-w-[65%]">
          <div class="h-full flex items-center gap-[10px]">
            <img src="@/assets/views/index/home/worker.png" class="w-[98px] h-[81px]"/>
            <span class="text-[18px]">您好，系统已就绪，请开始新一天的工作</span>
          </div>
        </n-card>
        <n-card class="flex-grow-1 w-[400px]">
          <div class="h-full flex items-center gap-[10px]">
            <span class="text-[18px]">距离下班</span>
            <span class="flex-grow-1 text-center text-[40px]">{{ offDutyCountDown }}</span>
          </div>
        </n-card>
      </div>
      <!-- 主要数据看板 -->
      <div class="flex gap-[10px]">
        <n-card v-for="(value, index) in totalCounts" :key="index" :class="index % 2 === 0 ? 'bg-[#141F1B]! text-[#84CAAD]!' : ''">
          <div class="flex justify-between items-center">
            <div>{{ value.label }}</div>
            <div class="text-[24px]">{{ value.value }}</div>
          </div>
        </n-card>
      </div>
      <!-- 消息横幅 -->
      <div class="w-full h-[30px] overflow-hidden bg-[#141F1B]">
        <div class="w-fit h-full flex gap-[10px] text-[#84CAAD] banner">
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum iste incidunt quis maxime recusandae facilis illum porro unde! Est ipsum atque consectetur itaque sunt blanditiis tenetur eius expedita assumenda natus!</span>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ducimus animi pariatur rem omnis.</span>
        </div>
      </div>
      <!-- 次要数据看板 -->
      <div class="grid grid-cols-[143px_1fr] grid-rows-3 gap-[10px]">
        <div class="col-start-1 col-end-2 row-start-1 row-end-2">
          <n-card>
            <div class="w-full h-full flex justify-center items-center">销售额</div>
          </n-card>
        </div>
        <div class="col-start-2 col-end-3 row-start-1 row-end-2">
          <n-card>
            <div class="w-full h-full flex items-center">销售额</div>
          </n-card>
        </div>
        <div class="col-start-1 col-end-2 row-start-2 row-end-3">
          <n-card>
            <div class="w-full h-full flex justify-center items-center">线路推荐</div>
          </n-card>
        </div>
        <div class="col-start-2 col-end-3 row-start-2 row-end-3">
          <n-card>
            <div class="w-full h-full flex items-center">线路推荐</div>
          </n-card>
        </div>
        <div class="col-start-1 col-end-2 row-start-3 row-end-4">
          <n-card>
            <div class="w-full h-full flex justify-center items-center">我的工单</div>
          </n-card>
        </div>
        <div class="col-start-2 col-end-3 row-start-3 row-end-4">
          <n-card>
            <div class="w-full h-full flex items-center">我的工单</div>
          </n-card>
        </div>
      </div>
      <!-- 在用客户流 -->
      <div class="w-full select-none">
        <n-card title="在用客户">
          <div class="w-full flex flex-col gap-[10px] relative">
            <div class="flex items-center gap-[10px] z-[20]">
              <div>接通</div>
              <div class="flex-grow-1 flex overflow-auto gap-[10px]">
                <div class="w-[248px] h-full">
                  <n-card class="opacity-[39]" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]' : 'bg-[var(--light-secondary-bg-color)]'">
                    <div class="flex flex-col">
                      <span>第一公司</span>
                      <span>余额</span>
                      <span>月接通</span>
                    </div>
                  </n-card>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-[10px] z-[20]">
              <div>透支</div>
              <div class="flex-grow-1 flex overflow-auto gap-[10px]">
                <div class="w-[248px] h-full">
                  <n-card class="opacity-[39]" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]' : 'bg-[var(--light-secondary-bg-color)]'">
                    <div class="flex flex-col">
                      <span>第一公司</span>
                      <span>余额</span>
                      <span>月接通</span>
                    </div>
                  </n-card>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-[10px] z-[20]">
              <div>双重</div>
              <div class="flex-grow-1 flex overflow-auto gap-[10px]">
                <div class="w-[248px] h-full">
                  <n-card class="opacity-[39]" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]' : 'bg-[var(--light-secondary-bg-color)]'">
                    <div class="flex flex-col">
                      <span>第一公司</span>
                      <span>余额</span>
                      <span>月接通</span>
                    </div>
                  </n-card>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-[10px] z-[20]">
              <div class="flex-shrink-0">正常</div>
              <div class="flex-grow-1 flex overflow-auto gap-[10px] scrollbar-hide">
                <div class="w-[248px] h-full flex-shrink-0">
                  <n-card class="opacity-[39]" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]' : 'bg-[var(--light-secondary-bg-color)]'">
                    <div class="flex flex-col">
                      <span>第一公司</span>
                      <span>余额</span>
                      <span>月接通</span>
                    </div>
                  </n-card>
                </div>
                <div class="w-[248px] h-full flex-shrink-0">
                  <n-card class="opacity-[39]" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]' : 'bg-[var(--light-secondary-bg-color)]'">
                    <div class="flex flex-col">
                      <span>第二公司</span>
                      <span>余额</span>
                      <span>月接通</span>
                    </div>
                  </n-card>
                </div>
                <div class="w-[248px] h-full flex-shrink-0">
                  <n-card class="opacity-[39]" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]' : 'bg-[var(--light-secondary-bg-color)]'">
                    <div class="flex flex-col">
                      <span>第二公司</span>
                      <span>余额</span>
                      <span>月接通</span>
                    </div>
                  </n-card>
                </div>
                <div class="w-[248px] h-full flex-shrink-0">
                  <n-card class="opacity-[39]" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]' : 'bg-[var(--light-secondary-bg-color)]'">
                    <div class="flex flex-col">
                      <span>第二公司</span>
                      <span>余额</span>
                      <span>月接通</span>
                    </div>
                  </n-card>
                </div>
                <div class="w-[248px] h-full flex-shrink-0">
                  <n-card class="opacity-[39]" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]' : 'bg-[var(--light-secondary-bg-color)]'">
                    <div class="flex flex-col">
                      <span>第二公司</span>
                      <span>余额</span>
                      <span>月接通</span>
                    </div>
                  </n-card>
                </div>
                <div class="w-[248px] h-full flex-shrink-0">
                  <n-card class="opacity-[39]" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-secondary-bg-color)]' : 'bg-[var(--light-secondary-bg-color)]'">
                    <div class="flex flex-col">
                      <span>第二公司</span>
                      <span>余额</span>
                      <span>月接通</span>
                    </div>
                  </n-card>
                </div>
              </div>
            </div>
            <div class="absolute bottom-0 right-0 z-[10]">
              <img src="@/assets/views/index/home/caller.png" class="w-[174px] h-[143px]" />
            </div>
          </div>
        </n-card>
      </div>
      <!-- 合同列表 -->
      <div class="w-full flex gap-[10px]">
        <n-card class="flex-grow-2 min-w-[65%]" title="待办合同">
          <div class="h-full flex items-center gap-[10px]">
            <n-data-table class="h-full" :columns="contractColumns" :data="contractData" :max-height="225" />
          </div>
        </n-card>
        <n-card class="flex-grow-1 w-[400px]" title="在途合同">
          <div class="h-full grid grid-cols-2 grid-rows-2 justify-center items-center gap-[10px]">
            <div class="col-start-1 col-end-2 row-start-1 row-end-2 side-click-box">
              <span>合同待审核</span>
              <span>3</span>
            </div>
            <div class="col-start-2 col-end-3 row-start-1 row-end-2 side-click-box">
              <span>合同待审核</span>
              <span>3</span>
            </div>
            <div class="col-start-1 col-end-2 row-start-2 row-end-3 side-click-box">
              <span>合同待审核</span>
              <span>3</span>
            </div>
            <div class="col-start-2 col-end-3 row-start-2 row-end-3 side-click-box">
              <span>合同待审核</span>
              <span>3</span>
            </div>
          </div>
        </n-card>
      </div>
      <!-- 客户列表 -->
      <div class="w-full flex gap-[10px]">
        <n-card class="flex-grow-2 min-w-[65%]" title="在途客户">
          <div class="h-full flex items-center gap-[10px]">
            <n-data-table class="h-full" :columns="customerColumns" :data="customerData" :max-height="225" />
          </div>
        </n-card>
        <n-card class="flex-grow-1 w-[400px]" title="在途客户">
          <div class="h-full flex items-center gap-[10px]">
            <div class="w-full h-full grid grid-cols-2 grid-rows-2 justify-center items-center gap-[10px]">
              <div class="col-start-1 col-end-2 row-start-1 row-end-2 side-click-box">
                <span>场景审核中</span>
                <span>3</span>
              </div>
              <div class="col-start-2 col-end-3 row-start-1 row-end-2 side-click-box">
                <span>资质考察中</span>
                <span>3</span>
              </div>
              <div class="col-start-1 col-end-2 row-start-2 row-end-3 side-click-box">
                <span>公司审批中</span>
                <span>3</span>
              </div>
              <div class="col-start-2 col-end-3 row-start-2 row-end-3 side-click-box">
                <span>审批通过</span>
                <span>3</span>
              </div>
            </div>
          </div>
        </n-card>
      </div>
      <!-- 最新消息 -->
      <div class="w-full flex gap-[10px]">
        <n-card class="flex-grow-2 min-w-[65%]" title="最新消息">
          <div class="h-full flex items-center gap-[10px]">
            <n-data-table class="h-full" :columns="messageColumns" :data="messageData" :max-height="225" />
          </div>
        </n-card>
        <n-card class="flex-grow-1 w-[400px]" title="操作指南">
          <div class="h-full flex flex-col items-center gap-[10px]">
            <div class="w-full side-list-item">合同审批流程</div>
            <div class="w-full side-list-item">引入客户对接流程</div>
            <div class="w-full side-list-item">APP客户系统操作手册</div>
            <div class="w-full side-list-item">获取坐席套餐购买时间</div>
          </div>
        </n-card>
      </div>
    </div>
  </div> 
</template>

<style scoped>
.banner {
  animation: banner-playing 20s linear infinite;
}

.banner span {
  @apply whitespace-nowrap;
}

.side-click-box {
  @apply flex flex-col justify-center items-center gap-[2px] cursor-pointer hover:bg-[#141F1B] hover:text-[#84CAAD];
}

.side-click-box span:nth-child(1) {
  @apply text-[18px];
}

.side-click-box span:nth-child(2) {
  @apply text-[28px];
}

.side-list-item {
  @apply w-full bg-[rgba(132,202,173,0.48)] py-[12.5px]! pl-[20px]! text-[#101010] cursor-pointer hover:bg-[#141F1B] hover:text-[#84CAAD];
}

.side-list-item:nth-child(even) {
  @apply bg-[rgba(132,202,173,0.14)] hover:bg-[#141F1B] hover:text-[#84CAAD];
}

@keyframes banner-playing {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>