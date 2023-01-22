<template>
  <div>DISPLAY GAMES</div>
  <div>
    <v-img
      :lazy-src="getSrcImg()"
      :src="getSrcImg()"
      max-height="146"
      max-width="250"
      v-if="lstGames && lstGames.length > 0"
    ></v-img>
  </div>
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
  methods: {
    getSrcImg() {
      return `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${this.lstGames[0].championPlayed}.png`;
    },
  },
});
</script>

<style scoped></style>
