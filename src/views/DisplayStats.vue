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
    <v-tab value="three">Season winrate</v-tab>
    <v-tab value="four">Your game</v-tab>
    <v-tab value="five">Overview</v-tab>
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
      <h3 class="sub-tittle">
        Winrate (actual season) per team of each player :
      </h3>
      <HorizontalBarChart
        :barCharData="winratebarChartData"
        :barCharOption="winratebarCharOption"
        v-if="
          winratebarChartData &&
          winratebarChartData.datasets &&
          winratebarChartData.datasets.length > 0
        "
      ></HorizontalBarChart>
      <RadarChart
        :radarChartData="winrateRadarChartData"
        :radarCharOption="winrateRadarChartOption"
        v-if="
          winrateRadarChartData &&
          winrateRadarChartData.datasets &&
          winrateRadarChartData.datasets.length > 0
        "
      ></RadarChart>
    </v-window-item>
    <v-window-item value="four">
      <v-select
        label="Select the statistic you want to display"
        :items="statAvailable"
        v-model="statSelected"
        class="selectStat"
        @update:model-value="changeSelectedStat()"
      ></v-select>

      <RadarChart
        :radarChartData="kdaRadarChartData"
        :radarCharOption="kdaRadarChartOption"
        :key="kdaKey"
        v-if="
          kdaRadarChartData &&
          kdaRadarChartData.datasets &&
          kdaRadarChartData.datasets.length > 0
        "
      ></RadarChart>
      <h2 :class="setResultClass()">
        {{ lstGames[0].win ? "Victory" : "Loose" }}
      </h2>
    </v-window-item>
    <v-window-item value="five">
      <v-select
        label="Select the lane you want to display"
        :items="roleAvailable"
        v-model="roleSelected"
        class="selectStat"
        @update:model-value="changeSelectedStat()"
      ></v-select>
      <OverViewCard
        :allyOverView="getOverviewByRoleAndAlly(roleSelected, true)"
        :enemyOverView="getOverviewByRoleAndAlly(roleSelected, false)"
      ></OverViewCard>
    </v-window-item>
  </v-window>
</template>

<script lang="ts">
import { Game } from "@/interfaces/game";
import { OverView } from "@/interfaces/overview";
import { defineComponent } from "vue";
import { Participant } from "@/interfaces/participant";
import Loading from "@/components/Loading.vue";
import HorizontalBarChart from "@/components/HorizontalBarChart.vue";
import RadarChart from "@/components/RadarChart.vue";
import OverViewCard from "@/components/OverViewCard.vue";
import eventBus from "@/plugins/eventBus";
import { ChartData, ChartOptions } from "chart.js";
import { Role } from "@/enumerations/Role";
import { RoleSelectable } from "@/enumerations/RoleSelectable";
import { MessageType } from "@/enumerations/messageType";
import { Tier } from "@/enumerations/Tier";
import { Rank } from "@/enumerations/Rank";

import { GameStatDisplay } from "@/enumerations/gameStatDisplay";

export default defineComponent({
  components: {
    Loading,
    HorizontalBarChart,
    RadarChart,
    OverViewCard,
  },
  data() {
    return {
      kdaKey: 0,
      statSelected: GameStatDisplay.KDA,
      statAvailable: Object.values(GameStatDisplay),
      roleAvailable: Object.values({ ...Role, ...RoleSelectable }),
      roleSelected: Role.TOP as Role | RoleSelectable,
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
      winratebarChartData: {} as ChartData<
        "bar",
        (number | [number, number] | null)[],
        unknown
      >,
      winratebarCharOption: {} as ChartOptions<"bar">,
      barCharOption: {} as ChartOptions<"bar">,
      rankbarCharOption: {} as ChartOptions<"bar">,
      radarChartData: {} as ChartData<"radar", (number | null)[], unknown>,
      radarChartOption: {} as ChartOptions<"radar">,
      rankRadarChartData: {} as ChartData<"radar", (number | null)[], unknown>,
      rankRadarChartOption: {} as ChartOptions<"radar">,
      kdaRadarChartData: {} as ChartData<"radar", (number | null)[], unknown>,
      kdaRadarChartOption: {} as ChartOptions<"radar">,
      winrateRadarChartData: {} as ChartData<
        "radar",
        (number | null)[],
        unknown
      >,
      winrateRadarChartOption: {} as ChartOptions<"radar">,
      overviewLst: [] as OverView[],
    };
  },

  mounted() {
    this.login = this.$store.state.login;
    this.lstGames = this.$store.state.lstGames;
    this.lstParticipant = this.$store.state.lstParticipant;

    console.log(this.lstParticipant);

    if (
      this.login.length === 0 ||
      this.lstGames.length === 0 ||
      this.lstParticipant.length === 0 ||
      this.lstParticipant.length > 10
    ) {
      this.$router.push({ name: "SearchLogin" });
    } else {
      this.initOverview();
      this.createGraphBar();
      this.createGraphRadar();
      this.createRankBarChart();
      this.createGraphRadarRank();
      this.createWinrateBarChart();
      this.createWinrateGraphRadar();
      this.createGraphRadarKda();
      this.fillOverViewTeamElo();

      console.log("lstOverview =>");
      console.log(this.overviewLst);
    }
  },

  methods: {
    getOverviewByRoleAndAlly(
      role: Role | RoleSelectable,
      isAlly: boolean
    ): OverView {
      return this.overviewLst.filter(
        (o) => o.isAlly === isAlly && o.role === role
      )[0];
    },

    fillOverViewTeamElo() {
      this.fillOverViewTeamEloByAlly(true);
      this.fillOverViewTeamEloByAlly(false);
    },
    fillOverViewTeamEloByAlly(isAlly: boolean) {
      const o = this.getOverViewByRoleAndAlly(RoleSelectable.ALL, isAlly);
      let totalElo = 0;
      this.lstParticipant
        .filter((p) => p.ally === isAlly)
        .forEach((p) => {
          totalElo = totalElo + p.calculatedElo;
        });

      totalElo = totalElo / 5;
      o.calculatedElo = totalElo;
      const quo: number = Math.floor(totalElo / 400);
      const rest: number = totalElo % 400;
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
        o.eloString = `${tier} + ${lp + (quo - 6) * 400}lp`;
      } else {
        o.eloString = `${tier} ${rank} ${lp.toFixed(0)}lp`;
      }
    },
    initOverview() {
      Object.values(Role).forEach((r: Role) => {
        this.createOverview(true, r);
        this.createOverview(false, r);
      });
      this.overviewLst.push({
        role: RoleSelectable.ALL,
        isAlly: true,
        winrateLastGame: 0,
        calculatedElo: 0,
        eloString: "",
        seasoninrate: 0,
        championPlayed: "",
      });
      this.overviewLst.push({
        role: RoleSelectable.ALL,
        isAlly: false,
        winrateLastGame: 0,
        calculatedElo: 0,
        eloString: "",
        seasoninrate: 0,
        championPlayed: "",
      });
    },
    createOverview(isAlly: boolean, role: Role) {
      const p = this.getParticipantByRoleAndAlly(role, isAlly);
      if (p) {
        this.overviewLst.push({
          role: role,
          isAlly: isAlly,
          winrateLastGame: 0,
          calculatedElo: p.calculatedElo,
          eloString: this.getEloString(p.tier, p.rank, p.leaguePoints),
          seasoninrate: 0,
          championPlayed: p.championPlayed,
        });
      } else {
        this.overviewLst.push({
          role: role,
          isAlly: isAlly,
          winrateLastGame: 0,
          calculatedElo: 0,
          eloString: "",
          seasoninrate: 0,
          championPlayed: "",
        });
      }
    },
    getEloString(tier: Tier, rank: Rank, lp: number): string {
      return `${tier} ${rank} ${lp}lp`;
    },
    changeSelectedStat() {
      switch (this.statSelected) {
        case GameStatDisplay.KDA:
          this.kdaRadarChartData.datasets.forEach((d) => {
            d.data = this.getkdaListByAlly(d.label === "ally");
          });
          break;
        case GameStatDisplay.DMG_DEALT:
          this.kdaRadarChartData.datasets.forEach((d) => {
            let res: number[] = [];
            Object.values(Role).forEach((r) => {
              const p = this.getParticipantByRoleAndAlly(r, d.label === "ally");
              if (p) {
                res.push(Math.log(+p.dmgDealt.toFixed(2) + 1));
              } else {
                res.push(0);
              }
            });
            d.data = res;
          });
          break;
        case GameStatDisplay.DMG_TAKEN:
          this.kdaRadarChartData.datasets.forEach((d) => {
            let res: number[] = [];
            Object.values(Role).forEach((r) => {
              const p = this.getParticipantByRoleAndAlly(r, d.label === "ally");
              if (p) {
                res.push(Math.log(+p.dmgTaken.toFixed(2) + 1));
              } else {
                res.push(0);
              }
            });
            d.data = res;
          });
          break;
        case GameStatDisplay.GOLD:
          this.kdaRadarChartData.datasets.forEach((d) => {
            let res: number[] = [];
            Object.values(Role).forEach((r) => {
              const p = this.getParticipantByRoleAndAlly(r, d.label === "ally");
              if (p) {
                res.push(Math.log(+p.gold.toFixed(2) + 1));
              } else {
                res.push(0);
              }
            });
            d.data = res;
          });
          break;
        case GameStatDisplay.LONGEST_TIME_LIVING:
          this.kdaRadarChartData.datasets.forEach((d) => {
            let res: number[] = [];
            Object.values(Role).forEach((r) => {
              const p = this.getParticipantByRoleAndAlly(r, d.label === "ally");
              if (p) {
                res.push(Math.log(+p.longestTimeLiving.toFixed(2) + 1));
              } else {
                res.push(0);
              }
            });
            d.data = res;
          });
          break;
        case GameStatDisplay.TOTAL_CS:
          this.kdaRadarChartData.datasets.forEach((d) => {
            let res: number[] = [];
            Object.values(Role).forEach((r) => {
              const p = this.getParticipantByRoleAndAlly(r, d.label === "ally");
              if (p) {
                res.push(Math.log(+p.totalcs.toFixed(2) + 1));
              } else {
                res.push(0);
              }
            });
            d.data = res;
          });
          break;
        case GameStatDisplay.VISION_SCORE:
          this.kdaRadarChartData.datasets.forEach((d) => {
            let res: number[] = [];
            Object.values(Role).forEach((r) => {
              const p = this.getParticipantByRoleAndAlly(r, d.label === "ally");
              if (p) {
                res.push(Math.log(+p.visionScore.toFixed(2) + 1));
              } else {
                res.push(0);
              }
            });
            d.data = res;
          });
          break;
      }
      this.kdaKey++;
    },
    setResultClass() {
      if (this.lstGames[0].win) {
        return "winTittle";
      } else {
        return "looseTittle";
      }
    },
    returnGames() {
      this.$router.push({ name: "DisplayGames" });
    },
    calculateWinrateByTeam(isAlly: boolean, isSeanson: boolean): number {
      let nbrGame = 0;
      let nbrWin = 0;

      this.lstParticipant
        .filter((p) => p.ally === isAlly)
        .forEach((p) => {
          if (isSeanson) {
            nbrWin = nbrWin + p.totalWinSeason;
            nbrGame = nbrGame + p.totalWinSeason + p.totalLooseSeason;
          } else {
            nbrWin = nbrWin + p.totalWin;
            nbrGame = nbrGame + p.totalWin + p.totalLoose;
          }
        });
      const res = (nbrWin * 100) / nbrGame;
      if (isSeanson) {
        this.getOverViewByRoleAndAlly(RoleSelectable.ALL, isAlly).seasoninrate =
          res;
      } else {
        this.getOverViewByRoleAndAlly(
          RoleSelectable.ALL,
          isAlly
        ).winrateLastGame = res;
      }
      return res;
    },
    calculateWinrateByPositionByTeam(
      isAlly: boolean,
      isSeason: boolean
    ): number[] {
      let winrateTop = -1;
      let winrateJungle = -1;
      let winrateMid = -1;
      let winrateAdc = -1;
      let winrateSupp = -1;
      this.lstParticipant
        .filter((p) => p.ally === isAlly)
        .forEach((p) => {
          let overView = this.getOverViewByRoleAndAlly(p.teamPosition, isAlly);
          switch (p.teamPosition) {
            case Role.TOP: {
              if (isSeason) {
                winrateTop =
                  (p.totalWinSeason * 100) /
                  (p.totalLooseSeason + p.totalWinSeason);
                overView.seasoninrate = winrateTop;
                //winrateTop = Math.log(winrateTop * 4) + 10;
              } else {
                winrateTop = (p.totalWin * 100) / (p.totalLoose + p.totalWin);
                overView.winrateLastGame = winrateTop;
              }
              break;
            }
            case Role.JUNGLE: {
              if (isSeason) {
                winrateJungle =
                  (p.totalWinSeason * 100) /
                  (p.totalLooseSeason + p.totalWinSeason);
                overView.seasoninrate = winrateJungle;
                //winrateJungle = Math.log(winrateJungle * 4) + 10;
              } else {
                winrateJungle =
                  (p.totalWin * 100) / (p.totalLoose + p.totalWin);
                overView.winrateLastGame = winrateJungle;
              }
              break;
            }
            case Role.MIDDLE: {
              if (isSeason) {
                winrateMid =
                  (p.totalWinSeason * 100) /
                  (p.totalLooseSeason + p.totalWinSeason);
                overView.seasoninrate = winrateMid;
                //winrateMid = Math.log(winrateMid * 4) + 10;
              } else {
                winrateMid = (p.totalWin * 100) / (p.totalLoose + p.totalWin);
                overView.winrateLastGame = winrateMid;
              }
              break;
            }
            case Role.BOTTOM: {
              if (isSeason) {
                winrateAdc =
                  (p.totalWinSeason * 100) /
                  (p.totalLooseSeason + p.totalWinSeason);
                overView.seasoninrate = winrateAdc;
                //winrateAdc = Math.log(winrateAdc * 4) + 10;
              } else {
                winrateAdc = (p.totalWin * 100) / (p.totalLoose + p.totalWin);
                overView.winrateLastGame = winrateAdc;
              }
              break;
            }
            case Role.UTILITY: {
              if (isSeason) {
                winrateSupp =
                  (p.totalWinSeason * 100) /
                  (p.totalLooseSeason + p.totalWinSeason);
                overView.seasoninrate = winrateSupp;
                //winrateSupp = Math.log(winrateSupp * 4) + 10;
              } else {
                winrateSupp = (p.totalWin * 100) / (p.totalLoose + p.totalWin);
                overView.winrateLastGame = winrateSupp;
              }
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
                const data = context.dataset.data[context.dataIndex];
                if (data) {
                  return (Math.exp(data) - 1).toFixed(2);
                } else {
                  return "";
                }
              },
              footer: function (context) {
                return context[0].dataset.label;
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
    createWinrateBarChart() {
      this.winratebarCharOption = {
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
      this.winratebarChartData = {
        labels: [""],
        datasets: [
          {
            label: "Ally",
            data: [this.calculateWinrateByTeam(true, true)],
            backgroundColor: this.$vuetify.theme.themes.light.colors.warn,
          },
          {
            label: "Enemy",
            data: [this.calculateWinrateByTeam(false, true)],
            backgroundColor: this.$vuetify.theme.themes.light.colors.error,
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
            min:
              this.lstParticipant.reduce((prev, curr) =>
                prev.calculatedElo < curr.calculatedElo ? prev : curr
              ).calculatedElo - 50,
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
    },
    getEloListByAlly(ally: boolean): number[] {
      let res: number[] = [];
      Object.values(Role).forEach((r) => {
        const p = this.getParticipantByRoleAndAlly(r, ally);
        if (p) {
          res.push(p.calculatedElo);
        } else {
          res.push(0);
        }
      });
      return res;
    },
    getkdaListByAlly(ally: boolean): number[] {
      let res: number[] = [];
      Object.values(Role).forEach((r) => {
        const p = this.getParticipantByRoleAndAlly(r, ally);
        if (p) {
          res.push(Math.log(+p.kda.toFixed(2) + 1));
        } else {
          res.push(0);
        }
      });
      return res;
    },
    createWinrateGraphRadar() {
      this.winrateRadarChartOption = {
        responsive: true,
        scales: {
          r: {
            ticks: {
              count: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const res = context.dataset.data[context.dataIndex];
                if (typeof res === "number") {
                  //return Math.pow(res, 1.0 / 9.0).toFixed(2);
                  return res.toFixed(2) + "%";
                } else {
                  return "";
                }
              },
            },
          },
        },
      };
      this.winrateRadarChartData = {
        labels: Object.keys(Role),
        datasets: [
          {
            label: "ally",
            fill: true,
            borderColor: this.$vuetify.theme.themes.light.colors.warn,
            data: this.calculateWinrateByPositionByTeam(true, true),
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: this.$vuetify.theme.themes.light.colors.warn,
          },
          {
            label: "enemy",
            borderColor: this.$vuetify.theme.themes.light.colors.error,
            fill: true,
            data: this.calculateWinrateByPositionByTeam(false, true),
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor:
              this.$vuetify.theme.themes.light.colors.error,
          },
        ],
      };
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
      const winRateAllyByPostion = this.calculateWinrateByPositionByTeam(
        true,
        false
      );
      const winRateEnemyByPostion = this.calculateWinrateByPositionByTeam(
        false,
        false
      );

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
          return Math.pow(p.calculatedElo / 100, 7);
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
                let elo = context.dataset.data[context.dataIndex];
                if (typeof elo === "number") {
                  elo = Math.pow(elo, 1.0 / 7.0) * 100;
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
                    return `${tier} + ${(lp + (quo - 6) * 400).toFixed(0)}lp`;
                  } else {
                    return `${tier} ${rank}    ${lp.toFixed(0)}lp`;
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
    getOverViewByRoleAndAlly(
      role: Role | RoleSelectable,
      isAlly: boolean
    ): OverView {
      return this.overviewLst.filter(
        (o) => o.isAlly === isAlly && o.role === role
      )[0];
    },
    createGraphBar() {
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
            data: [this.calculateWinrateByTeam(true, false)],
            backgroundColor: this.$vuetify.theme.themes.light.colors.warn,
          },
          {
            label: "Enemy",
            data: [this.calculateWinrateByTeam(false, false)],
            backgroundColor: this.$vuetify.theme.themes.light.colors.error,
          },
        ],
      };
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

.winTittle {
  color: rgb(var(--v-theme-secondary));
}

.looseTittle {
  color: rgb(var(--v-theme-error));
}

.sub-tittle-game {
  width: 80%;
  display: flex;
  margin-right: auto;
  margin-left: auto;
}

.selectStat {
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
  width: 20%;
}
</style>
