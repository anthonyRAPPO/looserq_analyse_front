<template>
  <v-app>
    <SnackBar></SnackBar>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import SnackBar from "@/components/SnackBar.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    SnackBar,
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Serif&display=swap");
#app {
  font-family: "Noto Serif", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
