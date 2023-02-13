import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";
import mitt from "mitt";

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#FDFFFC",
          secondary: "#FF9F1C",
          background: "#011627",
          info: "#FF9F1C",
          error: "#E71D36",
          warn: "#87F5FB",
          top: "#780116",
          jungle: "#736F4E",
          mid: "#E71D36",
          adc: "#FA9F42",
          supp: "#44A1A0",
        },
      },
    },
  },
});

const app = createApp(App);
const eventBus = mitt();
app.provide("eventBus", eventBus);
app.use(store).use(router).use(vuetify).mount("#app");
