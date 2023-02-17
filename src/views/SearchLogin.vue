<template>
  <div>
    <Loading v-if="isLoading"></Loading>
    <v-row align="center" class="welwomeText">
      <v-col cols="12">
        <h1>Welcome to LooserQAnalyse!</h1>
      </v-col>
      <v-col cols="12">
        <v-img
          id="logo"
          :src="require('../assets/logoMonkey3.png')"
          aspect-ratio="1"
          alt="logo"
        ></v-img>
      </v-col>
      <v-col cols="12">
        <h2>Analyse your last games to know if you are in looser Q</h2>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="1">
        <v-select
          :items="lstPlatform"
          v-model="platformSelected"
          label="Region"
          :disabled="isLoading"
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-text-field
          label="Name"
          v-model="nameSelected"
          :disabled="isLoading"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn
        append-icon="mdi-magnify"
        rounded="lg"
        size="x-large"
        color="secondary"
        variant="outlined"
        @click="searchGamesByLoginAndRegion()"
        :disabled="desableSearch()"
      >
        Search
      </v-btn>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Platform } from "@/enumerations/platform";
import { defineComponent } from "vue";
import * as apiService from "@/services/apiService";
import * as utilService from "@/services/utilService";
import { Queue } from "@/enumerations/queue";
import { Game } from "@/interfaces/game";
import Loading from "@/components/Loading.vue";
import eventBus from "@/plugins/eventBus";
import { MessageType } from "@/enumerations/messageType";

export default defineComponent({
  name: "SearchLogin",
  components: {
    Loading,
  },
  data() {
    return {
      platformSelected: Platform.EUW,
      lstPlatform: Object.values(Platform),
      nameSelected: "",
      isLoading: false,
    };
  },
  methods: {
    searchGamesByLoginAndRegion() {
      this.isLoading = true;
      if (this.isCorrectName()) {
        const dateFin: Date = new Date();
        let dateDebut: Date = new Date();
        dateDebut.setDate(dateFin.getDate() - 200);
        apiService
          .getHistoryByLoginQueueDateCountRegion(
            this.nameSelected,
            Queue.RANKED_SOLO,
            utilService.convertDateToEpochSecond(dateDebut),
            utilService.convertDateToEpochSecond(dateFin),
            10,
            this.platformSelected
          )
          .then((res) => {
            this.isLoading = false;
            let lstGame: Game[] = res.data;
            if (lstGame.length === 0) {
              eventBus.emit("ouvrir-popup", {
                text: "No games found for this user ",
                type: MessageType.INFO,
              });
            } else {
              this.$store.commit("SET_LOGIN", this.nameSelected);
              this.$store.commit("SET_GAMES", lstGame);
              this.$router.push({ name: "DisplayGames" });
            }
          })
          .catch((error) => {
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
                case 404: {
                  eventBus.emit("ouvrir-popup", {
                    text: "Can't find player for this login and region",
                    type: MessageType.INFO,
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
          });
      } else {
        eventBus.emit("ouvrir-popup", {
          text: "Name is incorrect",
          type: MessageType.ERROR,
        });
      }
    },
    isCorrectName() {
      return this.nameSelected.length > 0;
    },
    desableSearch() {
      return !this.isCorrectName() || this.isLoading;
    },
  },
});
</script>

<style scoped>
.welwomeText {
  margin-top: 2em;
}
#logo {
  margin-right: auto;
  margin-left: auto;
  width: 15em;
}
</style>
