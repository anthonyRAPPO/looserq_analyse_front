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
  <v-tabs v-model="tab" class="tabStat">
    <v-tab value="one">Last games</v-tab>
    <v-tab value="two">Rank</v-tab>
    <v-tab value="three">kda</v-tab>
  </v-tabs>
  <v-window v-model="tab">
    <v-window-item value="one">
      <h3 class="sub-tittle">
        Winrate (%) per team over the last 10 games of each player :
      </h3>
      <HorizontalBarChart
        :barCharData="barChartData"
        :barCharOption="barCharOption"
        v-if="
          barChartData &&
          barChartData.datasets &&
          barChartData.datasets.length > 0
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
    </v-window-item>
    <v-window-item value="two">
      <h3 class="sub-tittle">Rank (actual season) per team of each player :</h3>
      <HorizontalBarChart
        :barCharData="rankbarChartData"
        :barCharOption="rankbarCharOption"
        v-if="
          rankbarChartData &&
          rankbarChartData.datasets &&
          rankbarChartData.datasets.length > 0
        "
      ></HorizontalBarChart>
      <RadarChart
        :radarChartData="rankRadarChartData"
        :radarCharOption="rankRadarChartOption"
        v-if="
          rankRadarChartData &&
          rankRadarChartData.datasets &&
          rankRadarChartData.datasets.length > 0
        "
      ></RadarChart>
    </v-window-item>
    <v-window-item value="three">
      <h3 class="sub-tittle">Kda of each player in the game selected:</h3>
      <RadarChart
        :radarChartData="kdaRadarChartData"
        :radarCharOption="kdaRadarChartOption"
        v-if="
          kdaRadarChartData &&
          kdaRadarChartData.datasets &&
          kdaRadarChartData.datasets.length > 0
        "
      ></RadarChart>
    </v-window-item>
  </v-window>
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
import { Tier } from "@/enumerations/Tier";
import { Rank } from "@/enumerations/Rank";

export default defineComponent({
  components: {
    Loading,
    HorizontalBarChart,
    RadarChart,
  },
  data() {
    return {
      tab: "one",
      isLoading: false,
      login: "",
      lstGames: [] as Game[],
      lstParticipant: [] as Participant[],
      barChartData: {} as ChartData<
        "bar",
        (number | [number, number] | null)[],
        unknown
      >,
      rankbarChartData: {} as ChartData<
        "bar",
        (number | [number, number] | null)[],
        unknown
      >,
      barCharOption: {} as ChartOptions<"bar">,
      rankbarCharOption: {} as ChartOptions<"bar">,
      radarChartData: {} as ChartData<"radar", (number | null)[], unknown>,
      radarChartOption: {} as ChartOptions<"radar">,
      rankRadarChartData: {} as ChartData<"radar", (number | null)[], unknown>,
      rankRadarChartOption: {} as ChartOptions<"radar">,
      kdaRadarChartData: {} as ChartData<"radar", (number | null)[], unknown>,
      kdaRadarChartOption: {} as ChartOptions<"radar">,
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
      this.createRankBarChart();
      this.createGraphRadarRank();
      this.createGraphRadarKda();
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
    createGraphRadarKda() {
      this.kdaRadarChartOption = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return (
                  Math.exp(context.dataset.data[context.dataIndex]!) - 1
                ).toFixed(2);
              },
            },
          },
        },
        scales: {
          r: {
            ticks: {
              count: 0,
            },
          },
        },
      };
      this.kdaRadarChartData = {
        labels: Object.keys(Role),
        datasets: [
          {
            label: "ally",
            fill: true,
            borderColor: this.$vuetify.theme.themes.light.colors.warn,
            data: this.getkdaListByAlly(true),
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: this.$vuetify.theme.themes.light.colors.warn,
          },
          {
            label: "enemy",
            borderColor: this.$vuetify.theme.themes.light.colors.error,
            fill: true,
            data: this.getkdaListByAlly(false),
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor:
              this.$vuetify.theme.themes.light.colors.error,
          },
        ],
      };
    },
    createGraphRadarRank() {
      this.rankRadarChartOption = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              footer: function (context) {
                return context[0].dataset.label;
              },
              label: function (context) {
                const elo = context.dataset.data[context.dataIndex];
                if (typeof elo === "number" && elo > 0) {
                  const quo: number = Math.floor(elo / 400);
                  const rest: number = elo % 400;
                  let lp = 0;
                  let tier: Tier = Tier.IRON;
                  let rank: Rank = Rank.I;
                  if (quo === 1) {
                    tier = Tier.BRONZE;
                  } else if (quo === 2) {
                    tier = Tier.SILVER;
                  } else if (quo === 3) {
                    tier = Tier.GOLD;
                  } else if (quo === 4) {
                    tier = Tier.PLATINUM;
                  } else if (quo === 5) {
                    tier = Tier.DIAMOND;
                  } else if (quo >= 6) {
                    tier = Tier.MASTER;
                  }
                  if (tier !== Tier.MASTER) {
                    const quo2: number = Math.floor(rest / 100);
                    lp = rest % 100;
                    if (quo2 === 0) {
                      rank = Rank.IV;
                    } else if (quo2 === 1) {
                      rank = Rank.III;
                    } else if (quo2 === 2) {
                      rank = Rank.II;
                    } else if (quo2 >= 3) {
                      rank = Rank.I;
                    }
                  } else {
                    lp = rest;
                  }
                  if (tier === Tier.MASTER) {
                    return `${tier} + ${lp + (quo - 6) * 400}lp`;
                  } else {
                    return `${tier} ${rank}    ${lp}lp`;
                  }
                } else {
                  return "";
                }
              },
            },
          },
        },
        scales: {
          r: {
            ticks: {
              count: 0,
            },
          },
        },
      };
      this.rankRadarChartData = {
        labels: Object.keys(Role),
        datasets: [
          {
            label: "ally",
            fill: true,
            borderColor: this.$vuetify.theme.themes.light.colors.warn,
            data: this.getEloListByAlly(true),
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: this.$vuetify.theme.themes.light.colors.warn,
          },
          {
            label: "enemy",
            borderColor: this.$vuetify.theme.themes.light.colors.error,
            fill: true,
            data: this.getEloListByAlly(false),
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor:
              this.$vuetify.theme.themes.light.colors.error,
          },
        ],
      };
      console.log("this.rankRadarChartData");
      console.log(this.rankRadarChartData);
    },
    getEloListByAlly(ally: boolean): number[] {
      return this.lstParticipant
        .filter((p) => p.ally === ally)
        .map((p) => p.calculatedElo);
    },
    getkdaListByAlly(ally: boolean): number[] {
      return this.lstParticipant
        .filter((p) => p.ally === ally)
        .map((p) => Math.log(+p.kda.toFixed(2) + 1));
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
    getRankbyElo(elo: number): string {
      const lstRes: Participant[] = this.lstParticipant.filter(
        (p) => p.leaguePoints === elo
      );
      if (lstRes.length === 1) {
        return `${lstRes[0].tier}${lstRes[0].rank}`;
      } else {
        return "undefined";
      }
    },
    getEloByRoleAlly(role: string, ally: boolean): number {
      const p = this.getParticipantByRoleAndAlly(role, ally);
      if (p) {
        if (p.calculatedElo === 0) {
          eventBus.emit("ouvrir-popup", {
            text: `The ${
              ally ? "ally" : "ennemy"
            } ${role} didn't played this season`,
            type: MessageType.INFO,
          });
          return 0;
        } else {
          return p.calculatedElo;
        }
      } else {
        eventBus.emit("ouvrir-popup", {
          text: `The ${
            ally ? "ally" : "ennemy"
          } ${role} didn't played this season`,
          type: MessageType.INFO,
        });
        return 0;
      }
    },
    getParticipantByRoleAndAlly(
      role: string,
      ally: boolean
    ): Participant | undefined {
      const lstRes: Participant[] = this.lstParticipant.filter(
        (p) => p.teamPosition == role && p.ally === ally
      );
      if (lstRes.length === 1) {
        return lstRes[0];
      } else {
        eventBus.emit("ouvrir-popup", {
          text: `Error displaying a player `,
          type: MessageType.ERROR,
        });
        return undefined;
      }
    },
    createRankBarChart() {
      this.rankbarCharOption = {
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
            stacked: true,
            ticks: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          y: {
            stacked: true,
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
          tooltip: {
            callbacks: {
              footer: function (context) {
                return context[0].dataset.label;
              },
              label: function (context) {
                const elo = context.dataset.data[context.dataIndex];
                if (typeof elo === "number") {
                  const quo: number = Math.floor(elo / 400);
                  const rest: number = elo % 400;
                  let lp = 0;
                  let tier: Tier = Tier.IRON;
                  let rank: Rank = Rank.I;
                  if (quo === 1) {
                    tier = Tier.BRONZE;
                  } else if (quo === 2) {
                    tier = Tier.SILVER;
                  } else if (quo === 3) {
                    tier = Tier.GOLD;
                  } else if (quo === 4) {
                    tier = Tier.PLATINUM;
                  } else if (quo === 5) {
                    tier = Tier.DIAMOND;
                  } else if (quo >= 6) {
                    tier = Tier.MASTER;
                  }
                  if (tier !== Tier.MASTER) {
                    const quo2: number = Math.floor(rest / 100);
                    lp = rest % 100;
                    if (quo2 === 0) {
                      rank = Rank.IV;
                    } else if (quo2 === 1) {
                      rank = Rank.III;
                    } else if (quo2 === 2) {
                      rank = Rank.II;
                    } else if (quo2 >= 3) {
                      rank = Rank.I;
                    }
                  } else {
                    lp = rest;
                  }
                  if (tier === Tier.MASTER) {
                    return `${tier} + ${lp + (quo - 6) * 400}lp`;
                  } else {
                    return `${tier} ${rank}    ${lp}lp`;
                  }
                }
              },
            },
          },
        },
      };
      this.rankbarChartData = {
        labels: ["Ally", "Ennemy"],
        datasets: [
          {
            label: Role.TOP,
            data: [
              this.getEloByRoleAlly(Role.TOP, true),
              this.getEloByRoleAlly(Role.TOP, false),
            ],
            backgroundColor: this.$vuetify.theme.themes.light.colors.top,
          },
          {
            label: Role.JUNGLE,
            data: [
              this.getEloByRoleAlly(Role.JUNGLE, true),
              this.getEloByRoleAlly(Role.JUNGLE, false),
            ],
            backgroundColor: this.$vuetify.theme.themes.light.colors.jungle,
          },
          {
            label: Role.MIDDLE,
            data: [
              this.getEloByRoleAlly(Role.MIDDLE, true),
              this.getEloByRoleAlly(Role.MIDDLE, false),
            ],
            backgroundColor: this.$vuetify.theme.themes.light.colors.mid,
          },
          {
            label: Role.BOTTOM,
            data: [
              this.getEloByRoleAlly(Role.BOTTOM, true),
              this.getEloByRoleAlly(Role.BOTTOM, false),
            ],
            backgroundColor: this.$vuetify.theme.themes.light.colors.adc,
          },
          {
            label: Role.UTILITY,
            data: [
              this.getEloByRoleAlly(Role.UTILITY, true),
              this.getEloByRoleAlly(Role.UTILITY, false),
            ],
            backgroundColor: this.$vuetify.theme.themes.light.colors.supp,
          },
        ],
      };
    },
    createGraphBar(winRateAlly: number, winRateEnemy: number) {
      this.barCharOption = {
        indexAxis: "y",
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
.tabStat {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2em;
}
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
