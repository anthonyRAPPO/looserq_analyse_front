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
      text="We don't have the RIOT API production key yet, so requests can take a few minutes "
      :closable="true"
    ></v-alert>
    <div class="routerView">
      <router-view />
    </div>
    <v-footer color="background" width="auto">
      <div class="footer">
        <span>2023 - LooserQAnalyse - looserq.analyse@gmail.com</span>
      </div></v-footer
    >
  </v-app>
</template>

<script lang="ts">
import SnackBar from "@/components/SnackBar.vue";
import { useMeta } from "vue-meta";
export default {
  components: {
    SnackBar,
  },
  setup() {
    useMeta({
      title: "Does the looser Q exist ? Analyse your last LOL games",
      description:
        "Is there a looser and winner queue in LOL? Analyse your last league of legend games and make your own opinion",
      og: {
        title: "Does the looser Q exist ? Analyse your last LOL games",
        site_name: "Looser Q Analyse",
        type: "website",
        url: "http://localhost:8080/",
        description:
          "Is there a looser and winner queue in LOL? Analyse your last league of legend games and make your own opinion",
        image: "http://localhost:8080/img/logoMonkey3.9b957464.png",
      },
      twitter: {
        content: "summary",
        site: "http://localhost:8080/",
        title: "Does the looser Q exist ? Analyse your last LOL games",
        description:
          "Is there a looser and winner queue in LOL? Analyse your last league of legend games and make your own opinion",
        image: "http://localhost:8080/img/logoMonkey3.9b957464.png",
      },
      htmlAttrs: { lang: "en", amp: true },
    });
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
