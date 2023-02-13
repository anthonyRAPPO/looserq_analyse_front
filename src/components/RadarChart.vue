<template>
  <div class="radarContainer">
    <Radar
      class="radarChart"
      :options="radarCharOption"
      :data="radarChartData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Filler,
  LineElement,
  PointElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default defineComponent({
  name: "RadarChart",
  props: {
    radarChartData: {
      required: true,
      type: Object as PropType<ChartData<"radar", (number | null)[], unknown>>,
    },
    radarCharOption: {
      required: true,
      type: Object as PropType<ChartOptions<"radar">>,
    },
  },
  components: {
    Radar,
  },
});
</script>

<style scoped>
.radarContainer {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
}
</style>
