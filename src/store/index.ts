import { Game } from "@/interfaces/game";
import { Participant } from "@/interfaces/participant";
import { createStore } from "vuex";

export default createStore({
  state: {
    login: "",
    lstGames: [] as Game[],
    lstParticipant: [] as Participant[],
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
  },
  actions: {},
  modules: {},
});
