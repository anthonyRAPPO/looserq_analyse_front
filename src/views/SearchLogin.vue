<template>
  <div>
    <Loading v-if="isLoading"></Loading>
    <v-row align="center" class="welwomeText">
      <v-col cols="12">
        <h1>Welcome to LooserQAnalyse!</h1>
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
        Analyse
      </v-btn>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Platform } from "@/enumerations/platform";
import { defineComponent } from "vue";
import * as gameService from "@/services/gameService";
import * as utilService from "@/services/utilService";
import { Queue } from "@/enumerations/queue";
import { Game } from "@/interfaces/game";
import Loading from "@/components/Loading.vue";

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
        gameService
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
              console.log("TODO");
            } else {
              this.$store.commit("SET_LOGIN", this.nameSelected);
              this.$store.commit("SET_GAMES", lstGame);
              this.$router.push({ name: "DisplayGames" });
            }
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
</style>
