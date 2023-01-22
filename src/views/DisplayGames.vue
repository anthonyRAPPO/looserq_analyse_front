<template>
  <div>DISPLAY GAMES</div>
</template>

<script lang="ts">
import { Game } from "@/interfaces/game";
import { defineComponent } from "vue";

export default defineComponent({
  name: "DisplayGames",
  data() {
    return {
      login: "",
      lstGames: [] as Game[],
    };
  },
  mounted() {
    this.login = this.$store.state.login;
    this.lstGames = this.$store.state.lstGames;
    if (this.login.length === 0 || this.lstGames.length === 0) {
      console.log("TODO");
    } else {
      console.log("this.lstGames");
      console.log(this.lstGames);
      console.log("this.login");
      console.log(this.login);
    }
  },
});
</script>

<style scoped></style>
