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
  mounted() {
    console.log("this.radarCharOption1");
    console.log(this.radarCharOption);
    console.log("this.radarChartData2");
    console.log(this.radarChartData);
  },
});
</script>

<style scoped>
.radarContainer {
  width: 100%;
}

.radarContainer .radarChart {
  margin-left: auto;
  margin-right: auto;
  width: 400px !important;
  height: 400px !important;
}

@media only screen and (max-width: 415px) {
  .radarContainer .radarChart {
    width: 350px !important;
    height: 350px !important;
  }
}

@media only screen and (max-width: 365px) {
  .radarContainer .radarChart {
    width: 300px !important;
    height: 300px !important;
  }
}
</style>
