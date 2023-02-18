<template>
  <div class="barchartContainer">
    <Bar class="barChart" :options="barCharOption" :data="barCharData" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default defineComponent({
  name: "HorizontalBarChart",
  props: {
    barCharData: {
      required: true,
      type: Object as PropType<
        ChartData<"bar", (number | [number, number] | null)[], unknown>
      >,
    },
    barCharOption: {
      required: true,
      type: Object as PropType<ChartOptions<"bar">>,
    },
  },
  components: {
    Bar,
  },
});
</script>

<style scoped>
.barchartContainer {
  width: 100%;
}

.barchartContainer .barChart {
  margin-left: auto;
  margin-right: auto;
  width: 500px !important;
  height: 170px !important;
}

@media only screen and (max-width: 500px) {
  .barchartContainer .barChart {
    width: 320px !important;
    height: 150px !important;
  }
}

@media only screen and (max-width: 365px) {
  .barchartContainer .barChart {
    width: 280px !important;
    height: 150px !important;
  }
}
</style>
