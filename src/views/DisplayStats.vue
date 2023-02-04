<template>
  <Loading v-if="isLoading"></Loading>
  <h2 class="tittle">So...Are you in looser Q?</h2>
  <h3 class="sub-tittle">
    Winrate per team over the last 10 games of each player :
  </h3>
  <HorizontalBarChart
    :barCharData="barChartData"
    :barCharOption="barCharOption"
    v-if="
      barChartData && barChartData.datasets && barChartData.datasets.length > 0
    "
  ></HorizontalBarChart>
  <RadarChart
    :radarChartData="radarChartData"
    :radarCharOption="radarChartOption"
    v-if="
      radarChartData &&
      radarChartData.datasets &&
      radarChartData.datasets.length > 0
    "
  ></RadarChart>
</template>

<script lang="ts">
import { Game } from "@/interfaces/game";
import { GameBoxSelectEvent } from "@/interfaces/gameBoxSelectEvent";
import { defineComponent } from "vue";
import * as apiService from "@/services/apiService";
import { Participant } from "@/interfaces/participant";
import Loading from "@/components/Loading.vue";
import HorizontalBarChart from "@/components/HorizontalBarChart.vue";
import RadarChart from "@/components/RadarChart.vue";
import eventBus from "@/plugins/eventBus";
import { ChartData, ChartOptions } from "chart.js";
import { Role } from "@/enumerations/Role";

export default defineComponent({
  components: {
    Loading,
    HorizontalBarChart,
    RadarChart,
  },
  data() {
    return {
      isLoading: false,
      login: "",
      lstGames: [] as Game[],
      lstParticipant: [] as Participant[],
      barChartData: {} as ChartData<
        "bar",
        (number | [number, number] | null)[],
        unknown
      >,
      barCharOption: {} as ChartOptions<"bar">,
      radarChartData: {} as ChartData<"radar", (number | null)[], unknown>,
      radarChartOption: {} as ChartOptions<"radar">,
    };
  },

  mounted() {
    this.login = this.$store.state.login;
    this.lstGames = this.$store.state.lstGames;
    this.lstParticipant = this.$store.state.lstParticipant;

    console.log(this.login);
    console.log(this.lstGames);
    console.log(this.lstParticipant);

    if (
      this.login.length === 0 ||
      this.lstGames.length === 0 ||
      this.lstParticipant.length === 0
    ) {
      this.$router.push({ name: "SearchLogin" });
    } else {
      const winRateAlly = this.calculateWinrateByTeam(true);
      const winRateEnemy = this.calculateWinrateByTeam(false);

      this.createGraphBar(winRateAlly, winRateEnemy);
      this.createGraphRadar();
    }
  },

  methods: {
    calculateWinrateByTeam(isAlly: boolean): number {
      let nbrGame = 0;
      let nbrWin = 0;

      this.lstParticipant
        .filter((p) => p.isAlly === isAlly)
        .forEach((p) => {
          console.log("p");
          console.log(p);
          nbrWin = nbrWin + p.totalWin;
          nbrGame = nbrGame + p.totalWin + p.totalLoose;
        });
      console.log("nbrWin");
      console.log(nbrWin);
      console.log("nbrGame");
      console.log(nbrGame);
      return (nbrWin * 100) / nbrGame;
    },
    createGraphRadar() {
      this.radarChartOption = {
        responsive: true,
        scales: {
          r: {
            ticks: {
              display: false,
            },
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      };
      this.radarChartData = {
        labels: Object.keys(Role),
        datasets: [
          {
            label: "ally",
            fill: true,
            borderColor: this.$vuetify.theme.themes.light.colors.warn,
            data: [40, 50, 80, 30, 50],
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: this.$vuetify.theme.themes.light.colors.warn,
          },
          {
            label: "enemy",
            borderColor: this.$vuetify.theme.themes.light.colors.error,
            fill: true,
            data: [30, 45, 60, 60, 40],
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor:
              this.$vuetify.theme.themes.light.colors.error,
          },
        ],
      };
    },
    createGraphBar(winRateAlly: number, winRateEnemy: number) {
      this.barCharOption = {
        indexAxis: "y",
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
        },
      };
      this.barChartData = {
        labels: [""],
        datasets: [
          {
            label: "Ally",
            data: [winRateAlly],
            backgroundColor: this.$vuetify.theme.themes.light.colors.warn,
          },
          {
            label: "Enemy",
            data: [winRateEnemy],
            backgroundColor: this.$vuetify.theme.themes.light.colors.error,
          },
        ],
      };
      console.log("barChartData");
      console.log(this.barChartData);
    },
  },
});
</script>

<style scoped>
.tittle {
  margin-top: 1em;
}

.sub-tittle {
  margin-top: 2em;
}
</style>
