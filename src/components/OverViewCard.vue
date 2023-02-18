<template>
  <v-card class="cardOverview" elevation="5">
    <v-row>
      <v-col cols="6">
        <div class="ally"><h3>Ally</h3></div>
        <div class="imgContainer" v-if="displayImg(allyOverView.role)">
          <v-img
            :src="getSrcImgByName(allyOverView.championPlayed)"
            alt="champ participant"
            class="img"
          ></v-img>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="enemy"><h3>Enemy</h3></div>
        <div class="imgContainer" v-if="displayImg(enemyOverView.role)">
          <v-img
            :src="getSrcImgByName(enemyOverView.championPlayed)"
            alt="champ participant"
            class="img"
          ></v-img>
        </div>
      </v-col>
    </v-row>
    <v-row class="titleStat">
      <v-col cols="12"> Last 10 games winrate </v-col>
    </v-row>
    <v-row class="statBar">
      <v-col md="2" sm="3"
        ><span
          :class="
            getClassSpan(
              true,
              allyOverView.winrateLastGame,
              enemyOverView.winrateLastGame
            )
          "
          >{{ allyOverView.winrateLastGame.toFixed(2) }}%</span
        ></v-col
      >
      <v-col md="8" sm="6">
        <v-progress-linear
          :model-value="getRatioLastGames()"
          height="25"
          class="progress"
          rounded
        >
        </v-progress-linear>
      </v-col>
      <v-col md="2" sm="3"
        ><span
          :class="
            getClassSpan(
              false,
              allyOverView.winrateLastGame,
              enemyOverView.winrateLastGame
            )
          "
          >{{ enemyOverView.winrateLastGame.toFixed(2) }}%</span
        ></v-col
      >
    </v-row>
    <v-row class="titleStat">
      <v-col cols="12"> Rank this season </v-col>
    </v-row>
    <v-row class="statBar">
      <v-col md="2" sm="3"
        ><span
          :class="
            getClassSpan(
              true,
              allyOverView.calculatedElo,
              enemyOverView.calculatedElo
            )
          "
          >{{ allyOverView.eloString }}</span
        ></v-col
      >
      <v-col md="8" sm="6">
        <v-progress-linear
          :model-value="getRatioRank()"
          height="25"
          class="progress"
          rounded
        >
        </v-progress-linear>
      </v-col>
      <v-col md="2" sm="3"
        ><span
          :class="
            getClassSpan(
              false,
              allyOverView.calculatedElo,
              enemyOverView.calculatedElo
            )
          "
          >{{ enemyOverView.eloString }}</span
        ></v-col
      >
    </v-row>
    <v-row class="titleStat">
      <v-col cols="12"> Winrate this season </v-col>
    </v-row>
    <v-row class="statBar">
      <v-col md="2" sm="3"
        ><span
          :class="
            getClassSpan(
              true,
              allyOverView.seasoninrate,
              enemyOverView.seasoninrate
            )
          "
          >{{ allyOverView.seasoninrate.toFixed(2) }}%</span
        ></v-col
      >
      <v-col md="8" sm="6">
        <v-progress-linear
          :model-value="getRatioWinrate()"
          height="25"
          class="progress"
          rounded
        >
        </v-progress-linear>
      </v-col>
      <v-col md="2" sm="3"
        ><span
          :class="
            getClassSpan(
              false,
              allyOverView.seasoninrate,
              enemyOverView.seasoninrate
            )
          "
          >{{ enemyOverView.seasoninrate.toFixed(2) }}%</span
        ></v-col
      >
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import { OverView } from "@/interfaces/overview";
import * as utilService from "@/services/utilService";
import { Role } from "@/enumerations/Role";
import { RoleSelectable } from "@/enumerations/RoleSelectable";

export default defineComponent({
  name: "OverViewCard",
  props: {
    allyOverView: { required: true, type: Object as PropType<OverView> },
    enemyOverView: { required: true, type: Object as PropType<OverView> },
  },
  data() {
    return {};
  },

  methods: {
    displayImg(role: Role | RoleSelectable) {
      console.log(role !== RoleSelectable.ALL);

      return role !== RoleSelectable.ALL;
    },
    getClassSpan(isAlly: boolean, ally: number, enemy: number): string {
      if (ally === enemy) {
        if (isAlly) {
          return "allyColor";
        } else {
          return "enemyColor";
        }
      } else if (ally > enemy) {
        if (isAlly) {
          return "winColor";
        } else {
          return "enemyColor";
        }
      } else {
        if (isAlly) {
          return "allyColor";
        } else {
          return "winColor";
        }
      }
    },
    getSrcImgByName(champ: string | undefined) {
      if (champ) {
        return utilService.getSrcImgByName(champ);
      }
    },
    getRatioLastGames() {
      return (
        (Math.pow(this.allyOverView.winrateLastGame, 2.5) * 100) /
        (Math.pow(this.allyOverView.winrateLastGame, 2.5) +
          Math.pow(this.enemyOverView.winrateLastGame, 2.5))
      );
    },
    getRatioRank() {
      return (
        (Math.pow(this.allyOverView.calculatedElo, 5) * 100) /
        (Math.pow(this.allyOverView.calculatedElo, 5) +
          Math.pow(this.enemyOverView.calculatedElo, 5))
      );
    },
    getRatioWinrate() {
      return (
        (Math.pow(this.allyOverView.seasoninrate, 2.5) * 100) /
        (Math.pow(this.allyOverView.seasoninrate, 2.5) +
          Math.pow(this.enemyOverView.seasoninrate, 2.5))
      );
    },
  },
});
</script>

<style scoped>
.titleStat .v-row {
  padding-bottom: 0;
  margin-bottom: 0;
}

.titleStat .v-col {
  padding-bottom: 0;
  margin-bottom: 0;
}

.statBar {
  margin-top: 0;
  padding-top: 0;
}
.cardOverview {
  background-color: rgb(var(--v-theme-background));
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
  color: rgb(var(--v-theme-primary));
  padding: 1em;
}

.allyColor {
  color: rgb(var(--v-theme-primary));
}

.enemyColor {
  color: rgb(var(--v-theme-error));
}

.winColor {
  color: rgb(var(--v-theme-secondary));
}

.ally {
  color: rgb(var(--v-theme-primary));
  margin-bottom: 1em;
}
.enemy {
  color: rgb(var(--v-theme-error));
  margin-bottom: 1em;
}

.progress {
  background-color: rgb(var(--v-theme-error));
  color: rgb(var(--v-theme-primary));
}

.img {
  width: 100px;
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (max-width: 1100px) {
  .cardOverview {
    width: 98%;
    padding: 0.5em;
  }
}

@media only screen and (max-width: 900px) {
  .allyColor {
    font-size: 0.8em;
  }

  .enemyColor {
    font-size: 0.8em;
  }

  .winColor {
    font-size: 0.8em;
  }
}
</style>
