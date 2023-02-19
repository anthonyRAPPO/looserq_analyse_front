import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SearchLoginView from "../views/SearchLogin.vue";
import DisplayGamesView from "../views/DisplayGames.vue";
import DisplayStatsView from "../views/DisplayStats.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "SearchLogin",
    component: SearchLoginView,
  },
  {
    path: "/games",
    name: "DisplayGames",
    component: DisplayGamesView,
  },
  {
    path: "/stats",
    name: "DisplayStats",
    component: DisplayStatsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
