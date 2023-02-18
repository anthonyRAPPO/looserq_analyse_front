<template>
  <Loading v-if="isLoading"></Loading>
  <div class="containerTextSelection">
    <h2 class="textSelection">Select the game you want to analyse</h2>
  </div>
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
    :variant="getVariantByScreenSize()"
    @click="launchGameAnalyse()"
    :disabled="!gameSelected || !gameSelected.id"
  >
    Start the Analyse
  </v-btn>
  <div v-if="lstGames.length > 0">
    <game-box
      :game="game"
      :is-selected="false"
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
import { tSMethodSignature } from "@babel/types";

export default defineComponent({
  components: {
    GameBox,
    Loading,
  },
  data() {
    return {
      login: "",
      lstGames: [] as Game[],
      gameSelected: {} as Game | undefined,
      isLoading: false,
      platformSelected: {} as Platform,
    };
  },

  mounted() {
    this.login = this.$store.state.login;
    this.lstGames = this.$store.state.lstGames;
    this.platformSelected = this.$store.state.platformSelected;
    if (
      this.login.length === 0 ||
      this.lstGames.length === 0 ||
      this.platformSelected.length === 0
    ) {
      this.$router.push({ name: "SearchLogin" });
    }
  },
  methods: {
    getVariantByScreenSize() {
      if (window.screen.width > 1350) {
        return "outlined";
      } else {
        return "elevated";
      }
    },
    gameSelectionChange(event: GameBoxSelectEvent) {
      if (this.gameSelected && this.gameSelected.id) {
        //une game est déja selectionnée
        if (this.gameSelected.id === event.game.id) {
          this.gameSelected = undefined;
        } else {
          eventBus.emit("unselect_game", this.gameSelected.id);
          this.gameSelected = event.game;
        }
      } else {
        //aucune game n'est selectionnée
        this.gameSelected = event.game;
      }
    },
    launchGameAnalyse() {
      if (this.gameSelected && this.gameSelected.id) {
        this.isLoading = true;
        /*apiService
          .getParticipantByGame(
            this.gameSelected,
            Queue.RANKED_SOLO,
            this.platformSelected,
            10
          )
          .then((res) => {
            let lstParticipant: Participant[] = res.data;
            console.log("lstParticipant");
            lstParticipant;
            this.isLoading = false;
            this.$store.commit("SET_PARTICIPANT", lstParticipant);
            this.$router.push({ name: "DisplayStats" });
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
        this.isLoading = false;
        this.$store.commit("SET_PARTICIPANT", lstParticipant);
        this.$router.push({ name: "DisplayStats" });
      }
    },
    returnLogin() {
      this.$router.push({ name: "SearchLogin" });
    },
  },
});
</script>

<style scoped>
.btnAnalyse {
  position: fixed;
  bottom: 5%;
  right: 5%;
  z-index: 2;
}

.btnBackLogin {
  position: fixed;
  top: 2%;
  left: 2%;
  z-index: 2;
}

.textSelection {
  margin-top: 1em;
  margin-bottom: 1em;
}

@media only screen and (max-width: 1350px) {
  .btnAnalyse {
    left: 50%;
    margin-left: -140px;
  }
}

@media only screen and (max-width: 600px) {
  .containerTextSelection {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
