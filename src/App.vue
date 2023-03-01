<template>
  <v-app>
    <metainfo> </metainfo>
    <SnackBar></SnackBar>
    <v-alert
      position="fixed"
      density="compact"
      type="warning"
      color="warning"
      title="Warning"
      class="alert"
      variant="tonal"
      text="We do not yet have the production key of the RIOT API, so requests can take a few minutes. "
      :closable="true"
    ></v-alert>
    <div class="routerView">
      <router-view />
    </div>
    <v-footer color="background" width="auto">
      <div class="footer">
        <span>2023 - Losers Queue Inspector - looserq.analyse@gmail.com</span>
      </div></v-footer
    >
  </v-app>
</template>

<script lang="ts">
import SnackBar from "@/components/SnackBar.vue";
export default {
  components: {
    SnackBar,
  },
};
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
<style scoped>
.routerView {
  margin-bottom: 2em;
}
.footer {
  height: 3em;
  margin: auto;
  font-size: 0.85em;
}

.alert {
  width: 30%;
  text-align: left;
  min-width: 250px;
  z-index: 2;
}

:deep(.v-alert__close) {
  -webkit-margin-start: 10px;
  margin-inline-start: 10px;
}

@media only screen and (max-width: 250px) {
  .alert {
    width: 100%;
    min-width: 100px;
  }
}
</style>
