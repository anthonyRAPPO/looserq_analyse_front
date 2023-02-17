import { Platform } from "@/enumerations/platform";
import { Game } from "@/interfaces/game";
import { Participant } from "@/interfaces/participant";
import { createStore } from "vuex";

export default createStore({
  state: {
    login: "",
    lstGames: [] as Game[],
    lstParticipant: [] as Participant[],
    platformSelected: Platform.EUW,
  },
  getters: {},
  mutations: {
    SET_LOGIN(state, payload) {
      state.login = payload;
    },
    SET_GAMES(state, payload) {
      state.lstGames = payload;
    },
    SET_PARTICIPANT(state, payload) {
      state.lstParticipant = payload;
    },
    SET_PLATFORM(state, payload) {
      state.platformSelected = payload;
    },
  },
  actions: {},
  modules: {},
});
