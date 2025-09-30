<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { use } from "echarts/core";
import VChart from "vue-echarts";
import {
  BarChart
} from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

use([
  BarChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  CanvasRenderer
]);

// Example data, replace with real API data as needed
const xAxisData = ref([
  "周一", "周二", "周三", "周四", "周五", "周六", "周日"
]);
const receivedRateData = ref([85, 88, 90, 87, 92, 95, 93]);

const option = ref({
  title: {
    text: "拨打接通率趋势",
    left: "center",
    textStyle: {
      fontSize: 16,
      color: "#2563eb"
    }
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    },
    formatter: (params: any) => {
      const item = params[0];
      return `${item.axisValue}<br/>接通率: ${item.data}%`;
    }
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      data: xAxisData.value,
      axisTick: { alignWithLabel: true },
      axisLabel: {
        color: "#666"
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      min: 0,
      max: 100,
      axisLabel: {
        formatter: "{value}%",
        color: "#666"
      },
      splitLine: {
        lineStyle: {
          type: "dashed"
        }
      }
    }
  ],
  series: [
    {
      name: "接通率",
      type: "bar",
      barWidth: "40%",
      data: receivedRateData.value,
      itemStyle: {
        color: "#2563eb",
        borderRadius: [4, 4, 0, 0]
      },
      label: {
        show: true,
        position: "top",
        formatter: "{c}%",
        color: "#2563eb"
      }
    }
  ]
});

// If you want to update the chart when data changes
watch(receivedRateData, (val) => {
  option.value.series[0].data = val;
});

watch(xAxisData, (val) => {
  option.value.xAxis[0].data = val;
});

onMounted(() => {
  // fetch data here if needed
});
</script>

<template>
  <div class="calling-received-rate-trend-bar">
    <v-chart :option="option" autoresize class="chart" />
  </div>
</template>

<style scoped>
.calling-received-rate-trend-bar {
  width: 100%;
  height: 100%;
  min-height: 320px;
  background: var(--chart-bg, #fff);
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.chart {
  width: 100%;
  height: 100%;
  min-height: 260px;
}
</style>
