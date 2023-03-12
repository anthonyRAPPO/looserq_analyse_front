<template>
  <div>
    <Loading v-if="isLoading" :value="-1"></Loading>
    <v-row align="center" class="welwomeText">
      <v-col cols="12" class="looserQIntro">
        <h1>Welcome to Losers Queue Inspector !</h1>
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
        <h2 class="textIntro">
          Analyse your last LOL games to see if you are in Losers Queue
        </h2>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col xl="1" lg="1" md="2" sm="2" cols="4">
        <v-select
          :items="lstPlatform"
          v-model="platformSelected"
          label="Region"
          :disabled="isLoading"
        ></v-select>
      </v-col>
      <v-col xl="3" lg="3" md="5" sm="5" cols="7">
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
    <div class="loserQQuestion">
      <h2>What is losers Queue ?</h2>
    </div>
    <v-row class="loserQDef">
      <v-col cols="1"
        ><v-icon icon="mdi-format-quote-open" class="quoteOpen"></v-icon
      ></v-col>
      <v-col cols="10"
        ><h4>
          In League of Legends (LoL), the term "loser queue" refers to a
          hypothetical matchmaking system in which players who have lost
          multiple games in a row are intentionally matched with other losing
          players in an attempt to keep them from winning.<br />
          It is important to note that there is no actual evidence that such a
          system exists in LoL.
        </h4></v-col
      >
      <v-col cols="1"
        ><v-icon icon="mdi-format-quote-close" class="quoteClose"></v-icon
      ></v-col>
    </v-row>
    <h3 class="byCGPT">- by ChatGPT</h3>
    <div class="loserQQuestion">
      <h2>What is Losers Queue Inspector ?</h2>
    </div>

    <v-row class="loserQDef">
      <v-col cols="1"
        ><v-icon icon="mdi-format-quote-open" class="quoteOpen"></v-icon
      ></v-col>
      <v-col cols="10"
        ><h4>
          Losers Queue Inspector is a website designed to analyze your latest
          ranked games in League of Legends (LoL). The aim is to compare role by
          role the players in the game and draw your own conclusions.<br />
          You will have access to the rank, winrate of the season, winrate over
          the last 10 games and average kda over the last 10 games.
        </h4></v-col
      >
      <v-col cols="1"
        ><v-icon icon="mdi-format-quote-close" class="quoteClose"></v-icon
      ></v-col>
    </v-row>
    <h3 class="byCGPT">- by Me</h3>
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
              this.$store.commit("SET_PLATFORM", this.platformSelected);
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
          text: "The name is incorrect",
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
.loserQQuestion {
  margin-top: 5em;
  color: rgb(var(--v-theme-secondary));
}

.loserQDef {
  margin-top: 1em;
}

.byCGPT {
  color: rgb(var(--v-theme-secondary));
  margin-top: 1em;
  font-weight: bold;
}

.loserQDef h4 {
  text-align: start;
}
.loserQDef br {
  margin-bottom: 0.5em;
}

.loserQDef i {
  font-size: 2em;
}

.welwomeText {
  margin-top: 2em;
}
#logo {
  margin-right: auto;
  margin-left: auto;
  width: 15em;
}

.arrow {
  margin-top: 1em;
}

.textIntro {
  margin-left: 1em;
  margin-right: 1em;
}

@media only screen and (max-width: 600px) {
  .looserQIntro {
    display: none;
  }
  #logo {
    width: 12em;
  }

  .quoteClose {
    right: 25px;
  }

  .textIntro {
    font-size: 1em;
  }
}
</style>
