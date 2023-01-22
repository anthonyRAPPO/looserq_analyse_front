import { Game } from "@/interfaces/game";
import { createStore } from "vuex";

export default createStore({
  state: {
    login: "",
    lstGames: [] as Game[],
  },
  getters: {},
  mutations: {
    SET_LOGIN(state, payload) {
      state.login = payload;
    },
    SET_GAMES(state, payload) {
      state.lstGames = payload;
    },
  },
  actions: {},
  modules: {},
});
