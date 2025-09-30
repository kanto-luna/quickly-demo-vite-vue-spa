<script lang="ts" setup> 
import { ref } from "vue"

import { useThemeStore } from "@/stores/theme-store"
import CallingReceivedRateTrendPlatBar from "./chart/CallingReceivedRateTrendPlatBar.vue"
import EmployeeGaugeSpeed from "./chart/EmployeeGaugeSpeed.vue"
import totalCallingIcon from "@/assets/views/index/dataview/total-calling.png"
import totalMinuteClockIcon from "@/assets/views/index/dataview/total-minute-clock.png"
import totalReceiveTrendChartIcon from "@/assets/views/index/dataview/total-receive-trend-chart.png"
import totalBalanceIcon from "@/assets/views/index/dataview/total-balance.png"
import totalEmployeePieChartIcon from "@/assets/views/index/dataview/total-employee-pie-chart.png"
import totalEmployeeAdditionBarChartIcon from "@/assets/views/index/dataview/total-employee-addition-bar-chart.png"
import trendChartModel from "@/assets/views/index/dataview/trend-chart-model.svg"

const themeStore = useThemeStore()
const totalCounts = ref<{ label: string, value: number, unit: string, icon: string }[]>([
  { label: "总拨打次数", value: 1000, unit: "次", icon: totalCallingIcon },
  { label: "总拨打时长", value: 1000, unit: "分钟", icon: totalMinuteClockIcon },
  { label: "总拨打接通率", value: 1000, unit: "%", icon: totalReceiveTrendChartIcon },
  { label: "账户余额", value: 1000, unit: "元", icon: totalBalanceIcon },
  { label: "在用坐席", value: 1000, unit: "个", icon: totalEmployeePieChartIcon },
  { label: "坐席新增", value: 1000, unit: "个", icon: totalEmployeeAdditionBarChartIcon },
])
</script>

<template>
  <div class="h-full p-[10px]! overflow-y-auto" :class="themeStore.theme === 'dark' ? 'bg-[var(--dark-primary-bg-color)]' : 'bg-[var(--light-primary-bg-color)]'">
    <n-card class="h-fit">
      <div class="flex flex-col w-full">
        <div class="flex justify-between items-center">
          <div class="text-[20px] select-none">数据统计</div>
          <div class="ml-auto! select-none">客户</div>
          <div class="w-[200px] ml-[10px]!">
            <n-input />
          </div>
          <div class="ml-[25px]! select-none">日期</div>
          <div class="w-[200px] ml-[10px]!">
            <n-input />
          </div>
        </div>
        <div class="flex flex-wrap gap-[10px] mt-[10px]!">
          <div v-for="(count, index) in totalCounts" :key="`total-count-${index}`" class="total-count-card">
            <div class="w-full p-[20px]! gap-[30px] flex justify-between items-center">
              <div class="h-[72px] flex flex-col justify-between">
                <div class="text-[18px] text-[#FFFFFF]">{{ count.label }}</div>
                <div class="text-[18px] text-[#FFFFFF]">{{ count.value }} {{ count.unit }}</div>
              </div>
              <div>
                <img :src="count.icon" class="w-[72px] h-[72px]" />
              </div>
            </div>
          </div>
        </div>
        <div class="h-[400px] flex gap-[10px] mt-[10px]!">
          <div class="flex flex-col min-w-[400px] gap-[10px]">
            <n-card class="flex-grow-1">
              <div class="flex h-full justify-between items-center">
                <div class="flex flex-col gap-[10px] trend-card">
                  <div>
                    <label>本月充值</label> 
                    <span>568.00</span>
                  </div>
                  <div>
                    <label>累计充值</label>
                    <span>34555.00</span>
                  </div>
                </div>
                <div>
                  <img :src="trendChartModel" alt="trendChartModel" class="w-[192px] h-[45px]" />
                </div>
              </div>
            </n-card>
            <n-card class="flex-grow-1">
              <div class="flex justify-between items-center">
                <div class="flex flex-col gap-[10px] trend-card">
                  <div>
                    <label>本月消费</label>
                    <span>568.00</span>
                  </div>
                  <div>
                    <label>累计消费</label>
                    <span>34555.00</span>
                  </div>
                </div>
                <div>
                  <img :src="trendChartModel" alt="trendChartModel" class="w-[192px] h-[45px]" />
                </div>
              </div>
            </n-card>
            <n-card class="flex-grow-1">
              <div class="flex justify-between items-center">
                <div class="flex flex-col gap-[10px] trend-card">
                  <div>
                    <label>本月充值</label>
                    <span>568.00</span>
                  </div>
                  <div>
                    <label>累计充值</label>
                    <span>34555.00</span>
                  </div>
                </div>
                <div>
                  <img :src="trendChartModel" alt="trendChartModel" class="w-[192px] h-[45px]" />
                </div>
              </div>
            </n-card>
          </div>
          <div class="flex-grow-1">
            <n-card class="h-full">
              <CallingReceivedRateTrendPlatBar />
            </n-card>
          </div>
        </div>
        <div class="h-[400px] flex gap-[10px] mt-[10px]!">
          <n-card class="flex-grow-1">
            <EmployeeGaugeSpeed />
          </n-card>
          <n-card class="flex-grow-1">6</n-card>
          <n-card class="flex-grow-1">7</n-card>
        </div>
        <div class="w-full mt-[10px]!">
          <n-card class="w-full">8</n-card>
        </div>
      </div>
    </n-card>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.total-count-card {
  background: linear-gradient(128.59deg, rgba(132,202,173,1) 13.9%,rgba(56,178,172,1) 82.81%);
  @apply min-w-[200px] h-[120px] rounded-[8px] flex-shrink-0 flex-grow-1;
}

.trend-card {
  @apply text-[18px];
}

.trend-card div {
  @apply flex items-center gap-[10px];
}

.trend-card div:nth-child(1) span {
  @apply font-bold;
}

.trend-card div:nth-child(2) label {
  @apply text-[#666666];
}

.trend-card div:nth-child(2) span {
  @apply text-[#2563eb];
}
</style>