<template>
  <Loading v-if="isLoading"></Loading>
  <h2 class="textSelection">Select the game(s) you want to analyse</h2>
  <v-btn
    class="btnBackLogin"
    icon
    size="x-large"
    color="secondary"
    variant="outlined"
    @click="returnLogin()"
  >
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
  <v-btn
    class="btnAnalyse"
    append-icon="mdi-magnify"
    rounded="lg"
    size="x-large"
    color="secondary"
    variant="outlined"
    @click="launchGameAnalyse()"
    :disabled="lstGamesSelected.length == 0"
  >
    Start the Analyse
  </v-btn>
  <div v-if="lstGames.length > 0">
    <game-box
      :game="game"
      :is-selected="true"
      :analysed="false"
      :isDesabled="isLoading"
      v-for="game in lstGames"
      :key="game.id"
      @changeSelectionGame="gameSelectionChange($event)"
    ></game-box>
  </div>
</template>

<script lang="ts">
import { Game } from "@/interfaces/game";
import { GameBoxSelectEvent } from "@/interfaces/gameBoxSelectEvent";
import { defineComponent } from "vue";
import GameBox from "@/components/GameBox.vue";
import * as apiService from "@/services/apiService";
import { Queue } from "@/enumerations/queue";
import { Platform } from "@/enumerations/platform";
import { Participant } from "@/interfaces/participant";
import Loading from "@/components/Loading.vue";
import eventBus from "@/plugins/eventBus";
import { MessageType } from "@/enumerations/messageType";

export default defineComponent({
  components: {
    GameBox,
    Loading,
  },
  data() {
    return {
      login: "",
      lstGames: [] as Game[],
      lstGamesSelected: [] as Game[],
      isLoading: false,
    };
  },

  mounted() {
    this.login = this.$store.state.login;
    this.lstGames = this.$store.state.lstGames;
    this.lstGamesSelected = this.$store.state.lstGames;
    if (this.login.length === 0 || this.lstGames.length === 0) {
      this.$router.push({ name: "SearchLogin" });
    }
  },
  methods: {
    gameSelectionChange(event: GameBoxSelectEvent) {
      console.log(event);
      const isInList: boolean = this.isgameInSelectedList(event.game);
      if (event.selected && !isInList) {
        this.lstGamesSelected.push(event.game);
      } else if (!event.selected && isInList) {
        this.lstGamesSelected = this.lstGamesSelected.filter(
          (g) => g.id !== event.game.id
        );
      }
      console.log("this.lstGamesSelected");
      console.log(this.lstGamesSelected);
    },
    launchGameAnalyse() {
      this.isLoading = true;
      /*apiService
        .getParticipantByGames(
          this.lstGamesSelected,
          Queue.RANKED_SOLO,
          Platform.EUW,
          10
        )
        .then((res) => {
          let lstParticipant: Participant[] = res.data;
          console.log("lstParticipant");
          console.log(lstParticipant);
          this.isLoading = false;
        })
        .catch((error) => {
          console.log("2");
          console.log(error);

          this.isLoading = false;
          if (error && error.response && error.response.status) {
            switch (error.response.status) {
              case 400: {
                eventBus.emit("ouvrir-popup", {
                  text: "Invalid parameters sent  ",
                  type: MessageType.ERROR,
                });
                break;
              }
              case 429: {
                eventBus.emit("ouvrir-popup", {
                  text: "Too much request sent to RIOT API, please try later",
                  type: MessageType.INFO,
                });
                break;
              }
              case 500: {
                eventBus.emit("ouvrir-popup", {
                  text: "Error requesting RIOT API",
                  type: MessageType.INFO,
                });
                break;
              }
            }
          } else {
            eventBus.emit("ouvrir-popup", {
              text: "Error during request",
              type: MessageType.ERROR,
            });
          }
        });*/
      let lstParticipant: Participant[] = apiService.getParticipantByPass();
      console.log("lstParticipant");
      console.log(lstParticipant);
      this.isLoading = false;
      this.$store.commit("SET_PARTICIPANT", lstParticipant);
      this.$router.push({ name: "DisplayStats" });
    },
    returnLogin() {
      this.$router.push({ name: "SearchLogin" });
    },
    isgameInSelectedList(gameToCheck: Game): boolean {
      return (
        this.lstGamesSelected.filter((g) => g.id === gameToCheck.id).length > 0
      );
    },
  },
});
</script>

<style scoped>
.btnAnalyse {
  position: fixed;
  bottom: 5%;
  right: 5%;
}

.btnBackLogin {
  position: fixed;
  top: 2%;
  left: 2%;
}

.textSelection {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
