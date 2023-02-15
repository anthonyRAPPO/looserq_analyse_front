<template>
  <v-card v-if="!error" :class="getClassOfCard()" elevation="10">
    <v-row>
      <v-col cols="3">
        <div class="containerCenter">
          <div class="center">
            <div class="containerWinSpan">
              <span class="winSpan">{{ game.win ? "Win" : "Defeat" }}</span>
            </div>
            <div class="containerDaysAgo">
              <span class="daysago">{{ getStringDateFromNumber() }}</span>
            </div>
          </div>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="containerimgUser">
          <v-img
            :src="getSrcImgByGame()"
            class="imgUser"
            aspect-ratio="1"
            alt="champ user"
          ></v-img>
        </div>
        <div>
          <span>
            {{ getKda() }}
          </span>
        </div>
      </v-col>
      <v-col cols="6">
        <v-row v-for="role in lstRole" :key="role" class="rowParticipant">
          <v-col cols="5" class="colParticipant participantWin">
            <span class="participantName">{{
              setLenghtName(
                getParticipantByRoleAndWin(role, true)?.summonerName
              )
            }}</span></v-col
          >
          <v-col cols="1" class="colParticipant">
            <v-img
              :src="
                getSrcImgByName(
                  getParticipantByRoleAndWin(role, true)?.championPlayed
                )
              "
              class="imgParticipants"
              alt="champ participant"
            ></v-img
          ></v-col>
          <v-col cols="1" class="colParticipant"
            ><v-img
              :src="
                getSrcImgByName(
                  getParticipantByRoleAndWin(role, false)?.championPlayed
                )
              "
              class="imgParticipants"
              alt="champ participant"
            ></v-img
          ></v-col>
          <v-col cols="5" class="colParticipant participantLoose"
            ><span class="participantName">{{
              setLenghtName(
                getParticipantByRoleAndWin(role, false)?.summonerName
              )
            }}</span></v-col
          >
        </v-row>
      </v-col>
      <v-col cols="1">
        <div class="containerCheckBox">
          <div class="centerCheckBox">
            <v-checkbox
              :disabled="isDesabled"
              color="background"
              v-model="selected"
              hide-details
              @change="gameSelectionChange()"
            ></v-checkbox>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Game } from "@/interfaces/game";
import * as utilService from "@/services/utilService";
import { Role } from "@/enumerations/Role";
import { Participant } from "@/interfaces/participant";
import eventBus from "@/plugins/eventBus";
import { MessageType } from "@/enumerations/messageType";
import type { PropType } from "vue";

export default defineComponent({
  name: "GameBox",
  props: {
    game: { required: true, type: Object as PropType<Game> },
    analysed: { required: true, type: Boolean },
    isSelected: { required: true, type: Boolean },
    isDesabled: { required: true, type: Boolean },
  },
  data() {
    return {
      lstRole: [] as string[],
      error: false,
      selected: false,
    };
  },
  mounted() {
    this.lstRole = Object.keys(Role);
    this.selected = this.isSelected;
    eventBus.on("unselect_game", (event) => this.unselectGame(event));
  },
  methods: {
    getSrcImgByGame(): string {
      return utilService.getSrcImgByGame(this.game);
    },
    unselectGame(id: unknown) {
      if (id && typeof id === "string" && this.game.id === id) {
        this.selected = false;
      }
    },
    getSrcImgByName(champ: string | undefined) {
      if (champ) {
        return utilService.getSrcImgByName(champ);
      }
    },
    setLenghtName(name: string | undefined): string | undefined {
      if (name && name.length > 11) {
        return name.substring(0, 11).concat("...");
      } else {
        return name;
      }
    },
    getStringDateFromNumber(): string {
      return utilService.getStringDateFromNumber(this.game.timeStampCreation);
    },
    getKda(): string {
      return `${this.game.kills}/${this.game.deaths}/${this.game.assists}`;
    },
    getClassOfCard() {
      return this.game.win ? "cardGame winCard" : "cardGame looseCard";
    },
    gameSelectionChange() {
      console.log("emit");
      this.$emit("changeSelectionGame", {
        selected: this.selected,
        game: this.game,
      });
    },
    getParticipantByRoleAndWin(role: string, win: boolean) {
      const lstRes: Participant[] = this.game.lstParticipants.filter(
        (p) => p.teamPosition == role && p.win === win
      );
      if (lstRes.length === 1) {
        return lstRes[0];
      } else {
        eventBus.emit("ouvrir-popup", {
          text: "Error displaying a game ",
          type: MessageType.ERROR,
        });
        this.error = true;
      }
    },
  },
});
</script>

<style scoped>
.imgUser {
  width: auto;
  height: 5em;
  margin: 0;
}

.containerimgUser {
  margin-top: 0.5em;
  margin-bottom: 0.25em;
}

.imgParticipants {
  max-width: 1.2em;
  margin-top: 3px;
  margin-left: auto;
  margin-right: auto;
}
.cardGame {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
  margin-bottom: 1em;
  padding: 0.2em;
  background-color: rgb(var(--v-theme-primary));
}

.winCard {
  background-color: rgb(var(--v-theme-warn));
}

.looseCard {
  background-color: rgb(var(--v-theme-error));
}

.rowParticipant {
  margin: 0;
}

.colParticipant {
  margin: 0;
  padding: 0;
}
:deep(.v-row + .v-row) {
  margin-top: 0;
}

.participantName {
  font-size: 0.8em;
}

.containerCenter {
  height: 6em;
  position: relative;
}

.containerCheckBox {
  height: 100%;
  position: relative;
}

.containerDaysAgo {
  margin-top: 0.5em;
}

.daysago {
  font-size: 0.9em;
}
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100%;
}

.centerCheckBox {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100%;
}

.containerWinSpan {
  margin-top: 1em;
}

.winSpan {
  font-size: 1.7em;
  font-weight: bold;
}

.participantLoose {
  text-align: left;
  padding-left: 0.8em;
}

.participantWin {
  text-align: right;
  padding-right: 0.8em;
}
</style>
