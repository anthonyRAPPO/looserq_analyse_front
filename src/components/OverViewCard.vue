<template>
  <v-card class="cardOverview" elevation="5">
    <v-row>
      <v-col cols="6">
        <div class="ally"><h3>Ally</h3></div>
        <div class="imgContainer" :v-if="displayImg(allyOverView.role)">
          <v-img
            :src="getSrcImgByName(allyOverView.championPlayed)"
            alt="champ participant"
            class="img"
          ></v-img>
        </div>
      </v-col>
      <v-col cols="6">
        <div class="enemy"><h3>Enemy</h3></div>
        <div class="imgContainer" :v-if="displayImg(enemyOverView.role)">
          <v-img
            :src="getSrcImgByName(enemyOverView.championPlayed)"
            alt="champ participant"
            class="img"
          ></v-img>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12"> Last 10 games winrate </v-col>
    </v-row>
    <v-row>
      <v-col cols="1"
        ><span
          :class="
            getClassSpan(
              true,
              allyOverView.winrateLastGame,
              enemyOverView.winrateLastGame
            )
          "
          >{{ allyOverView.winrateLastGame }}%</span
        ></v-col
      >
      <v-col cols="10">
        <v-progress-linear
          :model-value="getRatioLastGames()"
          height="25"
          class="progress"
        >
        </v-progress-linear>
      </v-col>
      <v-col cols="1"
        ><span
          :class="
            getClassSpan(
              false,
              allyOverView.winrateLastGame,
              enemyOverView.winrateLastGame
            )
          "
          >{{ enemyOverView.winrateLastGame }}%</span
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
        (this.allyOverView.winrateLastGame * 100) /
        (this.allyOverView.winrateLastGame + this.enemyOverView.winrateLastGame)
      );
    },
    getRatioRank() {
      return (
        (this.allyOverView.calculatedElo * 100) /
        (this.allyOverView.calculatedElo + this.enemyOverView.calculatedElo)
      );
    },
    getRatioWinrate() {
      return (
        (this.allyOverView.winrateLastGame * 100) /
        (this.allyOverView.winrateLastGame + this.enemyOverView.winrateLastGame)
      );
    },
  },
});
</script>

<style scoped>
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
</style>
