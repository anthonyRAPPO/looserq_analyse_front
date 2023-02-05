<template>
  <Loading v-if="isLoading"></Loading>
  <v-btn
    class="btnBackGames"
    icon
    size="x-large"
    color="secondary"
    variant="outlined"
    @click="returnGames()"
  >
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
  <h2 class="tittle">So...Are you in looser Q?</h2>
  <h3 class="sub-tittle">
    Winrate (%) per team over the last 10 games of each player :
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
import { MessageType } from "@/enumerations/messageType";

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
      this.lstParticipant.length === 0 ||
      this.lstParticipant.length > 10
    ) {
      this.$router.push({ name: "SearchLogin" });
    } else {
      const winRateAlly = this.calculateWinrateByTeam(true);
      const winRateEnemy = this.calculateWinrateByTeam(false);
      this.createGraphBar(winRateAlly, winRateEnemy);
      const winRateAllyByPostion = this.calculateWinrateByPositionByTeam(true);
      const winRateEnemyByPostion =
        this.calculateWinrateByPositionByTeam(false);
      this.createGraphRadar(winRateAllyByPostion, winRateEnemyByPostion);
    }
  },

  methods: {
    returnGames() {
      this.$router.push({ name: "DisplayGames" });
    },
    calculateWinrateByTeam(isAlly: boolean): number {
      let nbrGame = 0;
      let nbrWin = 0;

      this.lstParticipant
        .filter((p) => p.ally === isAlly)
        .forEach((p) => {
          console.log("p");
          console.log(p);
          nbrWin = nbrWin + p.totalWin;
          nbrGame = nbrGame + p.totalWin + p.totalLoose;
        });
      return (nbrWin * 100) / nbrGame;
    },
    calculateWinrateByPositionByTeam(isAlly: boolean): number[] {
      let winrateTop = -1;
      let winrateJungle = -1;
      let winrateMid = -1;
      let winrateAdc = -1;
      let winrateSupp = -1;
      this.lstParticipant
        .filter((p) => p.ally === isAlly)
        .forEach((p) => {
          switch (p.teamPosition) {
            case Role.TOP: {
              winrateTop = (p.totalWin * 100) / (p.totalLoose + p.totalWin);
              break;
            }
            case Role.JUNGLE: {
              winrateJungle = (p.totalWin * 100) / (p.totalLoose + p.totalWin);
              break;
            }
            case Role.MIDDLE: {
              winrateMid = (p.totalWin * 100) / (p.totalLoose + p.totalWin);
              break;
            }
            case Role.BOTTOM: {
              winrateAdc = (p.totalWin * 100) / (p.totalLoose + p.totalWin);
              break;
            }
            case Role.UTILITY: {
              winrateSupp = (p.totalWin * 100) / (p.totalLoose + p.totalWin);
              break;
            }
          }
        });
      if (winrateTop === -1) {
        winrateTop = 0;
        eventBus.emit("ouvrir-popup", {
          text:
            "Error calculating " +
            (isAlly ? "ally" : "enemy") +
            " top winrate ",
          type: MessageType.ERROR,
        });
      }
      if (winrateJungle === -1) {
        winrateJungle = 0;
        eventBus.emit("ouvrir-popup", {
          text:
            "Error calculating " +
            (isAlly ? "ally" : "enemy") +
            " jungle winrate ",
          type: MessageType.ERROR,
        });
      }
      if (winrateMid === -1) {
        winrateMid = 0;
        eventBus.emit("ouvrir-popup", {
          text:
            "Error calculating " +
            (isAlly ? "ally" : "enemy") +
            " mid winrate ",
          type: MessageType.ERROR,
        });
      }
      if (winrateAdc === -1) {
        winrateAdc = 0;
        eventBus.emit("ouvrir-popup", {
          text:
            "Error calculating " +
            (isAlly ? "ally" : "enemy") +
            " adc winrate ",
          type: MessageType.ERROR,
        });
      }
      if (winrateSupp === -1) {
        winrateSupp = 0;
        eventBus.emit("ouvrir-popup", {
          text:
            "Error calculating " +
            (isAlly ? "ally" : "enemy") +
            " supp winrate ",
          type: MessageType.ERROR,
        });
      }
      return [winrateTop, winrateJungle, winrateMid, winrateAdc, winrateSupp];
    },
    createGraphRadar(
      winRateAllyByPostion: number[],
      winRateEnemyByPostion: number[]
    ) {
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
            data: winRateAllyByPostion,
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: this.$vuetify.theme.themes.light.colors.warn,
          },
          {
            label: "enemy",
            borderColor: this.$vuetify.theme.themes.light.colors.error,
            fill: true,
            data: winRateEnemyByPostion,
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

.btnBackGames {
  position: fixed;
  top: 2%;
  left: 2%;
}
</style>
