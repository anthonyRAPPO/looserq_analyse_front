<template>
  <Loading v-if="isLoading"></Loading>
  <h2>Stats</h2>
</template>

<script lang="ts">
import { Game } from "@/interfaces/game";
import { GameBoxSelectEvent } from "@/interfaces/gameBoxSelectEvent";
import { defineComponent } from "vue";
import * as apiService from "@/services/apiService";
import { Participant } from "@/interfaces/participant";
import Loading from "@/components/Loading.vue";
import eventBus from "@/plugins/eventBus";

export default defineComponent({
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      login: "",
      lstGames: [] as Game[],
      lstParticipant: [] as Participant[],
    };
  },

  mounted() {
    this.login = this.$store.state.login;
    this.lstGames = this.$store.state.lstGames;
    this.lstParticipant = this.$store.state.lstParticipant;
    console.log("mounted");

    console.log(this.login);
    console.log(this.lstGames);
    console.log(this.lstParticipant);

    if (
      this.login.length === 0 ||
      this.lstGames.length === 0 ||
      this.lstParticipant.length === 0
    ) {
      this.$router.push({ name: "SearchLogin" });
    }
  },
  /*methods: {},*/
});
</script>

<style scoped></style>
