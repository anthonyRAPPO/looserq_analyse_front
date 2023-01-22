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
        },
      },
    },
  },
});

const app = createApp(App);
app.use(store).use(router).use(vuetify).mount("#app");
