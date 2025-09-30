<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { use } from "echarts/core";
import VChart from "vue-echarts";
import {
  GaugeChart
} from "echarts/charts";
import {
  TooltipComponent,
  TitleComponent
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

use([
  GaugeChart,
  TooltipComponent,
  TitleComponent,
  CanvasRenderer
]);

// Example value, replace with real API data as needed
const gaugeValue = ref(75);

const option = ref({
  title: {
    text: "坐席速率",
    left: "center",
    top: 10,
    textStyle: {
      fontSize: 16,
      color: "#2563eb"
    }
  },
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%"
  },
  series: [
    {
      name: "速率",
      type: "gauge",
      center: ["50%", "60%"],
      radius: "90%",
      min: 0,
      max: 100,
      splitNumber: 10,
      axisLine: {
        lineStyle: {
          width: 18,
          color: [
            [0.3, "#67e0e3"],
            [0.7, "#37a2da"],
            [1, "#fd666d"]
          ]
        }
      },
      pointer: {
        width: 6,
        length: "70%"
      },
      axisTick: {
        distance: -22,
        length: 8,
        lineStyle: {
          color: "#fff",
          width: 1
        }
      },
      splitLine: {
        distance: -25,
        length: 18,
        lineStyle: {
          color: "#fff",
          width: 2
        }
      },
      axisLabel: {
        color: "#999",
        distance: -35,
        fontSize: 12
      },
      detail: {
        valueAnimation: true,
        formatter: "{value}%",
        color: "#2563eb",
        fontSize: 28,
        offsetCenter: [0, "60%"]
      },
      data: [
        {
          value: gaugeValue.value,
          name: "速率"
        }
      ]
    }
  ]
});

// If you want to update the gauge when value changes
watch(gaugeValue, (val) => {
  option.value.series[0].data[0].value = val;
});

onMounted(() => {
  // fetch data here if needed
});
</script>

<template>
  <div class="employee-gauge-speed">
    <v-chart :option="option" autoresize class="gauge-chart" />
  </div>
</template>

<style scoped>
.employee-gauge-speed {
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
.gauge-chart {
  width: 100%;
  height: 100%;
  min-height: 260px;
}
</style>
