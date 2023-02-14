<template>
  <v-app>
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
    <router-view class="routerView" />
    <v-footer color="background" height="50" width="auto">
      <div class="footer">
        <span>2023 - LooserQAnalyse - looserq.analyse@gmail.com</span>
      </div></v-footer
    >
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
<style scoped>
.footer {
  height: 1em;
  margin: auto;
  font-size: 0.85em;
}

.routerView {
  margin-bottom: 2em;
}

.alert {
  width: 30%;
  text-align: left;
}

:deep(.v-alert__close) {
  -webkit-margin-start: 10px;
  margin-inline-start: 10px;
}
</style>
