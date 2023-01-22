<template>
  <div>
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
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-text-field label="Name"></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn
        append-icon="mdi-magnify"
        rounded="lg"
        size="x-large"
        color="secondary"
        variant="outlined"
      >
        Analyse
      </v-btn>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Platform } from "@/enumerations/platform";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      platformSelected: Platform.EUW,
      lstPlatform: Object.values(Platform),
    };
  },
});
</script>

<style scoped>
.welwomeText {
  margin-top: 2em;
}
</style>
