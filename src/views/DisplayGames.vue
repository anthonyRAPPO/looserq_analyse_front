<template>
  <div>DISPLAY GAMES</div>
  <div v-if="lstGames.length > 0">
    <game-box
      :game="game"
      v-for="game in lstGames"
      v-bind:key="game.id"
    ></game-box>
  </div>
</template>

<script lang="ts">
import { Game } from "@/interfaces/game";
import { defineComponent } from "vue";
import GameBox from "@/components/GameBox.vue";

export default defineComponent({
  components: {
    GameBox,
  },
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
      this.$router.push({ name: "SearchLogin" });
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
